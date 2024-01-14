import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import Compiler from './screens/complier';
import ForgetPasswordForm from './screens/forgetPassword';
import LoginForm from './screens/login';
import QuestionCompiler from './screens/questionCompiler';
import ResetPasswordForm from './screens/resetPassword';
import SignupForm from './screens/signup';
import HomePage from './screens/home';


class App extends Component { 
  render() { 
    return ( 
    <Router> 
    
      <div className="App"> 
      <Routes> 
          <Route exact path='/' element={< LoginForm />}></Route> 
          <Route exact path='/home' element={< HomePage />}></Route> 
          <Route exact path='/signup' element={< SignupForm />}></Route> 
          <Route exact path='/compiler' element={< Compiler />}></Route> 
          <Route exact path='/forgetPassword' element={< ForgetPasswordForm/>}></Route> 
          <Route exact path='/resetPassword' element={< ResetPasswordForm/>}></Route> 
          <Route exact path="/home/:id" element={<QuestionCompiler/>} />
      </Routes> 
      </div> 
    </Router> 
  ); 
  } 
  } 
  
  export default App;
  

  
  

