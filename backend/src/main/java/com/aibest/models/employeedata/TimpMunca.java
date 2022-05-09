package com.aibest.models.employeedata;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

@Data
@NoArgsConstructor
@AllArgsConstructor
@XmlAccessorType(XmlAccessType.FIELD)
public class TimpMunca {
	public Integer Durata;
	public String IntervalTimp;
	public String Norma;
	public String Repartizare;
}
