// CustomerList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component
import './CustomerList.css';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch customers from the backend
    const fetchCustomers = () => {
        axios.get('http://localhost:8080/api/v1/customers')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('Error fetching customer data:', error);
                setError(error);
            });
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleUpdateCustomer = (id) => {
        navigate(`/Main/customer_update/${id}`);
    };

    const handleDeleteCustomer = (id) => {
        axios.delete(`http://localhost:8080/api/v1/customers/${id}`)
            .then(() => {
                setCustomers(customers.filter(customer => customer.id !== id));
            })
            .catch(error => {
                console.error('Error deleting customer:', error);
            });
    };

    return (
        <div className="customer-table-container">
            <Navbar /> {/* Add the Navbar here */}
            <h2>Customer List</h2>
            {error && <div className="error-message">Error fetching customer data: {error.message}</div>}
            <button className="add-customer" onClick={() => navigate('/Main/customer_add')}>Add</button>
            <table id="customerTable" className="customer-table">
                <thead>
                    <tr>
                        <th className="small-col">ID</th>
                        <th>Name</th>
                        <th>Month</th>
                        <th>Amount</th>
                        <th>Interest Rate</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.month}</td>
                            <td>{customer.amount}</td>
                            <td>{customer.interestrate}</td>
                            <td>{customer.phone}</td>
                            <td>
                                <button onClick={() => handleUpdateCustomer(customer.id)}>Update</button>
                                <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;
