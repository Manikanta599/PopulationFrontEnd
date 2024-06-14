import React, { useState, useEffect } from 'react';
import './CSS/uploadexcel.css';
import { readExcel } from './readExcel';
import axios from 'axios';

const UploadExcel = () => {
  const [file, setFile] = useState(null);
  const [names, setNames] = useState([]);
  const [flag, setFlag] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = () => {
    if (file) {
      readExcel(file)
        .then((data) => {
          console.log('data:', data);
          data.forEach((values) => {
            const newData = { ...values, dob: '2024/06/14' };
            axios.post('http://localhost:8090/save', newData)
              .then(response => {

                if (response.status === 200) {


                  setFlag(1);
                  setNames(oldNames => [...oldNames, values.name]);

                }
              })
              .catch(error => {
                console.log(values.name + " failed, already present ..");
              });
          });
        })
        .catch((error) => {
          console.error('Error reading excel file:', error);
        });
    } else {
      console.error('No file selected');
    }
  };

  if(flag===1)
    {
      document.getElementById("names").style.display = "block"
    }

  
   
  

  return (
    <div id="excel_con">
      <h3 id="fileh">Here you can Upload Your Excel File:</h3>
      <div id="file">
        <input type='file' onChange={handleFileChange}></input>
      </div>
      <div id="files">
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div id="messag">
        Data already present
      </div>

      <div id="names">
        <h4>Stored Names:</h4>
        <ul>
          {names.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UploadExcel;
