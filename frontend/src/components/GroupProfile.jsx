import React from 'react'
import { useState } from 'react';
import AddNewCompany from "./AddNewCompany"

function GroupProfile() {
    const [toggleUpload, setToggleUpload] = useState(false);

  return (
<div className="shadow rounded-md" style={{
      border: "1px solid #e3e6f0",
    }}> 
      <div
        style={{
          height: toggleUpload ? "18rem" : "5rem",
        }}
        className='rounded-t-md p-4 transition-all duration-300'
      >
        <div>
          <button
            className='px-4 py-3 bg-primary text-white hover:brightness-125 w-full rounded-3xl'
            onClick={() =>
              setToggleUpload((prevToggleUpload) => !prevToggleUpload)
            }
          >
            Add new company
          </button>
        </div>
        {<AddNewCompany toggleUpload={toggleUpload} />}
      </div>
    </div>
  )
}

export default GroupProfile