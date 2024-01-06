// Admin.js

import React, { useState, useEffect } from 'react';
import '../Admin.css'; // Import your CSS file for styling

const Admin = () => {
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getAllTicket = async () => {
      try {
        const response = await fetch(`https://supportdeskdashboard.onrender.com/api/getAllTickets`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching user tickets: ${response.statusText}`);
        }

        const data = await response.json();
        setTickets(data);
        console.log("User Tickets:", data);
      } catch (error) {
        console.error("Error fetching user tickets:", error);
      }
    };

    getAllTicket();
  }, [token]); // Corrected dependency array

  const filterTicketsByStatus = (status) => {
    return tickets.filter((ticket) => ticket.status === status);
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="all-tickets">
        <h3>All Tickets</h3>
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Subject</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket._id}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="open-tickets">
        <h3> Unopened Tickets</h3>
        {filterTicketsByStatus('ticket').length > 0 ? (
          <table className="ticket-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filterTicketsByStatus('ticket').map((ticket) => (
                <tr key={ticket._id} className="open-ticket">
                  <td>{ticket._id}</td>
                  <td>{ticket.subject}</td>
                  <td>Tickets Not Opened</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tickets found</p>
        )}
      </div>

      <div className="pending-tickets">
        <h3>Pending Tickets</h3>
        {filterTicketsByStatus('In Progress').length > 0 ? (
          <table className="ticket-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filterTicketsByStatus('In Progress').map((ticket) => (
                <tr key={ticket._id} className="pending-ticket">
                  <td>{ticket._id}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No pending tickets found</p>
        )}
      </div>

      <div className="resolved-tickets">
        <h3>Resolved Tickets</h3>
        {filterTicketsByStatus('Closed').length > 0 ? (
          <table className="ticket-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filterTicketsByStatus('Closed').map((ticket) => (
                <tr key={ticket._id} className="resolved-ticket">
                  <td>{ticket._id}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No resolved tickets found</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
