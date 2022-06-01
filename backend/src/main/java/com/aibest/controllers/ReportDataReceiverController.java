package com.aibest.controllers;


import com.aibest.entities.Company;
import com.aibest.entities.Employee;
import com.aibest.models.employeedata.Salariat;
import com.aibest.models.employeedata.XmlReport;
import com.aibest.services.CompanyService;
import com.aibest.services.EmployeeService;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.bind.JAXBException;
import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;


@RestController
public class ReportDataReceiverController {

    private final EmployeeService employeeService;

    @Autowired
    public ReportDataReceiverController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Autowired
    CompanyService companyService;

    @GetMapping("/api/getEmployees")
    public ResponseEntity<?> getCompanyEmployees(@RequestParam("companyId") long companyId){
        System.out.println(companyId);
        List<Employee> latestReportEmployees = companyService.getEmployeesForCompany(companyId);
        return ResponseEntity.ok(latestReportEmployees);
    }

    @PostMapping("/api/add-employees")
    public ResponseEntity<?> insertData(@RequestParam("file") MultipartFile uploadedFile, @RequestParam("companyId") long companyID, @RequestParam("reportDate") String reportDate) throws IOException, JAXBException, ParseException {
        File file = new File("src/main/resources/targetFile.tmp");

        try (OutputStream os = new FileOutputStream(file)) {
            os.write(uploadedFile.getBytes());
        }
        System.out.println("date: " + reportDate);
        XmlMapper xmlMapper = new XmlMapper();
        String xml = inputStreamToString(new FileInputStream(file));
        xmlMapper.setDefaultUseWrapper(false);
        List<Employee> dbInsert = null;
        String pattern = "E MMM dd yyyy HH:mm:ss";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        LocalDate date = LocalDate.parse(reportDate.substring(0, pattern.length() + 2), formatter);
        employeeService.deleteOldEmployeeDate(companyID, date);
        try {
            XmlReport value = xmlMapper.readValue(xml, XmlReport.class);
            dbInsert = mapToDb(value.getSalariati().getSalariat(), companyID, date);
            employeeService.insertEmployees(dbInsert);
        }
        catch (Exception e){
            e.printStackTrace();
        }

        file.delete();
        if (dbInsert == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok(dbInsert);
    }

    @GetMapping("/api/globalEmployeeSalary")
    public List<?> getGlobalEmployeeSalaryData(){

        return employeeService.getGlobalEmployeeSalaries();
    }

    @GetMapping(value = "/empGraph")
    public List<?> sendEmpData(@RequestParam("companyId") long companyId) {
        return employeeService.getCompanyEmployeeSalaries(companyId);
    }

    private List<Employee> mapToDb(List<Salariat> salariati, long companyId, LocalDate date) throws ParseException {
        Company company = companyService.getCompaniesById(companyId);
        List<Employee> dbInsertList = new ArrayList<>();
        for (Salariat salariat : salariati) {
            Employee dbInsert = Employee
                    .builder()
                    .uploadDate(date)
                    .company(company)
                    .norm(salariat.getContracte().getContract().get(salariat.getContracte().getContract().size() - 1).getTimpMunca().getNorma())
                    .anonymised_employee_id((int) (Math.random()*1000000000))
                    .sex(salariat.getCnp().charAt(0)=='1' || salariat.getCnp().charAt(0)=='5' ? 1: 2)
                    .shiftDuration(salariat.getContracte().getContract().get(salariat.getContracte().getContract().size() - 1).getTimpMunca().getDurata())
                    .contractNumber(salariat.getContracte().getContract().get(salariat.getContracte().getContract().size() - 1).getNumarContract())
                    .contractStartDate(salariat.getContracte().getContract().get(salariat.getContracte().getContract().size() - 1).getDataInceputContract().toInstant().atZone(ZoneId.systemDefault()).toLocalDate())
//                    .cor(salariat.getContracte().getContract().get(salariat.getContracte().getContract().size() - 1).getCor().getCod())
                    .salary(salariat.getContracte().getContract().get(salariat.getContracte().getContract().size() - 1).getSalariu())
                    .build();
            dbInsertList.add(dbInsert);
        }
        return dbInsertList;
    }

    public String inputStreamToString(InputStream is) throws IOException {
        StringBuilder sb = new StringBuilder();
        String line;
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }
        br.close();
        return sb.toString();
    }


}
