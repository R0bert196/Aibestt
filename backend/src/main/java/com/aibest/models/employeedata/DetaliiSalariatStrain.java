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
public class DetaliiSalariatStrain {
	public boolean nil;
	public Date DataInceputAutorizatie;
	public Date DataSfarsitAutorizatie;
	public String TipAutorizatie;
}
