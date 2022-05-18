import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import state from "../state";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom"
import AddNewCompany from "./AddNewCompany"
import { useNavigate } from "react-router-dom";

function CompanyTable() {
  const [companies, setCompanies] = useState([]);
  const [token, setToken] = useAtom(state.token);
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
  }, []); //TODO figure out a workaround to update teh companies if the user adds one

 
  return (
    <div> 

      {companies.length > 0 && (
        <table>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
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
