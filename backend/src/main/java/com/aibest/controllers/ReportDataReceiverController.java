package com.aibest.controllers;


import com.aibest.entities.Employees;
import com.aibest.models.DbInsert;
import com.aibest.models.employeedata.Salariat;
import com.aibest.models.employeedata.XmlReport;
import com.aibest.services.EmployeeService;
import com.aibest.services.EmployeesService;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
public class ReportDataReceiverController {

    private final EmployeeService employeeService;

    @Autowired
    public ReportDataReceiverController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }


    @Autowired
    EmployeesService employeesService;

    @PostMapping("/api/add-employees")
    public ResponseEntity<?> insertData(@RequestParam("file") MultipartFile uploadedFile) throws IOException, JAXBException {
        File file = new File("src/main/resources/targetFile.tmp");

        try (OutputStream os = new FileOutputStream(file)) {
            os.write(uploadedFile.getBytes());
        }

        XmlMapper xmlMapper = new XmlMapper();
        String xml = inputStreamToString(new FileInputStream(file));
        xmlMapper.setDefaultUseWrapper(false);
        try {
            XmlReport value = xmlMapper.readValue(xml, XmlReport.class);
            List<Employees> dbInsert = mapToDb(value.getSalariati().getSalariat());
            employeesService.insertEmployees(dbInsert);
            System.out.println(value);
        }
        catch (Exception e){
            e.printStackTrace();
        }

        file.delete();
        return new ResponseEntity<>("The File " + uploadedFile.getOriginalFilename() + " was uploaded Successfully", HttpStatus.OK);
    }

    private List<Employees> mapToDb(List<Salariat> salariati) {
        List<Employees> dbInsertList = new ArrayList<>();
        for (Salariat salariat : salariati) {
            Employees dbInsert = Employees
                    .builder()
                    .uplaodDate(LocalDate.now())
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
