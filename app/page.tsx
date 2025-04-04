"use client"
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import FoodTraceabilityLite from '../hardhat/artifacts/contracts/ft2.sol/FoodTraceabilityLite.json';
import Image from 'next/image'
import agri from '../Images/agri-chain-logo.png'
declare global {
  interface Window {
    ethereum: any;
  }
}

export default function Home() {
  const [productId, setProductId] = useState('');
  const [productDetails, setProductDetails] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
      const contractABI = FoodTraceabilityLite.abi;
      const contractInstance = new ethers.Contract(contractAddress, contractABI, provider);
      setContract(contractInstance);
    } else {
      console.error("MetaMask is not installed!");
      setError("MetaMask is not installed. Please install MetaMask to use this application.");
    }
  }, []);

  const fetchProductDetails = async () => {
    if (contract) {
      try {
        const details = await contract.getProductDetails(productId);
        setProductDetails(details);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Product not found. Please check the Product ID.");
        setProductDetails(null);
      }
    } else {
      setError("Contract is not initialized!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <div className="flex justify-center mb-6">
          <Image
            width={192}
            height={192}
            src={agri}
            alt="Agri Chain Logo"
            className="w-48 h-48 object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold text-center mb-6 text-green-600"></h1>
        <p className="text-gray-600 text-center mb-8">
          Enter a Product ID to view its details.
        </p>
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Enter Product ID"
            className="w-full max-w-md border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-800 mb-4"
          />
          <button
            onClick={fetchProductDetails}
            className="w-full max-w-md bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition font-bold"
          >
            Get Product Details
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}
        {productDetails && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Product Details</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="mb-4">
                <span className="font-semibold text-green-700">Name:</span>
                <span className="ml-2 text-gray-900">{productDetails[0] || 'N/A'}</span>
              </div>
              <div className="mb-4">
                <span className="font-semibold text-green-700">Batch ID:</span>
                <span className="ml-2 text-gray-900">{productDetails[1] || 'N/A'}</span>
              </div>
              <div>
                <span className="font-semibold text-green-700">Details:</span>
                {productDetails[2] ? (
                  <ul className="list-disc list-inside pl-4 mt-2 text-gray-900">
                    {productDetails[2]
                      .split(' | ')
                      .filter((detail: string) => detail.trim() !== '')
                      .map((detail: string, index: number) => (
                        <li key={index} className="mb-1">{detail}</li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 mt-2">No additional details available.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}