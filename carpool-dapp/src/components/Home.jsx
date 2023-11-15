// src/components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        margin: 0,
        padding: 0,
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <header
        style={{
          backgroundColor: '#333',
          padding: '10px 20px',
          color: 'white',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <nav style={{ display: 'flex', justifyContent: 'center' }}>
          <Link
            to="/offer-ride"
            style={{
              textDecoration: 'none',
              margin: '0 10px',
              color: 'white',
              padding: '8px 15px',
              border: '2px solid white',
              borderRadius: '5px',
              transition: 'background-color 0.3s, color 0.3s',
            }}
          >
            Offer a Ride
          </Link>
          <Link
            to="/register-ride"
            style={{
              textDecoration: 'none',
              margin: '0 10px',
              color: 'white',
              padding: '8px 15px',
              border: '2px solid white',
              borderRadius: '5px',
              transition: 'background-color 0.3s, color 0.3s',
            }}
          >
            Register for a Ride
          </Link>
          <Link
            to="/complete-ride"
            style={{
              textDecoration: 'none',
              margin: '0 10px',
              color: 'white',
              padding: '8px 15px',
              border: '2px solid white',
              borderRadius: '5px',
              transition: 'background-color 0.3s, color 0.3s',
            }}
          >
            Complete a Ride
          </Link>
          <Link
            to="/pay-for-ride"
            style={{
              textDecoration: 'none',
              margin: '0 10px',
              color: 'white',
              padding: '8px 15px',
              border: '2px solid white',
              borderRadius: '5px',
              transition: 'background-color 0.3s, color 0.3s',
            }}
          >
            Pay for a Ride
          </Link>
        </nav>
      </header>

      <div
        style={{
          flex: 1,
          textAlign: 'center',
        }}
      >
        <h2>Welcome to Carpool App</h2>
        <p>Find a ride or offer one to share costs</p>
        <p>Register and complete rides</p>
        <p>Secure and easy payment options</p>
        <p>Join the carpooling community today!</p>
      </div>

      <footer
        style={{
          backgroundColor: '#333',
          padding: '10px',
          color: 'white',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div>
          <h2>Contact Us</h2>
          <p>Email: info@carpoolapp.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
        <nav style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Link
            to="/carpool-app"
            style={{
              textDecoration: 'none',
              margin: '0 10px',
              color: 'white',
              padding: '8px 15px',
              border: '2px solid white',
              borderRadius: '5px',
              transition: 'background-color 0.3s, color 0.3s',
            }}
          >
            Carpool App
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Home;





