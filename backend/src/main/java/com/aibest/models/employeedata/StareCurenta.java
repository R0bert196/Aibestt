package com.aibest.models.employeedata;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
@XmlAccessorType(XmlAccessType.FIELD)
public class StareCurenta {
	public Date DataIncetare;
	public Date DataSfarsit;
	public String Explicatie;
	public String TemeiLegal;
	public String type;
	public String text;
	public String DataIncetareDetasare;
	public Date DataIncetareSuspendare;
	public String StarePrecedenta;
	public Date DataInceput;
}
