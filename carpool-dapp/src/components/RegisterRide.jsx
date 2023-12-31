// src/components/RegisterRide.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import Carpool from '../contracts/Carpool.json';
import EachRide from './EachRide';


const RegisterRide = () => {
  const location = useLocation();
  const formData = location.state ? location.state.formData : null;
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [userAddress, setUserAddress] = useState('');

  const contractAddress = '0x56285503CB1eb1e8D471d659528325C55bdAec27';
  const contractABI = Carpool.abi;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setUserAddress(accounts[0]);
          console.log('User Address:', accounts[0]);
        } else {
          setError('MetaMask not installed.');
        }
      } catch (error) {
        console.error('Error fetching user address:', error);
        setError('Error fetching user address. Ensure MetaMask is connected to the correct network.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (userAddress) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(contractAddress, contractABI, provider);
          const result = await contract.getAllRides();
          console.log('Result', result);
          setData(result);
        }
      } catch (error) {
        console.log('Error fetching user events:', error);
        setError('Error fetching user events. Ensure MetaMask is connected to the correct network.');
      }
    };

    // Fetch events only if userAddress is available
    if (userAddress) {
      fetchEvents();
    }
  }, [userAddress, contractABI]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ backgroundColor: '#333', padding: '10px', color: 'white', textAlign: 'center' }}>
        <h1>Available Rides</h1>
      </header>

      <main style={{ flex: 1, padding: '20px' }}>
      
        {data.map((ride, index) => (
            <EachRide index={index} ride={ride} user={userAddress}/>
        ))}
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



