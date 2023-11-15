// src/components/RegisterRide.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RegisterRide = () => {
  const location = useLocation();
  const [rideData, setRideData] = useState([]);
  const formData = location.state ? location.state.formData : null;

  useEffect(() => {
    if (formData) {
      // Use the previous data and add the new form data
      setRideData((prevData) => [...prevData, formData]);
    }
  }, [formData]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ backgroundColor: '#333', padding: '10px', color: 'white', textAlign: 'center' }}>
        <h1>Registered Rides</h1>
      </header>

      <main style={{ flex: 1, padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Departure</th>
              <th>Destination</th>
              <th>Seats Available</th>
              <th>Token Cost</th>
              <th>Registration Deadline</th>
            </tr>
          </thead>
          <tbody>
            {rideData.map((ride, index) => (
              <tr key={index}>
                <td>{ride.departure}</td>
                <td>{ride.destination}</td>
                <td>{ride.seatsAvailable}</td>
                <td>{ride.tokenCost}</td>
                <td>{new Date(ride.registrationDeadline).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <footer style={{ backgroundColor: '#333', padding: '10px', color: 'white', textAlign: 'center', marginTop: 'auto' }}>
        <nav style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <button style={{ margin: '0 10px' }}>Dummy Option 1</button>
          <button style={{ margin: '0 10px' }}>Dummy Option 2</button>
        </nav>
      </footer>
    </div>
  );
};

export default RegisterRide;



