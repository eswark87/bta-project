import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import OfferRide from './components/OfferRide';
import RegisterRide from './components/RegisterRide';
import CompleteRide from './components/CompleteRide';
import PayForRide from './components/PayForRide';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer-ride" element={<OfferRide />} />
        <Route path="/register-ride" element={<RegisterRide />} />
        <Route path="/complete-ride" element={<CompleteRide />} />
        <Route path="/pay-for-ride" element={<PayForRide />} />
      </Routes>
    </Router>
  );
};

export default App;


