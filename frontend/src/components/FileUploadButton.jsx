import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import api from "../utilities/Api";
import { useAtom } from "jotai";
import state from "../state";
import AutoCompleteBox from "./AutoCompleteBox";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function FileUploadButton({ setData, toggleUpload }) {
  const [companies, setCompanies] = useState();

  const [companyId, setCompanyId] = useState();

  const axiosPrivate = useAxiosPrivate();

  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isCompanySelected, setIsCompanySelected] = useState(false);

  // const [inputValue, setInputValue] = useState("");
  const [inputValue, setInputValue] = useAtom(state.companyNameSearched);

  const [isSelectedField, setIsSelectedField] = useState(false);

  const onSelectFile = (e) => {
    console.log("company id: ")
    console.log(companyId);
    let file = document.querySelector("#file").files[0];
    console.log(file);
    let toSend = {
      companyId,
      file,
    };
    upload(toSend);
  };

  const getCompanies = (e) => {
    let companyName = e.target.value;
    axiosPrivate.get(`companySearch?companyName=${companyName}`).then((response) =>
      setCompanies(() => {
        console.log(response.data);
        setCompanies(response.data);
      })
    );
  };

  // const sendFile = (content) => {
  //   const req = fetch("https://aibest.herokuapp.com/api/get-employees", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: content,
  //   })
  //     .then( response => response.json())
  //     .then(succes => {
  //       console.log("robert aici")
  //       toast.success("Employees updates successfully")
  //       console.log(succes);
  //     })
  // }

  const upload = (file) => {
    console.log(file);
    fetch("https://aibest.herokuapp.com/api/get-employees", {
      // Your POST endpoint
      method: "POST",
      headers: {
        // Content-Type may need to be completely **omitted**
        // or you may need something
        // remove conent type is it doesen't work
        // "Content-Type": "multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD"
      },
      body: file, // This is your file object
    })
      .then(
        (response) => response.json() // if the response is a JSON object
      )
      .then(
        (success) => {
          console.log(success);
          setData(success);
        } // Handle the success response object
      )
      .catch(
        (error) => console.log(error) // Handle the error response object
      );
  };

  return (
    <div
      className='p-4 transition-all duration-300'
      style={{
        opacity: toggleUpload ? "1000" : "0",
        position: "relative",
        display: toggleUpload ? "block" : 'none'
        // top: toggleUpload ? "0px" : "-1000px",
      }}
    > 
      <div className='md:grid grid-cols-3  gap-6'>
        <div
          style={{ border: "1.6px solid #e3e6f0" }}
          className='shadow flex-auto col-start-1 col-end-3 rounded bg-white h-max'
        >
          <input
            onChange={(e) => {
              getCompanies(e);
              setIsSelectedField(true);
              setInputValue(e.target.value);
            }}
            // style={{ borderBottom: "1.6px solid #e3e6f0" }}
            className='shadow min-w-0 max-h-10 block w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding  transition ease-in-out m-0 focus:outline-none'
            id='companyId'
            type='text'
            autoComplete='off'
            placeholder='Search for your company'
            value={inputValue}
          />
          {isSelectedField && (
            <AutoCompleteBox
              setIsSelectedField={setIsSelectedField}
              setIsCompanySelected={setIsCompanySelected}
              setInputValue={setInputValue}
              setCompanyId={setCompanyId}
              companies={companies}
            />
          )}
        </div>
        <div className="mw768:mt-8 col-start-3 col-end-4">
          <input
            style={{ border: "1.6px solid #e3e6f0" }}
            className='shadow block w-full max-h-10 text-xl font-normal text-gray-700 bg-white bg-clip-padding rounded transition ease-in-out m-0'
            id='file'
            onChange={() => setIsFileUploaded(true)}
            type='file'
          />

          <div className='mt-8'>
            <button
              className='upload-button p-2 mt-6 bg-primary rounded-lg text-white hover:brightness-125 disabled:opacity-75 disabled:cursor-not-allowed disabled:brightness-100'
              onClick={onSelectFile}
              type='submit'
              disabled={!(isCompanySelected && isFileUploaded)}
            >
              Upload Employees
            </button>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default FileUploadButton;
