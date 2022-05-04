import React from 'react'
import CompanyTable from './CompanyTable'

function Companies() {
  return (
    <div>
        <div className="min-h-[5rem] bg-white w-screen">
            <button>Add company</button>
        </div>
        <div>
            <CompanyTable />
        </div>
    </div>
  )
}

export default Companies