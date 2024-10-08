// ResetPasswordForm.js
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/codeClassroom.png';
import '../style_files/authFormStyle.css';
const ResetPasswordForm = ({ history }) => {
  const navigate = useNavigate();
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

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    try {
      setLoading(true);
      setError('');
      setSuccessMessage('');

      const response = await axios.post('https://codeclassroom.onrender.com/resetPassword', {
        withCredentials: true,
        token: resetCode,
        newPassword,
      },{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }});
        console.log(response.data);

      if (response.data.success) {
        alert("Password Reset Successfully");
        setSuccessMessage('Password reset successfully');
        navigate("/");

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
