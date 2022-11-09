import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Rough from "./pages/Rough";
import UploadFiless from "./pages/UploadFiless";

function App(props) {
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/process/:processId/:referenceId" element={<UploadFiless />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// import "./App.css";

// import React, { useState } from "react";

// import axios from "axios";

// function App() {
//   const [file, setFile] = useState();

//   function handleChange(event) {
//     setFile(event.target.files[0]);
//   }

//   function handleSubmit(event) {
//     event.preventDefault();

//     const url = "http://192.168.100.176:8080/init/uploadDocument/1";

//     const formData = new FormData();

//     formData.append("attachment", [file]);

//     formData.append("fileName", file.name);

//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     };

//     console.log("formData", formData);

//     axios.post(url, formData, config).then((response) => {
//       console.log(response.data);
//     });
//   }

//   return (
//     <div className="App">
//       <form onSubmit={handleSubmit}>
//         <h1>React File Upload</h1>

//         <input type="file" onChange={handleChange} />

//         <button type="submit">Upload</button>
//       </form>
//     </div>
//   );
// }

// export default App;
