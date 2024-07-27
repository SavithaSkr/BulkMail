import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const App = () => {
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState(false);
  const [emailList, setEmailList] = useState([]);

  const handlemsg = (e) => {
    setMsg(e.target.value);
  };

  const handlefile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      console.log("hi i m here");
      console.log("workbook", workbook);

      const sheetName = workbook.SheetNames[0]; // Corrected to SheetNames
      const worksheet = workbook.Sheets[sheetName];
      const emailList = XLSX.utils.sheet_to_json(worksheet, { header: "A" }); // Consistent use of XLSX
      console.log(emailList);
      const totalemail = emailList.map((item) => {
        return item.A;
      });
      setEmailList(totalemail);
    };

    reader.readAsBinaryString(file);
  };

  const send = () => {
    setStatus(true);
    axios
      .post("http://localhost:5000/sendmail", {
        msg: msg,
        emailList: emailList,
      })
      .then((data) => {
        if (data.data === true) {
          alert("email sent succesfully");
          setStatus(false);
        } else {
          alert("Failed");
        }
      });
  };

  return (
    <>
      <div className="bg-sky-950 text-white text-center">
        <h2 className="text-2xl font-medium px-5 py-5"> Bulk Mail </h2>
      </div>
      <div className="bg-sky-800 text-white text-center">
        <h2 className="text-2xl font-medium px-5 py-5">
          We can Help your Business Sending Mulitiple Email
        </h2>
      </div>
      <div className="bg-sky-600 text-white text-center">
        <h2 className="text-2xl font-medium px-5 py-5">Drag and Drop</h2>
      </div>
      <div className="bg-sky-400 flex flex-col text-black items-center px-5 py-5">
        <textarea
          className="w-[80%] h-32 py-2 outline-none px-10 border rounded-md"
          placeholder="enter your mail text..."
          onChange={handlemsg}
          value={msg}
        ></textarea>
        <div className="bg-sky-400 flex flex-col text-black items-center px-5 py-5">
          <input
            type="file"
            className="file:mr-5 file:py-1 file:px-3 file:border-[1px] file:rounded-md
            file:text-xs file:text-white file:font-medium
            file:bg-sky-950 file:text-stone-700
            hover:file:cursor-pointer hover:file:bg-blue-50
            hover:file:text-blue-700 border rounded-md py-4 px-4 mt-5 mb-5"
            placeholder="enter your mail text..."
            onChange={handlefile}
          ></input>
        </div>
        <p>Total emails in the file : {emailList.length}</p>

        <div className="bg-sky-400 text-white text-center mt-5">
          <button
            onClick={send}
            className="bg-sky-950 text-white py-2 px-4 font-medium rounded-md w-fit"
          >
            {status ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
      <div className="bg-sky-300 text-white text-center p-8"></div>
      <div className="bg-sky-200 text-white text-center p-8"></div>
    </>
  );
};

export default App;
