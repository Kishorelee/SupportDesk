import React, { useState, useEffect } from 'react';
import '../UserTickets.css'; // Import the CSS file for styling

const UserTickets = () => {
  const employeesId = localStorage.getItem('employeesId');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const getUserByIdTicket = async () => {
      try {
        const response = await fetch(`https://supportdeskdashboard.onrender.com/api/getTicketsByUserId/${userId}`, {
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

    getUserByIdTicket();
  }, [token, userId]);

  const filterTicketsByStatus = (status) => {
    return tickets.filter((ticket) => ticket.status === status);
  };

  return (
    <div className="user-tickets-container">
      <h3>Tickets</h3>
      <div className="ticket-status-section">
        {filterTicketsByStatus('ticket').length > 0 ? (
          <table className="user-tickets-table">
            <thead>
              <tr>
                <th className="ticket-id">Ticket ID</th>
                <th className="ticket-subject">Subject</th>
                <th className="ticket-date">Date</th>
              </tr>
            </thead>
            <tbody>
              {filterTicketsByStatus('ticket').map((ticket) => (
                <tr key={ticket._id}>
                  <td className="ticket-id">{ticket._id}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tickets available.</p>
        )}
      </div>

      <div className="ticket-status-section">
        <h4>In Progress Tickets</h4>
        {filterTicketsByStatus('In Progress').length > 0 ? (
          <table className="user-tickets-table">
            <thead>
              <tr>
                <th className="ticket-id">Ticket ID</th>
                <th className="ticket-subject">Subject</th>
                <th className="ticket-date">Date</th>
              </tr>
            </thead>
            <tbody>
              {filterTicketsByStatus('In Progress').map((ticket) => (
                <tr key={ticket._id}>
                  <td className="ticket-id">{ticket._id}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No in progress tickets available.</p>
        )}
      </div>

      <div className="ticket-status-section">
        <h4>Closed Tickets</h4>
        {filterTicketsByStatus('Closed').length > 0 ? (
          <table className="user-tickets-table">
            <thead>
              <tr>
                <th className="ticket-id">Ticket ID</th>
                <th className="ticket-subject">Subject</th>
                <th className="ticket-date">Date</th>
              </tr>
            </thead>
            <tbody>
              {filterTicketsByStatus('Closed').map((ticket) => (
                <tr key={ticket._id}>
                  <td className="ticket-id">{ticket._id}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No closed tickets available.</p>
        )}
      </div>
    </div>
  );
};

export default UserTickets;
