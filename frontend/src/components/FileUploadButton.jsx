import React from 'react'

function FileUploadButton() {


  const onSelectFile = (e) => {
      // upload(this.files[0]);
      // console.log(e.target.files[0])
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(e.target.files[0])
  } 
  


  function handleFileLoad(e) {
    let stringContent = e.target.result
    // console.log(stringContent);
    // var obj = JSON.parse(e.target.result);
    sendFile(stringContent);
  }

  const sendFile = (content) => {
    const req = fetch("/api/add-employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: content,
    })
      .then( response => response.json())
      .then(succes => {
        console.log("robert aici")
        console.log(succes);
      })
  }

    
    const upload = (file) => {
      fetch('http://www.example.net', { // Your POST endpoint
        method: 'POST',
        headers: {
          // Content-Type may need to be completely **omitted**
          // or you may need something
          // remove conent type is it doesen't work
          "Content-Type": "multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD"
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
    <div>
        <form>
            <div>
               <label>Select file to upload</label>
                <input type="search" />
                <input onChange={onSelectFile} type="file"></input>
            </div>
            <button type="submit">Convert</button>
        </form> 
    </div>
  )
}

export default FileUploadButton