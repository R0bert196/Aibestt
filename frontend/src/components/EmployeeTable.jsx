import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import FileUploadButton from "./FileUploadButton";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function BasicTable() {
  // const [tableData, setTableData] = useState({
  //   employees: [
  //     {
  //       id: "",
  //       salary: "",
  //     },
  //   ],
  // });
  const [tableData, setTableData] = useState([]);

  const data = useMemo(() => tableData, [tableData]);

  const axiosPrivate = useAxiosPrivate();

  const getTableData = async () => {
  try {
    console.log("here")
    const controller = new AbortController();
    const response = await axiosPrivate.get("/api/getEmployees?companyId=2", {
      signal: controller.signal
    })
  // .then(response => setChartData(response.data))
    setTableData(response.data);
  } catch(err) {
      console.error(err);
  }
    
  }
  

  useEffect(()=> {
      getTableData()
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: "Funtie",
        accessor: "id",
      },
      {
        Header: "Salariu",
        accessor: "salary",
      },
      // {
      //   Header: "Data Start",
      //   accessor: "startDate",
      // },
      // {
      //   Header: "Data Stop",
      //   accessor: "endDate",
      // },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const [toggleUpload, setToggleUpload] = useState(false);

  return (
    <div className='bg-white shadow-md'>
      {/* Header */}
      <div style={{ border: "1px solid #e3e6f0"}} className='rounded-t-md p-4'>
        <div>
          <button
            className='px-4 py-3 bg-primary text-white hover:brightness-125 w-full rounded-lg'
            onClick={() =>
              setToggleUpload((prevToggleUpload) => !prevToggleUpload)
            }
          >
            Upload From File
          </button>
        </div>
        {
          <FileUploadButton
            toggleUpload={toggleUpload}
            setData={setTableData}
          />
        }
      </div>

      {/* Content */}
      <table
        style={{
          borderBottom: "1px solid #e3e6f0",
          borderLeft: "1px solid #e3e6f0",
          borderRight: "1px solid #e3e6f0",
        }}
        className='rounded-b-lg p-4 w-full h-full'
        {...getTableProps()}
      >
        <thead className='bg-white border-b'>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} >
              {headerGroup.headers.map((column) => (
                <th
                  className='px-6 py-4 text-left text-sm font-medium'
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
              <tr
                style={{ borderBottom: "1px solid #e3e6f0" }}
                className='bg-white transition duration-300 ease-in-out hover:bg-secondary'
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      className='px-6 py-4 whitespace-nowrap font-light text-sm'
                      {...cell.getCellProps()}
                      //  style={{
                      //    padding: '10px',
                      //    border: 'solid 1px gray',
                      //    background: 'papayawhip',
                      //  }}
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
  );
}

export default BasicTable;
