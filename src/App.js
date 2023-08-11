import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
// import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';

const App = () => {

  return (
    <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<HomePage/>} exact/>
          <Route path='/coins/:id' element={<CoinPage/>}/>
        </Routes>
        {/* <Footer/> */}
    </Router>
  )
};

export default App;