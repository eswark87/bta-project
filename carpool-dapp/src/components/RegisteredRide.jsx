import React, { useState } from 'react';
import { ethers } from 'ethers';
import Carpool from '../contracts/Carpool.json';
const { ethereum } = window;

const EachRide = ({index, ride, user}) => {
    const [registrationStatus, setRegistrationStatus] = useState('');
    const [error, setError] = useState('');
    const [gasPrice, setGasPrice] = useState(0);

    if (user.toLowerCase() !== ride[0].toLowerCase()){
        return null;
    }else{
        const contractAddress = '0x56285503CB1eb1e8D471d659528325C55bdAec27';
        const contractABI = Carpool.abi;

        const fetchGasPrice = async () => {
            try {
              // Use the Ethereum provider to fetch the current gas price.
              const provider = new ethers.providers.Web3Provider(ethereum);
              const currentGasPrice = await provider.getGasPrice();
              setGasPrice(currentGasPrice.toString());
            } catch (error) {
              console.error('Error fetching gas price:', error);
            }
        };

        const clickHandler = async () => {
            try {
                setError('');
                await ethereum.request({ method: 'eth_requestAccounts' });

                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(contractAddress, contractABI, signer);
                const estimatedGasPrice = await provider.getGasPrice();
                setGasPrice(estimatedGasPrice.toString());
                const transaction = await contract.registerForRide(index, {
                    gasLimit: 600000,
                    gasPrice: estimatedGasPrice,
                });
                const receipt = await transaction.wait();
                console.log('Transaction receipt:', receipt);
                alert('Registered Successfully');
                
            }catch(error){
                console.log(error);
            }
        }

        const unixTimestamp1 = ride[3].toNumber();
        const jsDate1 = new Date(unixTimestamp1 * 1000);
        const dateString1 = jsDate1.getDate() + '-' + jsDate1.getMonth() + '-' + jsDate1.getFullYear()
        var hours1 = jsDate1.getHours()
        var min1 = jsDate1.getMinutes()
        if (min1<10){
            min1 = '0' + min1
        }
        if (hours1<10){
            hours1 = '0' + hours1
        }
        console.log("start" + hours1 + ':' + min1);
        const timeString1 = hours1+' : '+min1;

        return (
            <div>
                <div>
                    <h1>Ride - {index+1}</h1>
                    <div>
                        Owner: {ride[0]}<br />
                        Destination: {ride[5]}<br />
                        Starig Point: {ride[6]}<br />
                        Seats Available: {Number(ride[1]._hex)}<br />
                        Token cost: {Number(ride[2]._hex)}<br />
                        Deadline: {dateString1}&nbsp;{timeString1}<br />
                        Status of Completion: {!ride[7] && "Not Completed"} {ride[7] && "Completed"}
                    </div>
                </div>
                {!ride[7] && <button onClick={clickHandler}>Complete Ride</button>}
            </div>
        )
    }
}

export default EachRide