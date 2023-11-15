import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import OfferRide from './components/OfferRide';
import RegisterRide from './components/RegisterRide';
import CompleteRide from './components/CompleteRide';
import PayForRide from './components/PayForRide';

// Placeholder for a non-existent NewComponent
const NewComponent = () => <div>This is a placeholder for NewComponent</div>;

const App = () => {
  return (
    <Router>
      <nav style={{ backgroundColor: '#333', padding: '10px', color: 'white', textAlign: 'center' }}>
        <Link to="/" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/offer-ride" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Offer a Ride</Link>
        <Link to="/register-ride" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Registered Rides</Link>
        <Link to="/complete-ride" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Complete Ride</Link>
        <Link to="/pay-for-ride" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Pay for Ride</Link>
        <Link to="/new-route" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>New Route</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer-ride" element={<OfferRide />} />
        <Route path="/register-ride" element={<RegisterRide />} />
        <Route path="/complete-ride" element={<CompleteRide />} />
        <Route path="/pay-for-ride" element={<PayForRide />} />
        <Route path="/new-route" element={<NewComponent />} />
      </Routes>
    </Router>
  );
};

export default App;




