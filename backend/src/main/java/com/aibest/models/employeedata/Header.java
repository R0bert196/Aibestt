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
public class Header {
	public String ClientApplication;
	public int XmlVersion;
	public String UploadId;
	public String UploadDescription;
	public Angajator Angajator;
	public int PiecesCount;
	public String i;
	public String xmlns;
	public String text;
}
