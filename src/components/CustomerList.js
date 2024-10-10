import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');

  // Fetch the list of customers when the component loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized access');
      return;
    }

    axios.get('http://localhost:5000/customers', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => setCustomers(response.data))
      .catch(error => setError('Failed to fetch customers'));
  }, []);

  // Handle customer deletion
  const deleteCustomer = (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized access');
      return;
    }

    axios.delete(`http://localhost:5000/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        // Update the customer list after successful deletion
        setCustomers(customers.filter(customer => customer.id !== id));
      })
      .catch(error => setError('Failed to delete customer'));
  };

  return (
    <div className="customer-list">
      <h2>Customer List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Dish Selected</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td>{customer.dish_selected}</td>
              <td>{customer.rating}</td>
              <td>
                <Link to={`/edit/${customer.id}`}><button>Edit</button></Link>
                <button onClick={() => deleteCustomer(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;