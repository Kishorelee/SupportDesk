// AllTickets.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../UserTickets.css';
export default function AllTickets() {
  const employeesId = localStorage.getItem('employeesId');
  const userName = localStorage.getItem('userName');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

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
  }, [token, userId]);

  const filterTicketsByStatus = (status) => {
    return tickets.filter((ticket) => ticket.status === status);
  };

  const handleReplyClick = (ticketId) => {
    navigate(`/TicketManagement/SupportTeam/Alltickets/replyForTicket/${ticketId}`);
  };

 
  return (
    <div className="user-tickets-container">
    <h2>Tickets</h2>
      <div className="ticket-status-section">
        
        {filterTicketsByStatus('ticket').length > 0 ? (
          <table className="user-tickets-table">
            <thead>
              <tr>
                <th className="ticket-id">Ticket ID</th>
                <th className="employee-name">Employee Name</th>
                <th className="ticket-subject">Subject</th>
                <th className="ticket-date">Date</th>
                <th className="action">Action</th>
              </tr>
            </thead>
            <tbody>
              {filterTicketsByStatus('ticket').map((ticket) => (
                <tr key={ticket._id}>
                  <td className="ticket-id">{ticket._id}</td>
                  <td className="employee-name">{ticket.employeeName}</td>
                  <td className="ticket-subject" onMouseOver={(e) => e.target.classList.add('highlight')} onMouseOut={(e) => e.target.classList.remove('highlight')}>{ticket.subject}</td>
                  <td>{ticket.createdAt}</td>
                  <td>
                    <button type="button" onClick={() => handleReplyClick(ticket._id)}>
                      ReplyForTicket
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No open tickets available.</p>
        )}
      </div>

      <div className="ticket-status-section">
        <h4>In Progress Tickets</h4>
        {filterTicketsByStatus('In Progress').length > 0 ? (
          <table className="user-tickets-table">
          <thead>
          <tr>
            <th className="ticket-id">Ticket ID</th>
            <th className="employee-name">Employee Name</th>
            <th className="ticket-subject">Subject</th>
            <th className="ticket-date">Date</th>
            <th className="action">Action</th>
          </tr>
        </thead>
        <tbody>
        {filterTicketsByStatus('In Progress').map((ticket) => (
          <tr key={ticket._id}>
            <td className="ticket-id">{ticket._id}</td>
            <td className="employee-name">{ticket.employeeName}</td>
            <td className="ticket-subject" onMouseOver={(e) => e.target.classList.add('highlight')} onMouseOut={(e) => e.target.classList.remove('highlight')}>{ticket.subject}</td>
            <td>{ticket.createdAt}</td>
            <td>
              <button type="button" onClick={() => handleReplyClick(ticket._id)}>
                ReplyForTicket
              </button>
            </td>
          </tr>
        ))}
      </tbody>
          </table>
        ) : (
          <p>No in-progress tickets available.</p>
        )}
      </div>

      <div className="ticket-status-section">
      <h4>Closed Tickets</h4>
      {filterTicketsByStatus('Closed').length > 0 ? (
        <table className="user-tickets-table">
          <thead>
            <tr>
              <th className="ticket-id">Ticket ID</th>
              <th className="employee-name">Employee Name</th>
              <th className="ticket-subject">Subject</th>
              <th className="ticket-date">Date</th>
              <th className="action">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterTicketsByStatus('Closed').map((ticket) => (
              <tr key={ticket._id}>
                <td className="ticket-id">{ticket._id}</td>
                <td className="employee-name">{ticket.employeeName}</td>
                <td className="ticket-subject" onMouseOver={(e) => e.target.classList.add('highlight')} onMouseOut={(e) => e.target.classList.remove('highlight')}>{ticket.subject}</td>
                <td>{ticket.createdAt}</td>
                <td>
                  {ticket.status === 'Closed' ? (
                    <p className="user-id">{userName} from the Support Team responded</p>
                  ) : (
                    <button type="button" onClick={() => handleReplyClick(ticket._id)}>
                      ReplyForTicket
                    </button>
                  )}
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No closed tickets available.</p>
      )}
    </div>
    

      {tickets.length === 0 && <p>No tickets available.</p>}
    </div>
  );
}
