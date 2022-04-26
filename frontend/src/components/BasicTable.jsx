import React, { useMemo } from 'react'
import { useTable } from 'react-table'



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
     <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
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
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
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
   )
}

export default BasicTable