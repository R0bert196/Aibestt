package com.aibest.models.employeedata;



import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

@Data
@NoArgsConstructor
@AllArgsConstructor
@XmlAccessorType(XmlAccessType.FIELD)
public class Salariat {

	public String Adresa;
	public Apatrid Apatrid;
	public AuditEntries AuditEntries;
	public String Cnp;
	public String CnpVechi;
	public Contracte Contracte;
	public DetaliiSalariatStrain DetaliiSalariatStrain;
	public Localitate Localitate;
	public String Mentiuni;
	public Nationalitate Nationalitate;
	public String Nume;
	public String Prenume;
	public TaraDomiciliu TaraDomiciliu;
	public String TipActIdentitate;
}
