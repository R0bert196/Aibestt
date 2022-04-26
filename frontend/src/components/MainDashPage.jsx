import React from 'react'
import DoughnutGraph from "../components/DoughnutGraph";
import EmployeeGraph from "../components/EmployeeGraph";
import IndiactorCard from "../components/IndicatorCard";

function MainDashPage() {
  return (
    <>
        <div style={{}} className="container mx-auto px-4  overflow-hidden  transition-all duration-300">
            <div className="text-gray-900 text-3xl mt-12">
                <h1>Dashboard</h1>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                <IndiactorCard />
                <IndiactorCard />
                <IndiactorCard />
                <IndiactorCard />
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

export default MainDashPage