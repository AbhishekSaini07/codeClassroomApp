import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, ListGroup, ListGroupItem, Nav, Row } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import logoImage from '../assets/codeClassroom.png';
import CompilerImage from '../assets/onlinecompiler.png';

export default function HomePage(){
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();
    const NavigateToCompiler = () => {
     
        navigate("/compiler");
    }
    useEffect(() => {
        // Fetch questions from the server
        axios.get('http://localhost:5000/questions')
          .then(response => setQuestions(response.data))
          .catch(error => console.error('Error fetching questions:', error));
      }, []);

      const Content = () => {
        return (
          <Container fluid className="text-center mt-5 content-container">
            
                  
      
            <Row className="mt-5">
              <Col>
                <div className="content-box">
                  <h2>Join CodeClassroom Today</h2>
                  <p>
                    Start your coding journey with CodeClassroom. Try our online compiler, conquer DSA questions, and get ready
                    for the next level of coding excellence. Whether you're a student, a professional, or someone eager to explore
                    the coding universe, CodeClassroom is here to guide you every step of the way.
                  </p>
                  <p>Experience the joy of coding. Experience CodeClassroom.</p>
                  <Button variant="success">Join CodeClassroom</Button>
                </div>
              </Col>
            </Row>
          </Container>
        );
      };
      const handleSignIn = () => {
        navigate("/");
      };

      const QuestionList = () => {
        const [selectedQuestion, setSelectedQuestion] = useState(null);
      
        const handleCardClick = (question) => {
          setSelectedQuestion(question.id === selectedQuestion ? null : question.id);
        };
        
      
        return (
          <div>
            {questions.map((question) => (
                <a style={{textDecoration:"none"}} href={`/home/${question.id}`}>
              <Card
                key={question.id}
                style={{
                  width: '100%',
                  marginBottom: '20px',
                  cursor: 'pointer',
                  boxShadow:
                    selectedQuestion === question.id ? '0 4px 8px rgba(0, 123, 255, 0.5)' : 'none',
                }}
                onClick={() => handleCardClick(question)}
              >
                <Card.Body>
                  <Card.Title>{question.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Difficulty: {question.difficulty}
                  </Card.Subtitle>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    Tags: {question.tags ? question.tags.join(', ') : 'No tags'}
                  </ListGroupItem>
                </ListGroup>
              </Card></a>
            ))}
          </div>
        );
      };

    return(<div>
     <div className='hh'>
     {/* <Navbar className="bg-body">
        <Container>
          <Navbar.Brand href="#home">
          <div className='hlb'><Image src={logoImage} alt="Logo" height="42px" />
           <span className='htext'>CodeClassroom</span></div>
          
          </Navbar.Brand>
          
          
        </Container>
        
        
      </Navbar> */}
      <Navbar collapseOnSelect expand="lg" className="bg-body">
        <Container >
          <Image className='hlb' src={logoImage} alt="Logo" height="48px" />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>

            <Nav>
              
              
            <Button style={{width:"120px", marginRight:"-80px"}} variant="primary" onClick={handleSignIn} className="d-flex align-items-center">
      <PersonFill size={20} className="mr-2" /> {/* Sign-in icon */}
     &nbsp;   Sign In
    </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
      <Row>
      <Col sm={6} className='ht'>
      <h1 className='ch'>Explore Our Online Compiler </h1>
      <p>Ready to code? Dive into the coding world with our user-friendly online compiler. Whether you're a coding newbie or 
      a seasoned pro, our platform offers a hassle-free space to experiment and test your code in real-time. Enjoy a smooth coding experience and refine your skills on the spot.</p>
      <button onClick={NavigateToCompiler} className='hBtn'>Try Now</button>
      </Col>
      <Col sm={6}  >
      <Image className="oImg" src={CompilerImage} alt="Logo" width="80%" />
        
      </Col>
      

      </Row>
      <Row>
      <Col sm={12} className='hrc2'>
        <h2>DSA Questions for Every Level</h2>
        <br/>

        <QuestionList/>
    
      
      </Col>

      </Row>
      <Row>
      <Col sm={12} >
        <Content/>
      </Col>

      </Row>
      <footer className="footer mt-1">
        <Container fluid>
          <Row>
            <Col className="text-center">
              <p>&copy; 2024 CodeClassroom. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
      
       
         
          
           

            
      
      
   </div>);
        
}