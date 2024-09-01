// ResetPasswordForm.js
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { Image } from 'react-bootstrap';
import React, { useState } from 'react';
import logoImage from '../assets/codeClassroom.png';
import '../style_files/authFormStyle.css';
import { Link, useNavigate } from 'react-router-dom';
const ResetPasswordForm = ({ history }) => {
  const navigator = useNavigate();
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleResetPassword = async () => {
   

    if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    try {
      setLoading(true);
      setError('');
      setSuccessMessage('');

      const response = await axios.post('https://codeclassroom.onrender.com/reset-password', {
        withCredentials: true,
        token: resetCode,
        newPassword,
      },{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }});

      if (response.data.success) {
        alert("done");
        // setSuccessMessage('Password reset successfully');
        navigator("/");
        // Redirect to a login page or another relevant page after successful reset
        // You can customize the redirection based on your application's flow
        
      } else {
        setError(response.data.error || 'Password reset failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during password reset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='main'> <div className="content">
     <Image src={logoImage} alt="Logo" height="64px" />
    <div className="text">Reset Password</div>
    <form onSubmit={handleResetPassword}>
      <div className="field">
      <input
        type="text"
        id="resetCode"
        value={resetCode}
        onChange={(e) => setResetCode(e.target.value)}
        placeholder="Reset Code"
      />
        <label>Reset Code</label>
      </div>
      <div className="field">
        <input
           type={passwordVisible ? 'text' : 'password'}
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Password"
        />
         <span
          className={`fas ${
            passwordVisible ? 'fa-eye-slash' : 'fa-eye'
          } eye-icon`}
          onClick={togglePasswordVisibility}
        ></span>
      </div>
      <div className="field">
        <input
          type={passwordVisible ? 'text' : 'password'}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
         <span
          className={`fas ${
            passwordVisible ? 'fa-eye-slash' : 'fa-eye'
          } eye-icon`}
          onClick={togglePasswordVisibility}
        ></span>
      </div>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <button  className="button"  type="submit" disabled={loading}>
        {loading ? 'Resetting password...' : 'Reset Password'}
      </button>
      <Link to="/">Sign in</Link>
     </form>
  </div></div>
   
  )};

 

export default ResetPasswordForm;
