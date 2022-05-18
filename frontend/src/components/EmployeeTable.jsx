import React, { useEffect, useMemo, useState } from "react";
import FileUploadButton from "./FileUploadButton";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function BasicTable() {
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


  const [toggleUpload, setToggleUpload] = useState(false);

  return (
    <div className='bg-white shadow-md'>
      
    </div>
  );
}

export default BasicTable;
