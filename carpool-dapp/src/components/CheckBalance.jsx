// CheckBalance.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import Carpool from '../contracts/Carpool.json';

const CheckBalance = () => {
  const [accountBalance, setAccountBalance] = useState(0); // Placeholder balance
  const [error, setError] = useState('');

  const location = useLocation();
  const formData = location.state ? location.state.formData : null;
  const [userAddress, setUserAddress] = useState('');

  const contractAddress = '0x56285503CB1eb1e8D471d659528325C55bdAec27';
  const contractABI = Carpool.abi;
  const [rideIndex, setRideIndex] = React.useState(0);

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
          const result = await contract.getBalance(userAddress);
          console.log('Result', result);
          setAccountBalance(result);
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

  const styles = {
    checkBalanceContainer: {
      maxWidth: '600px',
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      textAlign: 'center',
    },
    heading: {
      color: '#333',
    },
    paragraph: {
      color: '#666',
    },
    balanceDisplay: {
      marginTop: '20px',
    },
    balanceText: {
      color: '#333',
    },
  };

  return (
    <div style={styles.checkBalanceContainer}>
      <h2 style={styles.heading}>Your Account Balance</h2>
      <p style={styles.paragraph}>
        Welcome to the Carpool Way! Your account balance is an essential part of your carpooling
        journey. Here, you can check your current balance and manage your transactions.
      </p>
      <div style={styles.balanceDisplay}>
        <h3 style={styles.balanceText}>Balance: {Number(accountBalance._hex)} Tokens</h3>
      </div>
    </div>
  );
};

export default CheckBalance;

