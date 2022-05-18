import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import state from "../state";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom"
import AddNewCompany from "./AddNewCompany"

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
      console.log(response.data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []); //TODO figure out a workaround to update teh companies if the user adds one

 
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
      {companies.length > 0 && (
        <table className="mx-auto rounded-b-md my-2 w-full text-left">
            <thead>
              <tr className="table-header">
                <th scope="col">Company Name</th>
                <th scope="col">Caen</th>
                <th scope="col">Cui</th>
              </tr>
            </thead>
            <tbody className="table-body">
               {companies.map(company => {
                return <tr key={company.id}>
                  <td>
                    <Link to={`/companies/${company.id}`}>{company.deni}</Link>
                  </td>
                  <td>
                    {company.caen}
                  </td>
                  <td>
                    {company.cui}
                  </td>
                </tr>
              })}

              {/* <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr> */}
            </tbody>
        </table>
      )}
     </div>
  );
}

export default CompanyTable;
