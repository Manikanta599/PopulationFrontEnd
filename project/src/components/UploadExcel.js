import React, { useState } from 'react';
import './CSS/uploadexcel.css';
import { readExcel } from './readExcel';
import axios from 'axios';
import date from 'date-and-time';
 
const UploadExcel = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = () => {
    if (file) {
      readExcel(file)
        .then((data) => {
          console.log('data:', data);
          data.forEach((values,keys) => {
            console.log(values);
            let date=values.dob;
       
            console.log("date"+date);
            


           


           


            
            axios.post('http://localhost:8090/save', values)
    
      .then(response => {
        
        if (response.status === 200) {
          console.log("success stored data");
          
        } else {
          console.log("failed..");
          
        }
      })
      .catch(error => {
        console.log("failed..", error);
        
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

  return (
    <div id="excel_con">
      <h3 id="fileh">Here you can Upload Your Excel File:</h3>
      <div id="file">
        <input type='file' onChange={handleFileChange}></input>
      </div>
      <div id="files">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default UploadExcel;
