import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getRecords`, {
          params: { page, sortBy, sortOrder, search },
        });
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchRecords();
  }, [page, sortBy, sortOrder, search]);

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div>
      <h1 align="center">Customer App</h1>
      <div class="d-flex justify-content-center h-100" >
      <div class="searchbar">
      <input
        type="text" class="search_input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by Name or Location"
      />
      <a href="#" class="search_icon"><i class="fas fa-search"></i></a>
      </div>
    </div>
      <table id="customers">
        <thead>
          <tr>
            <th onClick={() => handleSort('customer_name')}>Customer Name</th>
            <th onClick={() => handleSort('age')}>Age</th>
            <th onClick={() => handleSort('phone')}>Phone</th>
            <th onClick={() => handleSort('location')}>Location</th>
            <th onClick={() => handleSort('date')}>Date</th>
            <th onClick={() => handleSort('time')}>Time</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.sno}>
              <td>{record.customer_name}</td>
              <td>{record.age}</td>
              <td>{record.phone}</td>
              <td>{record.location}</td>
              <td>{record.date}</td>
              <td>{record.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
     <div class="container">
        <button  class="previous" disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>&lt;</button>
        <p>Page{page}</p>
        <button class="next" onClick={() => setPage((prev) => prev + 1)}>&gt;</button>
      </div>
    </div>
  );
};

export default App;
