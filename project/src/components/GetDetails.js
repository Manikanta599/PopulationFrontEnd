import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/getdetials.css';
import ExportData from './ExportData';

const GetDetails = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [sheetdata, setSheetdata] = useState(null);
  const [flag, setFlag] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleDownload = () => {
    console.log(sheetdata);
    setFlag(true);
  };

  const fetchData = () => {
    axios(`http://localhost:8090/get?q=${search}`)
      .then(response => {
        setData(response.data);
        setSheetdata(response.data);
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

  const deletefun = (id) => {
    console.log(id);
    axios.delete('http://localhost:8090/delete', { data: { id: id } })
      .then(res => {
        console.log('Deleted successfully', res.data);
        fetchData(); // Fetch the updated data after deletion
      })
      .catch(error => {
        console.error('Error deleting', error);
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  // Logic for displaying current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
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
            {currentItems.map((item, index) => (
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
      <div id="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        {pageNumbers.map(number => (
          <button key={number} onClick={() => handlePageChange(number)} disabled={number === currentPage}>
            {number}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageNumbers.length}>
          Next
        </button>
        <label>Per Page</label>
        <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
      {flag && <ExportData data={sheetdata} />}
    </>
  );
};

export default GetDetails;
