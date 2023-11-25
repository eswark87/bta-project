// CollectTokens.jsx
import React, { useState } from 'react';
import { ethers } from 'ethers';
import Carpool from '../contracts/Carpool.json';
const { ethereum } = window;

const CollectTokens = () => {

    const [error, setError] = useState('');

    const contractAddress = '0x56285503CB1eb1e8D471d659528325C55bdAec27';
    const contractABI = Carpool.abi;

  // Function to handle the collect tokens action
  const handleCollectTokens = async() => {
    
    try {
        setError('');
        await ethereum.request({ method: 'eth_requestAccounts' });

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const transaction = await contract.addTokens();
        const receipt = await transaction.wait();
        console.log('Transaction receipt:', receipt);

        alert("Payment Completed.")
        
    }catch(error){
        console.log(error);
    }
  };

  return (
    <div style={styles.collectTokensContainer}>
      <h2 style={styles.heading}>Collect Tokens</h2>
      <p style={styles.paragraph}>
        Thank you for using our carpooling app! You have earned tokens through our special features
        and pooling credits. Collect your rewards now!
      </p>
      <div style={styles.specialFeatures}>
        <h3 style={styles.subHeading}>Special Features</h3>
        <ul style={styles.list}>
          <li style={styles.listItem}>Feature 1: Lorem ipsum dolor sit amet.</li>
          <li style={styles.listItem}>Feature 2: Consectetur adipiscing elit.</li>
          <li style={styles.listItem}>Feature 3: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
        </ul>
      </div>
      <div style={styles.poolingCredits}>
        <h3 style={styles.subHeading}>Pooling Credits</h3>
        <p style={styles.paragraph}>
          You've earned credits by participating in our carpooling community. These credits can be
          redeemed for various rewards and benefits.
        </p>
      </div>
      <button style={styles.collectButton} onClick={handleCollectTokens}>
        Collect Tokens
      </button>
    </div>
  );
};

const styles = {
  collectTokensContainer: {
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
  specialFeatures: {
    marginTop: '20px',
  },
  subHeading: {
    color: '#333',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    marginBottom: '8px',
  },
  poolingCredits: {
    marginTop: '20px',
  },
  collectButton: {
    display: 'block',
    margin: '20px auto',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default CollectTokens;
