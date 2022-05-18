import React, { useEffect, useMemo, useState } from "react";
import FileUploadButton from "./common/FileUploadButton";
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
    </div>
  );
}

export default BasicTable;
