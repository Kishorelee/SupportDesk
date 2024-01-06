// CreateTicket.js

import React, { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import '../CreateTicket.css';

const CreateTicket = () => {
  const navigate = useNavigate();
  const employeesId = localStorage.getItem('employeesId');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [ticketData, setTicketData] = useState({
    employeeName: '',
    email: '',
    phone: '',
    subject: '',
    description: '',
    status: 'ticket',
    attachment: null, // You can handle file uploads using File API
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTicketData((prevData) => ({
      ...prevData,
      attachment: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use TicketService or similar to send the data to your backend
    try {
      const response = await fetch('https://supportdeskdashboard.onrender.com/api/ticketcreation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'An error occurred.';
        console.error(errorMessage);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }

    // You can use FormData to handle file uploads
    console.log('Submitting ticket data:', ticketData);

    navigate("/TicketManagement/Employee/tickets")
  };
  return (
    <div className="create-ticket-container">
      <h2>Create Ticket</h2>
      <form className="create-ticket-form" onSubmit={handleSubmit}>
        <label>
          Employee Name:
          <input type="text" name="employeeName" value={ticketData.employeeName} onChange={handleChange} />
        </label>
        <br></br>
        <label>
          Email:
          <input type="email" name="email" value={ticketData.email} onChange={handleChange} />
        </label>
        <br></br>
        <label>
          Phone Number:
          <input type="tel" name="phone" value={ticketData.phone} onChange={handleChange} />
        </label>
        <br></br>
        <label>
          Subject:
          <input type="text" name="subject" value={ticketData.subject} onChange={handleChange} />
        </label>
        <br></br>
        <label>
          Description:
          <textarea name="description" value={ticketData.description} onChange={handleChange} />
        </label>
        <br></br>
        <label>
          Status:
          <select name="status" value={ticketData.status} onChange={handleChange}>
            <option value="ticket">ticket</option>
          </select>
        </label>
        <br></br>
        <button type="submit" >Create Ticket</button>
      </form>
    </div>
  );
};

export default CreateTicket;
