import React from 'react'
import EmployeeTable from './EmployeeTable'
import NavBar from './NavBar'

function Employees() {
  return (
    <div className='mx-4 my-14 px-5 w-full mt-16 verflow-hidden'>
      <div>
        <div className='mb-4 text-3xl'> 
          <h1>Empoyees</h1>
        </div>
        <EmployeeTable />
      </div>
    </div>
    
  )
}

export default Employees