import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import Carpool from '../contracts/Carpool.json';
import RegisteredRide from './RegisteredRide';


const CompleteRide = ({ contract, account }) => {

  const location = useLocation();
  const formData = location.state ? location.state.formData : null;
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
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
    <div>
      {data.map((ride, index) => (
          <RegisteredRide index={index} ride={ride} user={userAddress}/>
      ))}
    </div>
  );
};

export default CompleteRide;
