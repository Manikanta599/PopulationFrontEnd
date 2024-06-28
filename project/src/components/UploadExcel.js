import React, { useState } from 'react';
import './CSS/uploadexcel.css';
import { readExcel } from './readExcel'; 
import axios from 'axios';

const UploadExcel = () => {
  const [file, setFile] = useState(null);
  const [names, setNames] = useState([]);
  const [flag, setFlag] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = () => {
    if (file) {
      readExcel(file)
        .then((data) => {
          console.log('Data read from Excel:', data);

          const updatedData = data.map(values => ({
            ...values,
            dob: '2024/06/14'
          }));

          axios.post('http://localhost:8090/save', updatedData)
            .then(response => {
              console.log('Response from backend:', response);
              if (response.status === 200 && Array.isArray(response.data.names)) {
                console.log('Names received from backend:', response.data.names);
                setNames(response.data.names);  // Set the names state
                setFlag(1);  // Set the flag state
              } else {
                // Backend response is not as expected
                setErrorMessage('No new names were saved.');
                setFlag(0);  // Reset flag state
              }

              // Log the names after setting the state
              console.log("Updated names: ", response.data.names);
            })
            .catch(error => {
              console.error('Error saving data:', error);
              setErrorMessage('Data already present.');
              setFlag(0);  // Reset flag state
            });
        })
        .catch((error) => {
          console.error('Error reading excel file:', error);
          setErrorMessage('Error reading excel file. Please try again.');
          setFlag(0);  // Reset flag state
        });
    } else {
      console.error('No file selected');
      setErrorMessage('No file selected. Please select a file.');
      setFlag(0);  // Reset flag state
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

      {names.length > 0 && (
        <div id="names">
          <h4>Stored Names:</h4>
          <ul>
            {names.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      )}

      {errorMessage && (
        <div id="errorMessage">
          {errorMessage}
        </div>
      )}

    </div>
  );
};

export default UploadExcel;
