import React from 'react'
import EmployeeTable from './EmployeeTable'
import FileUploadButton from './FileUploadButton'
import NavBar from './NavBar'

function Employees() {
  return (
    <div className='block mx-4 my-14 px-5 w-full mt-16'>
      <div>
        <h1 className='mb-4 text-3xl'>Empoyees</h1>
        <EmployeeTable />
      </div>
    </div>
    
  )
}

export default Employees