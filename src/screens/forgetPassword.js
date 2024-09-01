import axios from 'axios';
import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/codeClassroom.png';
import '../style_files/authFormStyle.css';

const ForgetPasswordForm = () => {
  const navigate= useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');
      setSuccessMessage('');

      const response = await axios.post('https://codeclassroom.onrender.com/forget-password', {
        email,
      },{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }});

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        navigate("/resetPassword");
      } else {
        setError(response.data.error || 'Forget password request failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during forget password request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='main'><div className="content">
    <Image src={logoImage} alt="Logo" height="64px" />
      <div className="text">Forget Password !</div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="fas fa-user"></span>
          <label>Enter Email Address</label>
        </div>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <button  className="button"  type="submit" disabled={loading}>
          {loading ? 'Sending Reset Token...' : 'Send Reset Token'}
        </button>
       </form>
    </div></div>
    
  )}
  export default ForgetPasswordForm;