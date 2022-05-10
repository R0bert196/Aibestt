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
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ReportDataReceiverController {

    private final EmployeeService employeeService;

    @Autowired
    public ReportDataReceiverController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }



    @Autowired
    CompanyService companyService;

    @PostMapping
    public ResponseEntity<?> getCompanyEmployees(@RequestParam("companyId") long companyId){
        List<Employee> latestReportEmployees = companyService.getEmployeesForCompany(companyId);
        return ResponseEntity.ok(latestReportEmployees);
    }


    @PostMapping("/api/add-employees")
    public ResponseEntity<?> insertData(@RequestParam("file") MultipartFile uploadedFile, @RequestParam("companyId") long companyID, @RequestParam("reportDate") String reportDate) throws IOException, JAXBException {
        File file = new File("src/main/resources/targetFile.tmp");

        try (OutputStream os = new FileOutputStream(file)) {
            os.write(uploadedFile.getBytes());
        }

        XmlMapper xmlMapper = new XmlMapper();
        String xml = inputStreamToString(new FileInputStream(file));
        xmlMapper.setDefaultUseWrapper(false);
        List<Employee> dbInsert = null;
        try {
            XmlReport value = xmlMapper.readValue(xml, XmlReport.class);
            dbInsert = mapToDb(value.getSalariati().getSalariat(), companyID, reportDate);
            employeeService.insertEmployees(dbInsert);
            System.out.println(value);
        }
        catch (Exception e){
            e.printStackTrace();
        }

        file.delete();
        if (dbInsert == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok(dbInsert);
    }

    private List<Employee> mapToDb(List<Salariat> salariati, long companyId, String reportDate) throws ParseException {
        System.out.println(reportDate);
        Company company = companyService.getCompaniesById(companyId);
        List<Employee> dbInsertList = new ArrayList<>();
        System.out.println("AICI E");
        System.out.println(LocalDate.parse("2018-05-05"));
        for (Salariat salariat : salariati) {
            Employee dbInsert = Employee
                    .builder()
                    .uploadDate(LocalDate.parse("2018-05-05"))
                    .company(company)
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
