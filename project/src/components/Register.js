import React, { useState } from 'react';

import axios from 'axios';



function Rform() {

  const [data, setData] = useState({
    name: '',
    village: '',
    pincode: '',
    email: '',
    phno: '',
    gender: '',
    dob: ''
  });



  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log("from form "+data)
  };

  const submitHandler = (e) => {
    e.preventDefault();
  

    axios.post('http://localhost:8090/save', data)
    
      .then(response => {        
        if (response.status === 200) {
          console.log("success");
          document.getElementById("msg").innerHTML = "<center><h3>Updation Success</h3></center>";
        } else {
          console.log("failed..");
          document.getElementById("msg").innerHTML = "<center><h3>Updation Failed</h3></center><br><span>gmail must be unique</span>";
        }
      })
      .catch(error => {
        console.log("failed..", error);
        document.getElementById("msg").innerHTML = "<center><h3>Updation Failed</h3></center><br><span>gmail must be unique</span>";
      });

  };

  
  return (
    <div className="App">
      
      <div id="container">
        <div id="form">
          <form onSubmit={submitHandler}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" placeholder="Enter name" id="name" className="inp" required onChange={changeHandler} />
            <label htmlFor="village">Village:</label>
            <input type="text" name="village" id="village" placeholder="Enter village" className="inp" required onChange={changeHandler} />
            <label htmlFor="pincode">Pincode:</label>
            <input type="text" id="pincode" name="pincode" placeholder="Enter pincode" className="inp" required onChange={changeHandler} />
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" placeholder="Enter email" className="inp" required onChange={changeHandler} />
            <label htmlFor="phno">Phone No:</label>
            <input type="text" name="phno" id="phno" placeholder="Enter phone number" className="inp" onChange={changeHandler} />
            <div id="gen">
              <span>Gender:</span>
              <label htmlFor="m" className="labs">Male</label>
              <input type="radio" name="gender" id="m" value="Male" onChange={changeHandler} />
              <label htmlFor="f" className="labs">Female</label>
              <input type="radio" name="gender" id="f" value="Female" onChange={changeHandler} />
            </div>
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" name="dob" id="dob" className="inp" onChange={changeHandler} />
            <input type="submit" value="SUBMIT" id="submit" />
            
          </form>

          
         
        </div>
        <div id="msg">

        </div>
      </div>
      
    </div>
  );
}

export default Rform;
 
