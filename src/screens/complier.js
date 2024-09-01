import { StreamLanguage } from '@codemirror/language';
import { c } from '@codemirror/legacy-modes/mode/clike';
import { xcodeLight } from '@uiw/codemirror-theme-xcode';
import CodeMirror from '@uiw/react-codemirror';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import { Alert, Image, Spinner } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/codeClassroom.png';
import style from '../style_files/Compiler.module.css';
import AuthModal from './authModal';

export default function Compiler() {
  const [codeInput, setCodeInput] = useState("console.log('hello world!');");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const stringWithBreaks = output.replace(/\n/g, '<br/>');
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [inputValue, setInputValue] = useState("");
  const [shouldShowErrorModal, setShouldShowErrorModal] = useState(false);
  const navigator = useNavigate();
  const handleCodeChange = (value) => {
    setCodeInput(value);
  };

  const handleCompile = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await axios.post('https://codeclassroom.onrender.com/newCompile', {
        language: selectedLanguage,
        code: codeInput,
        input: inputValue,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }});
      //alert(result.data);
      setOutput(result.data);
    } catch (error) {
      console.error('Error calling server:', error);
      if (error.response) {
        if(error.response.data.message=='Unauthorized'){
          setShouldShowErrorModal(true);
        }
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        setError(`Server error: ${error.response.status} - ${error.response.data.message}`);
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from the server. Please try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='full'>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container className={style.header}>
          <Image className={style.i} src={logoImage} alt="Logo" height="48px" />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>

            <Nav>
              <div className={style.langbutton}>
                Language:&nbsp;
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">python3</option>
                  <option value="java">java</option>
                  <option value="c">c</option>
                  <option value="cpp">cpp17</option>
                  <option value="dart">dart</option>
                </select>
              </div>
              <span>&emsp; </span>
              <button className={style.RunButton} onClick={handleCompile}>
                Run Code
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className={style.cBody}>
        <Row>
          <Col>
            <CodeMirror
              className={style.cb}
              value={codeInput}
              height="60vh"
              theme={xcodeLight}
              extensions={[StreamLanguage.define(c)]}
              onChange={handleCodeChange}
            />
          </Col>
        </Row>
        <Row>
          <Col className={style.IOs}>
            <label htmlFor='inputTextArea'>Input:</label>
            <textarea
              id='inputTextArea'
              className={style.fullwidth}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Additional Input"
            />
          </Col>
          <Col className={style.IOs}>
            <label htmlFor='outputTextArea'>Output:</label>
            {loading && <Spinner animation="border" role="status" variant="primary" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {!loading && !error && (
              <div id={style.outputbloc} dangerouslySetInnerHTML={{ __html: stringWithBreaks }}></div>
            )}
          </Col>
        </Row>
        {shouldShowErrorModal && <AuthModal showErrorModal={shouldShowErrorModal} />}
      </div>
    </div>

  );
}


