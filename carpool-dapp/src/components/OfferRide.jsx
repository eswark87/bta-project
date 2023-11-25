// src/components/OfferRide.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import Carpool from '../contracts/Carpool.json';
const { ethereum } = window;

const OfferRide = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    departure: '',
    destination: '',
    seatsAvailable: '',
    tokenCost: '',
    registrationDeadline: '',
  });

  const [error, setError] = useState('');
  const [gasPrice, setGasPrice] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  function convertDateTimeLocalToUnix(datetimeLocalValue) {
    const datetime = new Date(datetimeLocalValue);
    const unixTimestamp = Math.floor(datetime.getTime() / 1000);
    return unixTimestamp;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    try {

      setError('');
      const {
        departure,
        destination,
        seatsAvailable,
        tokenCost,
        registrationDeadline,
      } = form;

      if (!departure || !destination || !seatsAvailable || !tokenCost || !registrationDeadline) {
        setError('All fields are required.');
        return;
      }

      if (!ethereum) {
        setError('Please install and connect to a Web3 provider (e.g., MetaMask) to create an event.');
        return;
      }

      await ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const contractAddress = '0x56285503CB1eb1e8D471d659528325C55bdAec27';
      const contractABI = Carpool.abi;
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const deadline = convertDateTimeLocalToUnix(registrationDeadline);

      const estimatedGasPrice = await provider.getGasPrice();
      setGasPrice(estimatedGasPrice.toString());

      const transaction = await contract.offerRide(departure, destination, seatsAvailable, tokenCost, deadline, {
        gasLimit: 600000,
        gasPrice: estimatedGasPrice,
      });
      console.log('Transaction sent:', transaction);

      const receipt = await transaction.wait();
      console.log('Transaction receipt:', receipt);

      if (receipt.status === 1) {
        alert('Event created successfully.');
        console.log('Ride create successfully');
      } else {
        console.error('Event creation failed. Transaction reverted.');
      }

      setForm({
        departure: '',
        destination: '',
        seatsAvailable: '',
        tokenCost: '',
        registrationDeadline: '',
      });

      navigate('/register-ride', { state: { formData: form } });
    }catch (error) {
      console.log('Error creating the event:', error);
      setError(`Error creating the event.`);
    }
    console.log('Errors:', error);
    // Navigate to RegisterRide page and pass form values as props
  };


  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ backgroundColor: '#333', padding: '10px', color: 'white', textAlign: 'center' }}>
        <h1>Offer a Ride</h1>
        <nav style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
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