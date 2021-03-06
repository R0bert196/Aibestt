import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import state from "../state";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom"
import AddNewCompany from "./AddNewCompany"
import { useNavigate } from "react-router-dom";

function CompanyTable() {
  const [companies, setCompanies] = useState([]);
  const [addedCompany, setAddedCompany] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [toggleUpload, setToggleUpload] = useState(false);

  const controller = new AbortController();
  let navigate = useNavigate()
  const getCompanies = async () => {
    try {
      const response = await axiosPrivate.get("getCompanies", {
        signal: controller.signal,
      });
      if(response.data.length === 1){
        let url = "/companies/" + response.data[0].id
        navigate(url)
      }
      setCompanies(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCompanies();
  }, [addedCompany]); //TODO figure out a workaround to update teh companies if the user adds one

 
  return (
    <div className="shadow rounded-md" style={{border: '1px solid #e3e6f0'}}>   
      {companies.length > 0 && (
        <table className="mx-auto w-full text-left">
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
