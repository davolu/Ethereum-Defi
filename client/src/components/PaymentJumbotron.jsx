import React, {useContext} from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import {EtherTransactionContext} from "../context/EtherTransactionContext";
import Loader from "./Loader";
import { etherAddressShortener } from "../utils/etherAddressShortener";

const PaymentJumbotron = () =>{
  
  const {connectWalletAccount,currentAccount,formData,handleChange,sendEtherium,isLoading,errorMessage} = useContext(EtherTransactionContext);
 
  const handleSubmit = (e) => {
 
    const { recieverAddress, amount, message } = formData;
    e.preventDefault();
    if (!recieverAddress || !amount || !message) return;   
    sendEtherium();
   };
    return(
        <div class="grid grid-cols-2 bg-image-container w-full">

        <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">

           <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
              Send Crypto <br /> Fast, Safe and Securely.
            </h1>
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Send Etherium to across the world.
            </p>

            {!currentAccount && (
            <button
              type="button"
              onClick={connectWalletAccount}
              className="flex flex-row justify-center items-center my-5 bg-[#363166] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Your Wallet
              </p>
            </button>
            )
            }

        </div>
        </div>
        
        <div>
        {/* */}
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-5">
        
   
          
       
        <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
      
          <div className="mt-5 md:mt-0 md:col-span-2">
            
       
              <div className="shadow overflow-hidden sm:rounded-md">
            
         

                <div className="px-4 py-5 bg-white mtx-500 sm:p-6">
                    {/*Etherum card */}
                    <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
                    <div className="flex justify-between flex-col w-full h-full">
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                          <SiEthereum fontSize={21} color="#fff" />
                        </div>
                        <BsInfoCircle fontSize={17} color="#fff" />
                      </div>
                      <div>
                        <p className="text-white font-light text-sm">
                          {etherAddressShortener(currentAccount)}
                        </p>
                        <p className="text-white font-semibold text-lg mt-1">
                          Ethereum
                        </p>
                      </div>
                    </div>
                  </div>
                {/*Etherum card ends */}

                  <div className="grid grid-cols-1 gap-1">
                  
                 
                    <div className="col-span-6 sm:col-span-3">
                      <input
                        type="text"
                        name="recieverAddress"
                        id="recieverAddress"
                        onChange={(e) => handleChange(e,"recieverAddress")}
                        placeholder="Enter Reciepient Etherium Address "
                        className=" custom-input mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-purple-300 rounded-md"
                      />
                        <input
                        type="number"
                        name="amount"
                        id="amount"
                        onChange={(e) => handleChange(e,"amount")}
                        placeholder="Amount(ETH)"
                        className=" custom-input mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-purple-300 rounded-md"
                      />
                        <input
                        type="text"
                        name="message"
                        id="message"
                        onChange={(e) => handleChange(e,"message")}
                        placeholder="Enter Message"
                        className=" custom-input mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-purple-300 rounded-md"
                      />
                    </div>
                    
                   
                  {errorMessage !=="" && (
                    <p class="text-rose-500	text-sm	panel">Error: {errorMessage}</p>
                  )}
        
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  { 
                  isLoading ? 
                  <Loader/>
                  :
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Send Now
                  </button>
                  }
                  
                </div>
              </div>
            
          </div>
        </div>
      </div>

          {/* */}
       

          </div>
        {/* */}

        </div>
        
        </div>

    )
}

export default PaymentJumbotron;
