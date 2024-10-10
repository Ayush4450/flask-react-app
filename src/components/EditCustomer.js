import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCustomer = () => {
  const { id } = useParams(); // Get the customer ID from the URL
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dish_selected: '',
    rating: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch customer details when the component loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized access');
      return;
    }

    axios.get(`http://localhost:5000/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setCustomer(response.data); // Set the customer data
      })
      .catch(error => {
        setError('Failed to fetch customer details');
      });
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // Handle form submission for updating the customer
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized access');
      return;
    }

    axios.put(`http://localhost:5000/customers/${id}`, customer, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        navigate('/'); // Redirect to the customer list after successful update
      })
      .catch(error => {
        setError('Failed to update customer');
      });
  };

  return (
    <div className="edit-customer">
      <h2>Edit Customer</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={customer.name} onChange={handleChange} required />
        <input type="email" name="email" value={customer.email} onChange={handleChange} required />
        <input type="text" name="phone" value={customer.phone} onChange={handleChange} required />
        <input type="text" name="address" value={customer.address} onChange={handleChange} required />
        <input type="text" name="dish_selected" value={customer.dish_selected} onChange={handleChange} required />
        <input type="number" name="rating" value={customer.rating} onChange={handleChange} required />
        <button type="submit">Update Customer</button>
      </form>
    </div>
  );
};

export default EditCustomer;