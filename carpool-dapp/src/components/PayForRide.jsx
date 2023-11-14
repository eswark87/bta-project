import React from 'react';
import { utils } from 'ethers';

const PayForRide = ({ contract, account }) => {
  const [rideIndex, setRideIndex] = React.useState(0);

  const payForRide = async () => {
    try {
      const tx = await contract.payForRide(rideIndex);
      await tx.wait();
      // Handle success
    } catch (error) {
      // Handle error
      console.error('Error paying for ride:', error);
    }
  };

  return (
    <div>
      <h2>Pay for a Ride</h2>
      <label>
        Ride Index:
        <input type="number" value={rideIndex} onChange={(e) => setRideIndex(e.target.value)} />
      </label>
      <br />
      <button onClick={payForRide}>Pay for Ride</button>
    </div>
  );
};

export default PayForRide;
