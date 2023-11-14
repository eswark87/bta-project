import React from 'react';
import { utils } from 'ethers';

const CompleteRide = ({ contract, account }) => {
  const [rideIndex, setRideIndex] = React.useState(0);

  const completeRide = async () => {
    try {
      const tx = await contract.completeRide(rideIndex);
      await tx.wait();
      // Handle success
    } catch (error) {
      // Handle error
      console.error('Error completing ride:', error);
    }
  };

  return (
    <div>
      <h2>Complete a Ride</h2>
      <label>
        Ride Index:
        <input type="number" value={rideIndex} onChange={(e) => setRideIndex(e.target.value)} />
      </label>
      <br />
      <button onClick={completeRide}>Complete Ride</button>
    </div>
  );
};

export default CompleteRide;
