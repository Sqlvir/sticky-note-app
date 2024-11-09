import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/login';
import Signup from './pages/SignUp/signup';

const routes = (
   <Router>
       <Routes>
          <Route path='/' exact element={<Login />} />
          <Route path='/stickynote' exact element={<Home />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/signup' exact element={<Signup />} />
       </Routes>
   </Router>
);

const App = () => {
  return <div>{routes}</div>;
};

export default App;
