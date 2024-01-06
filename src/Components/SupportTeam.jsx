import React from 'react'
import { Link,Outlet } from 'react-router-dom'
import '../EmployeeUI.css'; 
export default function SupportTeam() {
  return (
    <div>
    <nav className="nav-links">
    <ul>
      <li>
        <Link to="/TicketManagement/SupportTeam/Alltickets" className="nav-link" >AllTickets</Link>
      </li>
      <li>
        <Link to="/TicketManagement/SupportTeam/Alltickets/replyForTicket/:ticketId" className="nav-link" ></Link>
      </li>
      <li>
        <Link to="/TicketManagement/SupportTeam/Alltickets/notifications" className="nav-link" >Notification</Link>
      </li>
    </ul>
  </nav>
  <Outlet />
    
    </div>
  )
}
