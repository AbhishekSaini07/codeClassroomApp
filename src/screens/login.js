import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logoImage from '../assets/codeClassroom.png';
import  '../style_files/authFormStyle.css';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      const response = await axios.post('http://localhost:5000/login', {
        email,                     
        password,
      },{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }});
      console.log(response);
      

      if (response.data.success) {
       
        console.log('Login successful');
        // You can redirect or perform additional actions upon successful login
        navigate("/home");
      } else {
        setError(response.data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='main'>
    <div className="content">
    <Image src={logoImage} alt="Logo" height="64px" />
    <div className="text">Login Form</div>
    <form onSubmit={handleSubmit}>  
      <div className="field">
        <input
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="fas fa-user"></span>
        <label>Email</label>
      </div>
      <div className="field">
        <input
           type={passwordVisible ? 'text' : 'password'}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className={`fas ${
            passwordVisible ? 'fa-eye-slash' : 'fa-eye'
          } eye-icon`}
          onClick={togglePasswordVisibility}
        ></span>
        <label>Password</label>
      </div>
      <div className="forgot-pass">
        <Link to="/forgetPassword">Forgot Password?</Link>
      </div>
      {error && <div className="error-message">{error}</div>}
      <button className="button" type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Sign in'}
      </button>
      <div className="sign-up">
        Not a member? <Link to="/signup">signup now</Link>
      </div>
    </form>
    
  </div></div>
    
  );
};

export default LoginForm;
