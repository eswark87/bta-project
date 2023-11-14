// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Carpool {
    address public tokenAddress; // Address of the ERC-20 token contract
    address public owner;

    struct Ride {
        address driver;
        uint256 availableSeats;
        uint256 tokenCost;
        uint256 registrationDeadline;
        address[] passengers;
        mapping(address => bool) payments;
    }

    Ride[] public rides;

    event RideOffered(uint256 rideIndex, address driver, uint256 availableSeats, uint256 tokenCost, uint256 registrationDeadline);
    event RideRegistered(uint256 rideIndex, address passenger);
    event RideCompleted(uint256 rideIndex);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier rideExists(uint256 _rideIndex) {
        require(_rideIndex < rides.length, "Ride does not exist");
        _;
    }

    modifier registrationOpen(uint256 _rideIndex) {
        require(block.timestamp < rides[_rideIndex].registrationDeadline, "Registration is closed");
        _;
    }

    modifier notRegistered(uint256 _rideIndex) {
        require(!rides[_rideIndex].payments[msg.sender], "Already registered for this ride");
        _;
    }

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
        owner = msg.sender;
    }

    function offerRide(uint256 _availableSeats, uint256 _tokenCost, uint256 _registrationDeadline) external {
        require(_availableSeats > 0, "Invalid number of seats");
        require(_tokenCost > 0, "Invalid token cost");

        Ride storage newRide = rides.push();
        newRide.driver = msg.sender;
        newRide.availableSeats = _availableSeats;
        newRide.tokenCost = _tokenCost;
        newRide.registrationDeadline = _registrationDeadline;

        emit RideOffered(rides.length - 1, msg.sender, _availableSeats, _tokenCost, _registrationDeadline);
    }

    function registerForRide(uint256 _rideIndex) external rideExists(_rideIndex) registrationOpen(_rideIndex) notRegistered(_rideIndex) {
        Ride storage ride = rides[_rideIndex];
        require(ride.availableSeats > 0, "No available seats");

        // Transfer tokens to the contract as registration
        require(IERC20(tokenAddress).transferFrom(msg.sender, address(this), ride.tokenCost), "Token transfer failed");

        // Update ride information
        ride.passengers.push(msg.sender);
        ride.availableSeats--;

        emit RideRegistered(_rideIndex, msg.sender);
    }

    function completeRide(uint256 _rideIndex) external rideExists(_rideIndex) onlyOwner {
        Ride storage ride = rides[_rideIndex];
        require(block.timestamp >= ride.registrationDeadline, "Registration deadline not reached");

        // Ensure all registered passengers have paid
        require(ride.availableSeats == 0, "Ride is not fully booked");
        for (uint256 i = 0; i < ride.passengers.length; i++) {
            require(ride.payments[ride.passengers[i]], "Not all passengers have paid");
        }

        // Perform any additional logic for completing the ride

        emit RideCompleted(_rideIndex);
    }

    function payForRide(uint256 _rideIndex) external rideExists(_rideIndex) {
        Ride storage ride = rides[_rideIndex];
        require(!ride.payments[msg.sender], "Already paid for this ride");

        // Transfer tokens to the driver as payment
        require(IERC20(tokenAddress).transfer(ride.driver, ride.tokenCost), "Token transfer failed");

        // Update payment status
        ride.payments[msg.sender] = true;
    }
}