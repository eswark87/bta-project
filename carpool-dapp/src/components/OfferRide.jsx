// src/components/OfferRide.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OfferRide = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    departure: '',
    destination: '',
    seatsAvailable: '',
    tokenCost: '',
    registrationDeadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);

    // Navigate to RegisterRide page and pass form values as props
    navigate('/register-ride', { state: { formData: form } });
  };


  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ backgroundColor: '#333', padding: '10px', color: 'white', textAlign: 'center' }}>
        <h1>Offer a Ride</h1>
        <nav style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <button style={{ margin: '0 10px' }}>Dummy Button 1</button>
          <button style={{ margin: '0 10px' }}>Dummy Button 2</button>
        </nav>
      </header>

      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <form
          onSubmit={handleSubmit}
          style={{ width: '80%', maxWidth: '400px', border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}
        >
          <label style={{ marginBottom: '10px', display: 'block' }}>
            Departure:
            <input
              type="text"
              name="departure"
              value={form.departure}
              onChange={handleChange}
              placeholder="Enter departure location"
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>

          <label style={{ marginBottom: '10px', display: 'block' }}>
            Destination:
            <input
              type="text"
              name="destination"
              value={form.destination}
              onChange={handleChange}
              placeholder="Enter destination location"
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>

          <label style={{ marginBottom: '10px', display: 'block' }}>
            Seats Available:
            <input
              type="number"
              name="seatsAvailable"
              value={form.seatsAvailable}
              onChange={handleChange}
              placeholder="Enter available seats"
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>

          <label style={{ marginBottom: '10px', display: 'block' }}>
            Token Cost:
            <input
              type="number"
              name="tokenCost"
              value={form.tokenCost}
              onChange={handleChange}
              placeholder="Enter token cost"
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>

          <label style={{ marginBottom: '10px', display: 'block' }}>
            Registration Deadline:
            <input
              type="datetime-local"
              name="registrationDeadline"
              value={form.registrationDeadline}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>

          <button type="submit" style={{ marginTop: '10px', width: '100%' }}>
            Submit
          </button>
        </form>
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

export default OfferRide;







