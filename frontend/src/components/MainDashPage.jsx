import React, { useEffect, useState } from 'react'
import GraphLine from "./GraphLine";
// import EmployeeGraph from "../components/EmployeeGraph";
import IndiactorCard from "../components/IndicatorCard";
import ShiftDurationDoughnut from "./GraphDoughnut"
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function MainDashPage() {

  const axiosPrivate = useAxiosPrivate();

  const [averageSalaries, setAverageSalaries] = useState();
  const [employeeCount, setEmployeeCount] = useState();
  let { id } = useParams();

const getData = async () => {
    const controller = new AbortController();
    try {
      await Promise.all([
    axiosPrivate.get(`getAverageSalaries?companyId=${id}`, {
        signal: controller.signal
    }),
    axiosPrivate.get(`getEmployeesCount?companyId=${id}`, {
      signal: controller.signal
    }),
        
      ])
        .then((response) => {
        console.log(response[0])
        setAverageSalaries(response[0].data + " RON");
        setEmployeeCount(response[1].data)
    })
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div style={{}} className="container mx-auto px-4 overflow-hidden  transition-all duration-300 ">
            <div className="text-gray-900 text-3xl mt-16">
                <h1>Dashboard</h1>
            </div>
              <div className="flex flex-wrap justify-center gap-4">
              <IndiactorCard text='AVERAGE EMPLOYEE SALARY' inidcatorValue={averageSalaries} height='7rem' icon={faUser} color='primary'/>
                  <IndiactorCard text='EMPLOYES NUMBER' inidcatorValue={employeeCount} height='6.5rem' icon={faUsers} color='primary'/>
                  <IndiactorCard text='TURNOVER / EMPLOYEE' inidcatorValue='212.505' height='6.5rem' icon={faEuroSign} color='primary'/>
                  <IndiactorCard text='AIB COMPANY RANKING TM' inidcatorValue='2' height='7rem' icon={faTrophy} color='gold'/>
              </div>
            <div className="flex mx-auto justify-center gap-4 flex-wrap">
          {/* <LineGraph title="Employees Salaries"  averageUrl={"api/globalEmployeeSalary"} yourUrl={"empGraph"} /> */}
          {/* <DoughnutGraph title="Employees Average Salaries" label="# of Votes" url={"average-salaries"}/> */}
          <ShiftDurationDoughnut url={'getEmployeesByShiftCount'} title={'Angajati per durata schimb'} hoverValue=" ore" />
            </div>
            <div className="my-8">
          {/* <EmployeeGraph /> */}
          <GraphLine title="Employees Salaries"  averageUrl={"api/globalEmployeeSalary"} yourUrl={"empGraph"} />
            </div>

        </div>
    </>
  )
}

export default MainDashPage;