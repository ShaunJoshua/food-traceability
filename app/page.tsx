"use client"
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import FoodTraceabilityLite from '../hardhat/artifacts/contracts/ft2.sol/FoodTraceabilityLite.json';

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function Home() {
  const [productId, setProductId] = useState('');
  const [productDetails, setProductDetails] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
      const contractABI = FoodTraceabilityLite.abi;
      const contractInstance = new ethers.Contract(contractAddress, contractABI, provider);
      setContract(contractInstance);
    } else {
      console.error("MetaMask is not installed!");
    }
  }, []);

  const fetchProductDetails = async () => {
    if (contract) {
      const details = await contract.getProductDetails(productId);
      setProductDetails(details);
    } else {
      console.error("Contract is not initialized!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Food Traceability</h1>
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Enter Product ID"
        className="border p-2 mb-4"
      />
      <button
        onClick={fetchProductDetails}
        className="bg-blue-500 text-white p-2"
      >
        Get Product Details
      </button>
      {productDetails && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Product Details</h2>
          <div className="border p-4 rounded-lg shadow-md">
            <p className="mb-2"><span className="font-semibold">Name:</span> {productDetails[0]}</p>
            <p className="mb-2"><span className="font-semibold">Batch ID:</span> {productDetails[1]}</p>
            <p className="mb-2"><span className="font-semibold">Details:</span></p>
            <div className="pl-4">
              {productDetails[2].split(' | ').map((detail: string, index: number) => (
                <p key={index} className="mb-1">{detail}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}