// TicketManagement.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate,Outlet } from 'react-router-dom';

const TicketManagement = () => {
  const navigate = useNavigate();

  const employeesId = localStorage.getItem('employeesId'); 
  const isEmployeePage = employeesId && employeesId.startsWith('EMP');
  const isSupportTeamPage = employeesId && employeesId.startsWith('SUPTM');
  const isAdminPage = employeesId && employeesId.startsWith('ADMIN');
  console.log(isEmployeePage, isSupportTeamPage, isAdminPage);

  useEffect(() => {
    // Conditionally navigate based on the role
    if (isEmployeePage) {
      navigate('/TicketManagement/Employee/tickets');
    } else if (isSupportTeamPage) {
      navigate('/TicketManagement/SupportTeam/Alltickets');
    } else if (isAdminPage) {
      // Navigate to the admin page or handle accordingly
      navigate('/TicketManagement/Adminpage');
    }
  }, []);

  return (
    <div>
      <h2>Ticket Management Page</h2>
      {/* You can render additional content if needed */}
      <Outlet />
    </div>
  );
};

export default TicketManagement;
