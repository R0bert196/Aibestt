import { ToastContainer, toast } from "react-toastify";

function FileUploadButton({ setData }) {
  const onSelectFile = (e) => {
    let companyId = document.querySelector("#companyId").value;
    let file = document.querySelector("#file").files[0];
    console.log(companyId);
    console.log(file);
    let toSend = {
      companyId,
      file,
    };
    upload(toSend);
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
          console.log(success)
          setData(success)
        } // Handle the success response object
      )
      .catch(
        (error) => console.log(error) // Handle the error response object
      );
  };

  return (
    <div className='p-4'>
      <div className='md:grid grid-cols-3  gap-6'>
        <input
          style={{ border: "1.6px solid #e3e6f0" }}
          className='
    block
    w-full
    text-xl
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    rounded
    transition
    col-start-1
    col-end-2
    ease-in-out
    m-0'
          id='file'
          type='file'
        />
        <input
          style={{ border: "1.6px solid #e3e6f0" }}
          className='flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding rounded transition ease-in-out m-0 focus:outline-none col-start-2 col-end-4 mw768:mt-4'
          id='companyId'
          type='search'
          placeholder='Search for your company'
        />
      </div>
      <div>
        <button
          className='p-2 mt-6 bg-primary rounded-lg text-white hover:brightness-125'
          onClick={onSelectFile}
          type='submit'
        >
          Upload Employees
        </button>
      </div>
    </div>
  );
}

export default FileUploadButton;
