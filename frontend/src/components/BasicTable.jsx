import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import FileUploadButton from './FileUploadButton'



function BasicTable() {
   const data = useMemo(
     () => [
       {
         id: 5,
         name: 'ghita',
         start_date: '01-01-1001',
         salary: 855
       },
       {
         id: 6,
         name: 'ghi1ta',
         start_date: '01-05-1001',
         salary: 64353
       },
       {
         id: 5,
         name: 'ghi33ta',
         start_date: '01-01-2001',
         salary: 2344
       },
     ],
     []
   ) 

   const columns = useMemo(
     () => [
         {
         Header: 'Id',
         accessor: 'id',
       },
       {
         Header: 'Name',
         accessor: 'name',
       },
       {
         Header: 'Start date',
         accessor: 'start_date',
       },
       {
         Header: 'Salary',
         accessor: 'salary',
       },
     ],
     []
   )

 

   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ columns, data })
 

  return (
     
    <div className='bg-white'>
      <div style={{ border: '1px solid #e3e6f0' }} className='mb-10 rounded-t-md'>
        <h2>Employee Info</h2>
        <FileUploadButton />
      </div>

      <table {...getTableProps()} className='' >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      //  style={{
                      //    padding: '10px',
                      //    border: 'solid 1px gray',
                      //    background: 'papayawhip',
                      //  }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    
   )
}

export default BasicTable