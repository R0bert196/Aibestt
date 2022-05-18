import React from 'react'
import CompanyTable from './CompanyTable'

function Companies() {
  return (
    <div className='mx-4 my-14 px-5 w-full mt-16'>
        <div className="text-gray-900 text-3xl mb-4 ">
          <h1>Your Companies</h1>
        </div>
        <div>
            <CompanyTable />
        </div>
    </div>
  )
}

export default Companies