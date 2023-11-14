import React, { useState } from 'react';
import { utils } from 'ethers';

const OfferRide = ({ contract, account }) => {
  const [availableSeats, setAvailableSeats] = useState(0);
  const [tokenCost, setTokenCost] = useState(0);
  const [registrationDeadline, setRegistrationDeadline] = useState(0);

  const offerRide = async (e) => {
    e.preventDefault();

    try {
      const tx = await contract.offerRide(
        utils.parseUnits(availableSeats.toString()),
        utils.parseUnits(tokenCost.toString()),
        registrationDeadline
      );

      await tx.wait();
      // Handle success
    } catch (error) {
      // Handle error
      console.error('Error offering ride:', error);
    }
  };

  return (
    <div>
      <h2>Offer a Ride</h2>
      <form onSubmit={offerRide}>
        <label>
          Available Seats:
          <input type="number" value={availableSeats} onChange={(e) => setAvailableSeats(e.target.value)} />
        </label>
        <br />
        <label>
          Token Cost:
          <input type="number" value={tokenCost} onChange={(e) => setTokenCost(e.target.value)} />
        </label>
        <br />
        <label>
          Registration Deadline:
          <input type="datetime-local" value={registrationDeadline} onChange={(e) => setRegistrationDeadline(e.target.value)} />
        </label>
        <br />
        <button type="submit">Offer Ride</button>
      </form>
    </div>
  );
};

export default OfferRide;
