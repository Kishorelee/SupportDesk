import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../ReplyForTickets.css'; // Import the CSS file

const ReplyForTickets = () => {
  const { ticketId } = useParams();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [ticketData, setTicketData] = useState(null);
  const [replyData, setReplyData] = useState({
    message: '',
    status: 'In Progress',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReplyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!replyData.message.trim()) {
        console.error('Message cannot be empty');
        return;
      }

      const response = await fetch(`https://supportdeskdashboard.onrender.com/api/reply/${ticketId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(replyData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'An error occurred.';
        console.error('Reply submission failed:', errorMessage);
        return;
      }
      localStorage.setItem("reply", replyData.message);
      navigate(`/TicketManagement/SupportTeam/Alltickets/notifications`);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  useEffect(() => {
    const getTicketByTicketId = async () => {
      try {
        const response = await fetch(`https://supportdeskdashboard.onrender.com/api/getTicket/${ticketId}`, {
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
        setTicketData(data.ticket);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user tickets:', error);
      }
    };

    getTicketByTicketId();
  }, [token, userId, ticketId]);

  return (
    <div className="reply-for-tickets-container">
      <h3>ReplyForTickets</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="employee-name">EmployeeName: {ticketData.employeeName}</p>
          <p className="subject">Subject: {ticketData.subject}</p>
          <p className="description">Description: {ticketData.description}</p>
          <form className="reply-for-tickets-form" onSubmit={handleSubmit}>
            <label>
              Message:
              <textarea name="message" value={replyData.message} onChange={handleChange} />
            </label>
            <label>
              Status:
              <select name="status" value={replyData.status} onChange={handleChange}>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </label>
            <button type="submit">Submit Reply</button>
          </form>
        </>
      )}
    </div>
  );
};

export default ReplyForTickets;
