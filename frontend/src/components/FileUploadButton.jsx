import { ToastContainer, toast } from 'react-toastify';

function FileUploadButton() {


  const onSelectFile = (e) => {
    let companyId = document.querySelector("#companyId").value;
    let file = document.querySelector("#file").files[0];
    console.log(companyId);
    console.log(file);
    let toSend = {
      companyId,
      file
    }
    upload(toSend);
  } 
  

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
      fetch('https://aibest.herokuapp.com/api/get-employees', { // Your POST endpoint
        method: 'POST',
        headers: {
          // Content-Type may need to be completely **omitted**
          // or you may need something
          // remove conent type is it doesen't work
          // "Content-Type": "multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD"
        },
      body: file // This is your file object
      }).then(
        response => response.json() // if the response is a JSON object
      ).then(
        success => console.log(success) // Handle the success response object
      ).catch(
        error => console.log(error) // Handle the error response object
      );
};

  return (
    <div className='flex'>
        <div>
          <input id='companyId' type="search"  placeholder='Search for your company'/>
          <input id='file' type="file"></input>
        </div>
        <div>
          <button onClick={onSelectFile} type="submit">Upload Employees</button>
        </div>
    </div>
  
  )
}

export default FileUploadButton