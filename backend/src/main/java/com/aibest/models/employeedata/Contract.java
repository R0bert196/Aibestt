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
public class Contract {
	public AuditEntries AuditEntries;
	public Cor Cor;
	public Date DataConsemnare;
	public Date DataContract;
	public Date DataInceputContract;
	public Date DataSfarsitContract;
	public Date DateContractVechi;
	public Detalii Detalii;
	public DetaliiMutare DetaliiMutare;
	public ExceptieDataSfarsit ExceptieDataSfarsit;
	public String NumarContract;
	public String NumereContractVechi;
	public boolean Radiat;
	public int Salariu;
	public SporuriSalariu SporuriSalariu;
	public StareCurenta StareCurenta;
	public TimpMunca TimpMunca;
	public String TipContract;
	public String TipDurata;
	public String TipNorma;
}
