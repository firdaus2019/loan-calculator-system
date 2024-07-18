import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './AddCustomer.css';

const AddCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({
    name: '',
    month: '',
    amount: '',
    interestrate: '',
    phone: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/v1/customers/${id}`)
        .then(response => {
          setCustomer({
            name: response.data.name || '', // Ensure it's never undefined
            month: response.data.month || '',
            amount: response.data.amount || '',
            interestrate: response.data.interestrate || '',
            phone: response.data.phone || ''
          });
        })
        .catch(error => {
          console.error('Error fetching customer data:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id 
      ? axios.put(`http://localhost:8080/api/v1/customers/${id}`, customer)
      : axios.post('http://localhost:8080/api/v1/customers', customer);

    request
      .then(response => {
        console.log('Customer saved successfully:', response.data);
        navigate('/Main/customer_list');
      })
      .catch(error => {
        console.error('Error saving customer:', error);
      });
  };

  const handleCancel = () => {
    navigate('/Main/customer_list');
  };

  return (
    <div className="customer-form-container">
      <h2>{id ? 'Update' : 'Add'} Customer</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={customer.name} onChange={handleChange} required />
        </label>
        <label>
          Month:
          <input type="text" name="month" value={customer.month} onChange={handleChange} required />
        </label>
        <label>
          Amount:
          <input type="number" name="amount" value={customer.amount} onChange={handleChange} required />
        </label>
        <label>
          Interest Rate:
          <input type="text" name="interestrate" value={customer.interestrate} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" value={customer.phone} onChange={handleChange} required />
        </label>
        <div className="form-buttons">
          <button type="submit">{id ? 'Save' : 'Add'}</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
