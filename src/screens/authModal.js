// AuthModal.js
import React, { useEffect, useState } from 'react';
import { Button, Modal, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/codeClassroom.png';

const AuthModal = ({ showErrorModal }) => {
  const [show, setShow] = useState(showErrorModal);
  const [countdown, setCountdown] = useState(5); // Initial countdown value
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [show]);

  useEffect(() => {
    if (countdown === 0) {
      handleClose();
      navigate('/');
    }
  }, [countdown, navigate]);

  const handleClose = () => setShow(false);

  if (!show) {
    return null;
  }

  return (
    <Modal show={show} onHide={() => {}} backdrop="static" keyboard={false}>
      <Modal.Header closeButton={false}>
        <Image
          src={logoImage} // Replace with the actual path to your logo
          alt="CodeClassroom Logo"
          style={{ width: '50px', marginRight: '10px' }}
        />
        <Modal.Title>CodeClassroom</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You are not logged in</p>
        <p>Redirecting to Login-in Page in {countdown} seconds...</p>
      </Modal.Body>
      <Modal.Footer>
        <Link to="/">
          <Button variant="primary" onClick={handleClose}>
            Log In
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="secondary" onClick={handleClose}>
            Sign up
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthModal;
