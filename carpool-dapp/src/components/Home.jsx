import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Carpool App</h1>
      <Link to="/offer-ride">Offer a Ride</Link>
      <br />
      <Link to="/register-ride">Register for a Ride</Link>
      <br />
      <Link to="/complete-ride">Complete a Ride</Link>
      <br />
      <Link to="/pay-for-ride">Pay for a Ride</Link>
    </div>
  );
};

export default Home;
