import React, { useEffect, useState } from "react";
import GraphLine from "./GraphLine";
// import EmployeeGraph from "../components/EmployeeGraph";
import IndiactorCard from "../components/IndicatorCard";
import GraphDougnut from "./GraphDoughnut";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { faPercentage } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function MainDashPage() {
  const axiosPrivate = useAxiosPrivate();

  const [averageSalaries, setAverageSalaries] = useState();
  const [employeeCount, setEmployeeCount] = useState();
  const [turnoverEmployee, setTurnoverEmployee] = useState();
  const [femalePercentage, setFemalePercentage] = useState();
  let { id } = useParams();

  const getData = async () => {
    const controller = new AbortController();
    try {
      await Promise.all([
        axiosPrivate.get(`getAverageSalaries?companyId=${id}`, {
          signal: controller.signal,
        }),
        axiosPrivate.get(`getEmployeesCount?companyId=${id}`, {
          signal: controller.signal,
        }),

        axiosPrivate.get(`getTurnoverEmployee?companyId=${id}`, {
          signal: controller.signal,
        }),

         axiosPrivate.get(`getEmployeesByGender?companyId=${id}`, {
          signal: controller.signal,
        }),
      ]).then((response) => {
        setAverageSalaries(response[0].data + " RON");
        setEmployeeCount(response[1].data);
        setTurnoverEmployee(response[2].data);
        setFemalePercentage(Math.round(response[3].data[1].value * 100 / (response[3].data[0].value + response[3].data[1].value)));
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div
        style={{}}
        className='container mx-4 my-14 px-5 w-full mt-16 overflow-hidden transition-all duration-300 '
      >
        <div className='mb-4 text-3xl'>
          <h1>Dashboard</h1>
        </div>
        <div className='flex flex-wrap justify-center lg:gap-9 gap-2'>
          <IndiactorCard
            text='AVERAGE EMPLOYEE SALARY'
            inidcatorValue={averageSalaries}
            height='7rem'
            icon={faUser}
            color='primary'
          />
          <IndiactorCard
            text='EMPLOYES NUMBER'
            inidcatorValue={employeeCount}
            height='6.5rem'
            icon={faUsers}
            color='primary'
          />
          <IndiactorCard
            text='TURNOVER / EMPLOYEE'
            inidcatorValue={turnoverEmployee}
            height='6.5rem'
            icon={faEuroSign}
            color='primary'
          />
          <IndiactorCard
            text='MALE / FEMALE RATIO'
            inidcatorValue={femalePercentage}
            height='7rem'
            icon={faPercentage}
            color='primary'
          />
        </div>
        <div style={{maxWidth: "82%"}} className='flex mx-auto justify-between flex-wrap mw1024:justify-center'>
          {/* <LineGraph title="Employees Salaries"  averageUrl={"api/globalEmployeeSalary"} yourUrl={"empGraph"} /> */}
          {/* <DoughnutGraph title="Employees Average Salaries" label="# of Votes" url={"average-salaries"}/> */}
          <GraphDougnut
            url={"getEmployeesByShiftCount"}
            title={"Angajati per durata schimb"}
            hoverValue='ore'
          />
          <GraphDougnut
            url={"getEmployeeNorms"}
            title={"Angajati sortati dupa tipul normei de lucru"}
            hoverValue='Tip'
          />
        </div>
        <div className='my-8'>
          {/* <EmployeeGraph /> */}
          <GraphLine
            title='Employees Salaries'
            averageUrl={"api/globalEmployeeSalary"}
            yourUrl={"empGraph"}
          />
        </div>
      </div>
    </>
  );
}

export default MainDashPage;
