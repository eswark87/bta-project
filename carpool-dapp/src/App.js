import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import OfferRide from './components/OfferRide';
import RegisterRide from './components/RegisterRide';
import CompleteRide from './components/CompleteRide';
import  CheckBalance from './components/CheckBalance';
import CollectTokens from './components/CollectTokens';
const App = () => {
  return (
    <Router>
      <nav style={{ backgroundColor: '#333', padding: '10px', color: 'white', textAlign: 'center' }}>
        <Link to="/" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/offer-ride" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Offer a Ride</Link>
        <Link to="/register-ride" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Available Rides</Link>
        <Link to="/complete-ride" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Complete Ride</Link>
        <Link to="/check-balance" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Check Balance</Link>
        <Link to="/collect-tokens" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Collect Tokens</Link> {/* New Link */}
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer-ride" element={<OfferRide />} />
        <Route path="/register-ride" element={<RegisterRide />} />
        <Route path="/complete-ride" element={<CompleteRide />} />
        <Route path="/check-balance" element={<CheckBalance />} />
        <Route path="/collect-tokens" element={<CollectTokens />} />
      </Routes>
    </Router>
  );
};

export default App;




