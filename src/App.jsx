import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/LayoutUI";
import HomePage from "./Components/HomePage";
import SignupPage from "./Components/SignupPage";
import TicketManagement from "./Components/TicketManagement";
import LoginPage from "./Components/LoginPage";
import SupportTeam from "./Components/SupportTeam";
import Admin from "./Components/AdminPage";
import EmployeeUI from "./Components/EmployeeUI";
import CreateTicket from "./Components/CreateTicket";
import UserTickets from "./Components/UserTickets";
import Notifications from "./Components/Notifications";
import ReplyForTickets from "./Components/ReplyForTickets"
import AllTickets from "./Components/AllTickets";
import EmNotificatiom from "./Components/EmNotificatiom";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="TicketManagement" element={<TicketManagement />}>
            <Route path="Employee/tickets" element={<EmployeeUI />}>
              {/* Nested route for UserTickets */}
              <Route index element={<UserTickets />} />
              <Route path="createTickets" element={<CreateTicket />} />
              <Route path="EmNotifications" element={<EmNotificatiom />} />
            </Route>
            <Route path="SupportTeam/Alltickets" element={<SupportTeam />} >
            <Route index element={<AllTickets />} />
            <Route path="replyforTicket/:ticketId" element={<ReplyForTickets />} />
            <Route path="notifications" element={<Notifications />} />

            </Route>
            {/* Add more nested routes if needed */}
            <Route path="Adminpage" element={<Admin />} ></Route>
          </Route>
          <Route path="SignupPage" element={<SignupPage />} />
          <Route path="LoginPage" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
