import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from 'react-router-dom';
import '../CreateTicket.css';
const LoginPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
    employeesId: "",
    userId:"",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("https://supportdeskdashboard.onrender.com/api/user/login", loginData);
      console.log("Login successful:", response.data);
      console.log("API Response:", response.data.user);
      // Store user information in localStorage
    localStorage.setItem("userData", JSON.stringify(response.data.user));
      // Store user information in localStorage  
    // Store userId separately in localStorage
   localStorage.setItem("userId", response.data.user.userId);
   localStorage.setItem("token", response.data.user.token);
   localStorage.setItem("userName", response.data.user.userName);
  
   
   // Somewhere else in your code

   localStorage.setItem("employeesId", response.data.user.employeeId);
    

  

   
      // Redirect to the TicketManagement page
      navigate(`/TicketManagement`);
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div  className="create-ticket-container">
      <h2>Login Page</h2>
      <form className="create-ticket-form" onSubmit={handleSubmit}>
        <label>
          UserName:
          <input
            type="text"
            name="userName"
            value={loginData.userName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Employee ID:
          <input
            type="text"
            name="employeesId"
            value={loginData.employeesId}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>Login</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Link to="#">Forgot Password</Link>
      </form>
    </div>
  );
};

export default LoginPage;
