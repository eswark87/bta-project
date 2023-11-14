import React from 'react';
import { utils } from 'ethers';

const RegisterRide = ({ contract, account }) => {
  const [rideIndex, setRideIndex] = React.useState(0);

  const registerForRide = async () => {
    try {
      const tx = await contract.registerForRide(rideIndex);
      await tx.wait();
      // Handle success
    } catch (error) {
      // Handle error
      console.error('Error registering for ride:', error);
    }
  };

  return (
    <div>
      <h2>Register for a Ride</h2>
      <label>
        Ride Index:
        <input type="number" value={rideIndex} onChange={(e) => setRideIndex(e.target.value)} />
      </label>
      <br />
      <button onClick={registerForRide}>Register for Ride</button>
    </div>
  );
};

export default RegisterRide;
