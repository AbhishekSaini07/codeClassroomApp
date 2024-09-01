import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Image, ListGroup, ListGroupItem, Nav, Row } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import Navbar from 'react-bootstrap/Navbar';
import { FaFilter, FaSearch } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import logoImage from '../assets/codeClassroom.png';
import CompilerImage from '../assets/onlinecompiler.png';
import style from '../style_files/Compiler.module.css';
import AuthModal from './authModal';
export default function HomePage(){
    const [questions, setQuestions] = useState([]);
    const [searchParams, setSearchParams] = useState({
      difficulty: '',
      title: '',
      tags: '',
    });
    const [allTags, setAllTags] = useState([
      'Stack', 'Queue', 'Hashmap', 'Design', 'BFS (Breadth-First Search)',
      'Dynamic Programming', 'Union Find', 'Backtracking', 'Tree', 'Loops',
      'Patterns', 'String', 'DFS (Depth-First Search)', 'Array', 'Recursion',
      'Hard', 'Basic'
    ]);
    const navigate = useNavigate();
    const NavigateToCompiler = () => {
     
        navigate("/compiler");
    }
    const [shouldShowErrorModal, setShouldShowErrorModal] = useState(false);


    useEffect(() => {
      handleSearch();
    }, []);
    // const handleInputChange = (e) => {
    //   const { name, value } = e.target;
    //   setSearchParams((prevParams) => ({
    //     ...prevParams,
    //     [name]: value,
    //   }));
    //   alert(searchParams.difficulty + searchParams.tags + searchParams.title);
    // };
  
    // const handleSelectTag = (tag) => {
    //   console.log(searchParams.tags);
    //   setSearchParams((prevParams) => ({
    //     ...prevParams,
    //     tags: tag,
    //   }));
    //   alert(searchParams.tags);
    // };
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setSearchParams((prevParams) => ({
        ...prevParams,
        [name]: value,
      }));
     
      
    };

const handleSelectTag = (tag) => {
  setSearchParams((prevParams) => ({
    ...prevParams,
    tags: tag,
  }));
 
};

    const handleSearch = () => {
      axios.get('https://codeclassroom.onrender.com/questions', { withCredentials: true, params:searchParams })
      .then(response => setQuestions(response.data))
      .catch(error => {
        console.error('Error fetching questions:', error);
  
        if (error.response && error.response.data.message === 'Unauthorized') {
          // Redirect to the login page or handle unauthorized access
          // For example, you can use react-router or window.location.href
          // to navigate to the login page
          setShouldShowErrorModal(true);
          
        }
      });
    };
    
    const TagListComponent = ({ tags, selectedTag, onSelectTag }) => {
      return (
        <Nav defaultActiveKey="All" className="flex-column" style={{ backgroundColor: 'rgba(216, 216, 216, 0.3)', padding: '15px' }}>
          <Nav.Item>
            <Nav.Link
              eventKey="All"
              onClick={() => onSelectTag("")}
              style={{
                borderBottom: '1px solid #ccc',
                padding: '10px',
                color: selectedTag === "All" ? 'blue' : 'inherit',
                textDecoration: 'none',
                backgroundColor: selectedTag === "All" ? 'lightblue' : 'inherit', // Highlight effect
              }}
            >
              All
            </Nav.Link>
          </Nav.Item>
          {tags.map(tag => (
            <Nav.Item key={tag}>
              <Nav.Link
                eventKey={tag}
                onClick={() => onSelectTag(tag)}
                style={{
                  borderBottom: '1px solid #ccc',
                  padding: '10px',
                  color: selectedTag === tag ? 'blue' : 'inherit',
                  textDecoration: 'none',
                  backgroundColor: selectedTag === tag ? 'lightblue' : 'inherit', // Highlight effect
                }}
              >
                {tag}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      );
    };
    

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
      
      const handleLogout = () => {
        axios.get('https://codeclassroom.onrender.com/logout', { withCredentials: true})
        .then(response =>  window.location.href = '/')
        .catch(error => {
          console.error('Error While Logout', error);
        });

      }

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
              
              
            <Button style={{width:"120px", marginRight:"-80px"}} variant="secondary" onClick={handleLogout} className="d-flex align-items-center">
      <PersonFill size={20} className="mr-2" /> {/* Sign-in icon */}
     &nbsp;  Log Out
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
        <Row>
          <Col md={9}>
             <Row>
               <Col> 
                <Row>
                    <Form>
                    <Col md={12}> 
                    <Form.Group controlId="difficulty" >
                    <Form.Label ><FaFilter /> Difficulty:</Form.Label>
                    <Form.Control as="select" name="difficulty" 
                    value={searchParams.difficulty} onChange={handleInputChange}
                   >
                    <option value="">Select Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    </Form.Control>
                    </Form.Group>
                    </Col>
                    <Col md={12}> 
                    <Form.Group controlId="title" >
                    <Form.Label ><FaSearch /> Title:</Form.Label>
                    <Form.Control type="text" name="title" value={searchParams.title} 
                    onChange={handleInputChange} placeholder="Enter title" style={{ width: "100%" }} />
                    </Form.Group>
                    </Col>
                    </Form>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={12}> 
              <br/><button style={{width:"100%", height:"80%"}} className={style.RunButton} onClick={handleSearch}>
              Search Question
              </button>
              </Col>
            </Row>
            <Row>
              
              <Col>
                <div className={style.Qn}><QuestionList/></div>
               
              </Col>
            </Row>
          </Col>
         <Col md={3}>{
          <TagListComponent tags={allTags} selectedTag={searchParams.tags} onSelectTag={handleSelectTag} />}
          </Col>
        
        </Row>
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
      {shouldShowErrorModal && <AuthModal showErrorModal={shouldShowErrorModal} />}

       
         
          
           

            
      
      
   </div>);
        
}