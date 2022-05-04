import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import Api from "../utilities/Api";
import { useAtom } from "jotai";
import state from "../state";
import axios from "axios";




function CompanyTable() {

const [products, setProducts] = useState([]);
  const [token, setToken] = useAtom(state.token);

  const fetchProducts = async () => {
    const response = await Api.get("getCompanies", { headers: {"Authorization" : `Bearer ${token}`} })
      .catch((err) => console.log(err));

    if (response) {
      const products = response.data;

      console.log("Products: ", products);
      setProducts(products);
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

  const productsData = useMemo(() => [...products], [products]);

  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            .filter((key) => key !== "companyGroup")
            .map( (key) =>{
                return {
                  Header: key,
                  accessor: key,
                }
              })          
        : [],
    [products]
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
    fetchProducts();
  }, []);

  return (
<table {...getTableProps()}>

     <thead>

       {
       headerGroups.map(headerGroup => (
         <tr {...headerGroup.getHeaderGroupProps()}>
           {
           headerGroup.headers.map(column => (
             <th {...column.getHeaderProps()}>               
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
           <tr {...row.getRowProps()}>
             {
             row.cells.map(cell => {
               return (
                 <td {...cell.getCellProps()}>
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
        );  
}

export default CompanyTable