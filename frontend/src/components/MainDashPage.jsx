import React from 'react'
import DoughnutGraph from "../components/DoughnutGraph";
import EmployeeGraph from "../components/EmployeeGraph";
import IndiactorCard from "../components/IndicatorCard";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import NavBar from './NavBar';

function MainDashPage() {
  return (
    <>
      <div style={{}} className="container mx-auto px-4 overflow-hidden  transition-all duration-300 ">
            <div className="text-gray-900 text-3xl mt-16">
                <h1>Dashboard</h1>
            </div>
              <div className="flex flex-wrap justify-center gap-4">
                  <IndiactorCard text='AVERAGE EMPLOYEE SALARY' number='$3.442' height='7rem' icon={faUser} color='primary'/>
                  <IndiactorCard text='EMPLOYES NUMBER' number='215' height='6.5rem' icon={faUsers} color='primary'/>
                  <IndiactorCard text='TURNOVER / EMPLOYEE' number='212.505' height='6.5rem' icon={faEuroSign} color='primary'/>
                  <IndiactorCard text='AIB COMPANY RANKING TM' number='2' height='7rem' icon={faTrophy} color='gold'/>
              </div>
            <div className="flex mx-auto justify-center gap-4 flex-wrap">
                <DoughnutGraph />
                <DoughnutGraph />
            </div>
            <div className="my-8">
                <EmployeeGraph />
            </div>

        </div>
    </>
  )
}

export default MainDashPage;