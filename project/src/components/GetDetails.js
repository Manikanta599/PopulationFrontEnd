import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/getdetials.css';
import ExportData from './ExportData';
const GetDetails = () => {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const[sheetdata,setsheetdata]=useState(null);
  const[flag,setflag]=useState(false); //for conditional redering

  const handleDownload=()=>
    {
      console.log(sheetdata);
      setflag(true);
    }
  const fetchData = () => {
    axios(`http://localhost:8090/get?q=${search}`)
      .then(response => {
        setData(response.data);
        setsheetdata(response.data);
      })
      .catch(error => {
        console.error('Error fetching the data:', error);
      });
  };

  useEffect(() => {
    
    fetchData();

  }, [search]);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setSearch(value);
    
  };

  function deletefun(id) {
    console.log(id);
    axios.delete('http://localhost:8090/delete', { data: { id: id } })
        .then(res => {
            console.log('Deleted successfully', res.data);
            // Fetch the updated data after deletion
            fetchData();
        })
        .catch(error => {
            console.error('Error deleting', error);
        });
  }

  return (
    <>
      <h1 id="title">Details of registered People</h1>
      <div id="search">
        <span>Search: </span>
        <input type='text' value={search} onChange={handleSearchChange} />
      </div>
      <div id="download">
          <button onClick={handleDownload}>Download Data</button>
      </div>
      <div id="table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Village</th>
              <th>Pincode</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.village}</td>
                <td>{item.pincode}</td>
                <td>{item.email}</td>
                <td>{item.phno}</td>
                <td>{item.gender}</td>
                <td>{new Date(item.dob).toLocaleDateString()}</td>
                <td><button onClick={() => deletefun(item.id)}>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {flag && <ExportData data={sheetdata}/>}
    </>
  );
};



export default GetDetails;
