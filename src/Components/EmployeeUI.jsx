import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../EmployeeUI.css'; // Import your CSS file

export default function EmployeeUI() {
  return (
    <div >
      <nav className="nav-links">
        <ul>
          <li>
            <Link to="/TicketManagement/Employee/tickets" className="nav-link" >Tickets</Link>
          </li>
          <li>
            <Link to="/TicketManagement/Employee/tickets/createTickets" className="nav-link">CreateTicket</Link>
          </li>
          <li>
            <Link to="/TicketManagement/Employee/tickets/EmNotifications" className="nav-link" >Notification</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
