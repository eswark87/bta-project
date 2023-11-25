//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./CarpoolToken.sol";

contract Carpool {
    address public tokenAddress; // Address of the ERC-20 token contract
    address public owner;

    struct Ride {
        address driver;
        uint256 availableSeats;
        uint256 tokenCost;
        uint256 registrationDeadline;
        address[] passengers;
        string destination;
        string departure;
        bool complete;
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

    CarpoolToken public myToken;

    constructor(address _tokenAddress) {
        myToken = CarpoolToken(_tokenAddress);
        owner = msg.sender;
    }

    function offerRide(string memory _departure, string memory _destination, uint256 _availableSeats, uint256 _tokenCost, uint256 _registrationDeadline) external {
        require(_availableSeats > 0, "Invalid number of seats");
        require(_tokenCost > 0, "Invalid token cost");

        Ride storage newRide = rides.push();
        newRide.driver = msg.sender;
        newRide.availableSeats = _availableSeats;
        newRide.tokenCost = _tokenCost;
        newRide.departure = _departure;
        newRide.destination = _destination;
        newRide.registrationDeadline = _registrationDeadline;
        newRide.complete = false;
        emit RideOffered(rides.length - 1, msg.sender, _availableSeats, _tokenCost, _registrationDeadline);
    }

    function registerForRide(uint256 _rideIndex) external rideExists(_rideIndex) registrationOpen(_rideIndex) {
        Ride storage ride = rides[_rideIndex];
        require(ride.availableSeats > 0, "No available seats");
        myToken.transferTokens(msg.sender, ride.driver, ride.tokenCost);
        ride.passengers.push(msg.sender);
        ride.availableSeats--;
        emit RideRegistered(_rideIndex, msg.sender);
    }

    function completeRide(uint256 _rideIndex) external rideExists(_rideIndex) {
        Ride storage ride = rides[_rideIndex];
        require(block.timestamp >= ride.registrationDeadline, "Registration deadline not reached");
        ride.complete = true;
        emit RideCompleted(_rideIndex);
    }

    struct FlattenedRide {
        address driver;
        uint256 availableSeats;
        uint256 tokenCost;
        uint256 registrationDeadline;
        address[] passengers;
        string destination;
        string departure;
        bool complete;
    }

    function getAllRides() external view returns (FlattenedRide[] memory) {
        FlattenedRide[] memory flattenedRides = new FlattenedRide[](rides.length);
        for (uint256 i = 0; i < rides.length; i++) {
            flattenedRides[i] = FlattenedRide({
                driver: rides[i].driver,
                availableSeats: rides[i].availableSeats,
                tokenCost: rides[i].tokenCost,
                registrationDeadline: rides[i].registrationDeadline,
                passengers: rides[i].passengers,
                destination: rides[i].destination,
                departure: rides[i].departure,
                complete: rides[i].complete
            });
        }
        return flattenedRides;
    }

    function getBalance(address user) public view returns (uint256) {
        return myToken.balanceOf(user);
    }

    function addTokens() public {
        myToken.mint(msg.sender, 1000);
    }
}
