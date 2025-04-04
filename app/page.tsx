"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { ethers } from "ethers"
import FoodTraceabilityLite from "../hardhat/artifacts/contracts/ft2.sol/FoodTraceabilityLite.json"
import Image from "next/image"
import agri from "../Images/agri-chain-logo.png"
import { Leaf, Search, AlertCircle, Info, Shield, BarChart3 } from "lucide-react"

declare global {
  interface Window {
    ethereum: any
  }
}

export default function Home() {
  const [productId, setProductId] = useState("")
  const [productDetails, setProductDetails] = useState<any>(null)
  const [contract, setContract] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("home")

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
      const contractABI = FoodTraceabilityLite.abi
      const contractInstance = new ethers.Contract(contractAddress, contractABI, provider)
      setContract(contractInstance)
    } else {
      console.error("MetaMask is not installed!")
      setError("MetaMask is not installed. Please install MetaMask to use this application.")
    }
  }, [])

  const fetchProductDetails = async () => {
    if (!productId.trim()) {
      setError("Please enter a Product ID")
      return
    }

    if (contract) {
      setIsLoading(true)
      try {
        const details = await contract.getProductDetails(productId)
        setProductDetails(details)
        setError(null)
      } catch (err) {
        console.error(err)
        setError("Product not found. Please check the Product ID.")
        setProductDetails(null)
      } finally {
        setIsLoading(false)
      }
    } else {
      setError("Contract is not initialized!")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      fetchProductDetails()
    }
  }

  const sampleIds = ["P3001", "P3002", "P3003", "P3004", "P3005"]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Image
                width={48}
                height={48}
                src={agri || "/placeholder.svg"}
                alt="AgriChain Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="ml-2 text-xl font-bold text-green-700">AgriChain</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setActiveTab("home")}
                className={`px-3 py-2 text-sm font-medium ${activeTab === "home" ? "text-green-600 border-b-2 border-green-500" : "text-gray-600 hover:text-green-500"}`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab("track")}
                className={`px-3 py-2 text-sm font-medium ${activeTab === "track" ? "text-green-600 border-b-2 border-green-500" : "text-gray-600 hover:text-green-500"}`}
              >
                Track Product
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-green-500">About</button>
              <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-green-500">Contact</button>
            </div>
          </div>
        </div>
      </nav>

      {activeTab === "home" ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">Transparent Food Supply Chain</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track the journey of your food from farm to table with blockchain-verified transparency.
            </p>
            <button
              onClick={() => setActiveTab("track")}
              className="mt-8 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Track Your Product
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-t-4 border-green-500">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Blockchain Verified</h3>
              <p className="text-gray-600">
                Every step of the supply chain is recorded on the Ethereum blockchain, ensuring data integrity and
                immutability.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-t-4 border-green-500">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sustainable Sourcing</h3>
              <p className="text-gray-600">
                Track products from sustainable and ethical sources, supporting environmentally responsible farming
                practices.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-t-4 border-green-500">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Complete Traceability</h3>
              <p className="text-gray-600">
                Access detailed information about ingredients, processing methods, and the journey from farm to shelf.
              </p>
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-8 shadow-inner">
            <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Enter Product ID</h3>
                <p className="text-gray-600 text-center">Find the unique product ID on your product packaging</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Verify on Blockchain</h3>
                <p className="text-gray-600 text-center">
                  Our system retrieves verified data from the Ethereum blockchain
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">View Complete History</h3>
                <p className="text-gray-600 text-center">
                  See detailed information about ingredients, sources, and processing
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-green-800 mb-4">Track Your Product</h1>
            <p className="text-gray-600">Enter a Product ID to view its complete supply chain details.</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter Product ID (e.g., P3001)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-800"
                />
              </div>
              <button
                onClick={fetchProductDetails}
                disabled={isLoading}
                className="w-full md:w-auto whitespace-nowrap bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition font-bold disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  "Get Product Details"
                )}
              </button>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-600">Try these sample product IDs:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {sampleIds.map((id) => (
                  <button
                    key={id}
                    onClick={() => setProductId(id)}
                    className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition"
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {productDetails && (
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
              <div className="bg-green-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">Product Details</h2>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Product Name</h3>
                    <p className="text-gray-800 text-xl">{productDetails[0] || "N/A"}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Batch ID</h3>
                    <p className="text-gray-800 text-xl">{productDetails[1] || "N/A"}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                    <Info className="h-5 w-5 mr-2" />
                    Ingredient Details
                  </h3>
                  {productDetails[2] ? (
                    <div className="space-y-4">
                      {productDetails[2]
                        .split(" | ")
                        .filter((detail: string) => detail.trim() !== "")
                        .map((detail: string, index: number) => {
                          const parts = detail.split(", ")
                          return (
                            <div
                              key={index}
                              className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                            >
                              <div className="grid md:grid-cols-2 gap-2">
                                {parts.map((part: string, partIndex: number) => {
                                  const [label, value] = part.split(": ")
                                  return (
                                    <div key={partIndex} className="flex flex-col">
                                      <span className="text-sm text-gray-500">{label}</span>
                                      <span className="font-medium text-gray-900">{value}</span>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  ) : (
                    <p className="text-gray-500">No additional details available.</p>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center text-green-700">
                    <Shield className="h-5 w-5 mr-2" />
                    <span className="font-medium">Blockchain Verified</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    This information has been verified and stored on the Ethereum blockchain.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <footer className="bg-green-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About AgriChain</h3>
              <p className="text-green-100">
                AgriChain uses blockchain technology to bring transparency and traceability to the agricultural supply
                chain.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-green-100 hover:text-white transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white transition">
                    Track Product
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <p className="text-green-100 mb-2">Join our mission for a more transparent food system.</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-green-100 hover:text-white transition">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-green-100 hover:text-white transition">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-green-100 hover:text-white transition">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-green-700 text-center text-green-200 text-sm">
            <p>© {new Date().getFullYear()} AgriChain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

