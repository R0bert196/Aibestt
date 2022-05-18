import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import Api from "../utilities/Api";
import { useAtom } from "jotai";
import state from "../state";
import axios from "axios";
import AddNewCompany from "./AddNewCompany";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";

function CompanyTable() {
  const [companies, setCompanies] = useState([]);
  const [token, setToken] = useAtom(state.token);
  const axiosPrivate = useAxiosPrivate();
  const [toggleUpload, setToggleUpload] = useState(false);

  const controller = new AbortController();
  const getCompanies = async () => {
    try {
      const response = await axiosPrivate.get("getCompanies", {
        signal: controller.signal,
      });
      setCompanies(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []); //TODO figure out a workaround to update teh companies if the user adds one

  const data = useMemo(
    () => [
      {
        id: 2,
        deni: "comp1",
        caen: 109.95,
        cui: 109765,
        codPostal: "12345",
      },
      {
        id: 1,
        deni: "comp2",
        caen: 109.95,
        cui: 109935,
        codPostal: "12345",
      },
    ],
    []
  );

  const columns = useMemo(
    (row) => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Caen",
        accessor: "caen",
      },
      {
        Header: "Cui",
        accessor: "cui",
      },
      {
        Header: "Deni",
        accessor: "deni",
        Cell: ({ row }) =>
          row.id ? (
            <Link to={{ pathname: `/companies/${row.id}` }}>{{ row }}</Link>
          ) : null,
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
            .map((key) => {
              // if (key === "id") {
                // return { Header: "", accessor: "null" };
              // } else 
              if (key === "deni") {
                return {
                  Header: key,
                  accessor: key,
                  Cell: (row, x) => 
                  // console.log(row.data)
                    !key ? null : (
                    //   companies.map(company => {
  
                    //     return <Link
                    //     to={{ pathname: `/companies/${company.id}` }}
                    //   >
                    //     <div>{ company.deni}</div>
                    //   </Link>
                    //   })
                      <Link
                        to={{ pathname: `/companies/${companies[0]["id"]}` }}
                      >
                        <div>{ companies[0][key]}</div>
                      </Link>
                    ),
              };
              } else {
                return {
                  Header: key,
                  accessor: key,
                };
              }
            })
        : [],
    [companies]
  );

  const tableInstance = useTable({
    columns: productsColumns,
    data: productsData,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="container mx-auto px-4 overflow-hidden">
      <div
        style={{
          border: "1px solid #e3e6f0",
          height: toggleUpload ? "18rem" : "5rem",
        }}
        className='rounded-t-md p-4 transition-all duration-300'
      >
        <div>
          <button
            className='py-3 w-full bg-primary text-white hover:brightness-125 rounded-lg text-center'
            onClick={() =>
              setToggleUpload((prevToggleUpload) => !prevToggleUpload)
            }
          >
            Add new company
          </button>
        </div>
        {<AddNewCompany toggleUpload={toggleUpload} />}
      </div>
      <div style={{
          borderBottom: "1px solid #e3e6f0", borderLeft: "1px solid #e3e6f0", borderRight: "1px solid #e3e6f0"
        }} className='rounded-b-md'>
        <table className='w-full' {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                className='grid grid-cols-5 content-center text-center'
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    className='grid content-center'
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr className='grid grid-cols-5' {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className='grid content-center text-center'
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
     </div>
  );
}

export default CompanyTable;
