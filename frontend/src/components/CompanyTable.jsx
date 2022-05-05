import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import Api from "../utilities/Api";
import { useAtom } from "jotai";
import state from "../state";
import axios from "axios";
import AddNewCompany from "./AddNewCompany";




function CompanyTable() {

const [companies, setCompanies] = useState([]);
  const [token, setToken] = useAtom(state.token);

  const [toggleUpload, setToggleUpload] = useState(false)

  const fetchCompanies = async () => {
    const response = await Api.get("getCompanies", { headers: {"Authorization" : `Bearer ${token}`} })
      .catch((err) => console.log(err));

    if (response) {
      const companies = response.data;
      setCompanies(companies);
    }
  };

  const data = useMemo(
    () => [
      {
        id: 1,
        deni: "comp1",
        caen: 109.95,
        codPostal:
          "12345"
      },
      {
        id: 1,
        deni: "comp2",
        caen: 109.95,
        codPostal:
          "12345"
      },         
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Caen",
        accessor: "caen",
      },
      {
        Header: "Deni",
        accessor: "deni",
      },
      {
        Header: "Cod postal",
        accessor: "codPostal",
      },
    ],
    []
  );

  const productsData = useMemo(() => [...companies], [companies]);

  const productsColumns = useMemo(
    () =>
      companies[0]
        ? Object.keys(companies[0])
            .filter((key) => key !== "companyGroup")
            .map( (key) =>{

                return {
                  Header: key,
                  accessor: key,
                }
              })          
        : [],
    [companies]
  );

  const tableInstance = useTable(
    {
      columns: productsColumns,
      data: productsData,
    },
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div>
      <div style={{ border: "1px solid #e3e6f0", height: toggleUpload ? '15rem': '5rem' }} className='rounded-t-md p-4 transition-all duration-300'>
        <div>
          <button
            className='px-4 py-3 bg-primary text-white hover:brightness-125 w-full rounded-lg'
            onClick={() =>
              setToggleUpload((prevToggleUpload) => !prevToggleUpload)
            }
          >
            Add new company
          </button>
        </div>
        { <AddNewCompany toggleUpload={toggleUpload}/> }
      </div>

<table className="w-full" {...getTableProps()}>
       <thead>
       {
       headerGroups.map(headerGroup => (
         <tr className="grid grid-cols-4 content-center text-center"  {...headerGroup.getHeaderGroupProps()}>
           {
           headerGroup.headers.map(column => (
             <th className="grid content-center" {...column.getHeaderProps()}>               
             {
               column.render('Header')}
             </th>
           ))}
         </tr>
       ))}
     </thead>
     <tbody {...getTableBodyProps()}>
       {
       rows.map(row => {
         prepareRow(row)
         return (
           <tr className="grid grid-cols-4" {...row.getRowProps()}>
             {
             row.cells.map(cell => {
               return (
                 <td className="grid content-center text-center" {...cell.getCellProps()}>
                   {
                   cell.render('Cell')}
                 </td>
               )
             })}
           </tr>
         )
       })}
     </tbody>
   </table>
  </div>
        );  
}

export default CompanyTable