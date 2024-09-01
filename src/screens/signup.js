import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/codeClassroom.png';
import '../style_files/authFormStyle.css';

const SignupForm = () => {
  const navigator = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await axios.post('https://codeclassroom.onrender.com/signup', {
        withCredentials: true,
        name,
        email,
        password,
      },{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }});

      if (response.data.success) {
        console.log('Signup successful');
        // You can redirect or perform additional actions upon successful signup
        navigator("/home");
      } else {
        setError(response.data.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='main'> <div className="content">
    <Image src={logoImage} alt="Logo" height="64px" />
   <div className="text">Create New Account</div>
   <form onSubmit={handleSubmit}>
     <div className="field">
       <input
         type="text"
         required
         value={name}
         onChange={(e) => setName(e.target.value)}
         placeholder="Full Name"
       />
     </div>
     <div className="field">
       <input
         type="text"
         required
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         placeholder="Email"
       />
     </div>
     <div className="field">
       <input
          type={passwordVisible ? 'text' : 'password'}
         required
         value={password}
         onChange={(e) => setPassword(e.target.value)}
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
     <button  className="button"  type="submit" disabled={loading}>
       {loading ? 'Signing up...' : 'Sign up'}
     </button>
     <div className="sign-in">
       Already have an account? <Link to="/">Sign in</Link>
     </div>
   </form>
 </div></div>
   
  );
};

export default SignupForm;
