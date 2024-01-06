import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import '../CreateTicket.css';
export default function SignupPage() {
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const [showPassword, setShowPassword] = useState(false);
  const [signUpData, setSignUpData] = useState({
    // Personal Details
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    // Employees Details
    employeesId: "",
    department: "",
    position: "",
    // Authentication
    userName: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    username: '',
    email: '',
    employeesId: '',
    password: ''
  });

  const updateValue = (fieldName, value) => {
    setSignUpData({
      ...signUpData,
      [fieldName]: value,
    });

    setErrorMessages({
      ...errorMessages,
      [fieldName]: "",  // Clear the error message when the user starts typing again
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://supportdeskdashboard.onrender.com/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'An error occurred.';

        // You can now handle the error message as needed
        console.error('SignUp failed:', errorMessage);
        // Update error messages based on the server response
        setErrorMessages({
          username:  "",
          email:  '',
          employeesId: '',
          password: errorMessage
        });
        return;
      }

      // Redirect to the login page on successful signup
      navigate('/LoginPage'); // Use navigate instead of history.push
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="create-ticket-container">
      <h1>SignupPage</h1>
      <form  className="create-ticket-form" onSubmit={handleSubmit}>
        <label>firstName :
        <input
          type="text"
          value={signUpData.firstName}
          onChange={(e) => updateValue('firstName', e.target.value)}
        />
        </label>
        <br></br>
        <label>lastName :
        <input
          type="text"
          value={signUpData.lastName}
          onChange={(e) => updateValue('lastName', e.target.value)}
        />
        </label><br></br>
        <label>email :
        <input
          type="text"
          value={signUpData.email}
          onChange={(e) => updateValue('email', e.target.value)}
        />
        {errorMessages.email && (
            <p style={{ color: 'red' }}>{errorMessages.email}</p>
          )}
        </label><br></br>
        <label> phoneNo :
        <input
          type="text"
          value={signUpData.phoneNo}
          onChange={(e) => updateValue('phoneNo', e.target.value)}
        />
        </label><br></br>
        <label> employeesId :
        <input
          type="text"
          value={signUpData.employeesId}
          onChange={(e) => updateValue('employeesId', e.target.value)}
        />
        {errorMessages.employeesId && (
            <p style={{ color: 'red' }}>{errorMessages.email}</p>
          )}
        </label><br></br>
        <label>  department :
        <input
          type="text"
          value={signUpData.department}
          onChange={(e) => updateValue('department', e.target.value)}
        />
        </label><br></br>
        <label> position :
        <input
          type="text"
          value={signUpData.position}
          onChange={(e) => updateValue('position', e.target.value)}
        />
        </label><br></br>
        <label>  userName :
        <input
          type="text"
          value={signUpData.userName}
          onChange={(e) => updateValue('userName', e.target.value)}
          
        />
        {errorMessages.username && (
            <p style={{ color: 'red' }}>{errorMessages.username}</p>
          )}
        </label><br></br>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ marginRight: '10px', flex: '70%' }}>
          Password :
          <input
            type={showPassword ? 'text' : 'password'}
            value={signUpData.password}
            onChange={(e) => updateValue('password', e.target.value)}
            style={{ width: '100%' }}
          />
          {errorMessages.password && (
            <p style={{ color: 'red' }}>{errorMessages.password}</p>
          )}
        </label>
        <button
          type="button"
          className="toggle-password-button"
          onClick={handleTogglePassword}
          style={{ padding: '5px', fontSize: 'small', flex: '10%' ,margin: '20px 0px 0px 0px' }}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <br />
      <label>
        Confirm password :
        <input
          type={showPassword ? 'text' : 'password'}
          // ... (handle confirm password value)
        />
        {/* Add a button to toggle visibility for confirm password as well if needed */}
      </label>
      <br />
      <button type="submit">submit</button>
      </form>
    </div>
  );
}
