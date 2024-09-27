import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Navbar'
import Shop from './Shop';
import About from './About';
import Contact from './Contact';
// import { FaShoppingCart } from 'react-icons/fa';
import Footer from './Footer.tsx';

const App: React.FC = () => {

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
