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
public class Detalii {
	public DomeniuActivitate DomeniuActivitate;
	public String Nume;
	public int Cui;
	public CuiParinte CuiParinte;
	public String FormaJuridicaPJ;
	public String FormaOrganizarePJ;
	public String FormaProprietate;
	public String NivelInfiintare;
	public NumeParinte NumeParinte;
	public String type;
	public String text;
	public boolean nil;
}
