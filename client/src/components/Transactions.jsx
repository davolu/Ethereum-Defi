import React, { useContext } from "react";
import {EtherTransactionContext} from "../context/EtherTransactionContext";
import { etherAddressShortener } from "../utils/etherAddressShortener";

const Transactions = () =>{
const {currentAccount,transactions} = useContext(EtherTransactionContext);

    return(
        <>
    <div className="container my-12 mx-auto px-4 md:px-12">
    <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {transactions.map( (item, index)=>{
            return(
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                <div className="flex justify-center">
                <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                    <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{item.timestamp}</h5>
                    <p className="text-gray-500  text-xs text-base mb-4">
                    From: <a  className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" target="_blank" href={`https://ropsten.etherscan.io/address/${item.addressFrom}`}>{etherAddressShortener(item.addressFrom)}</a> 
                    </p>
                    <p className="text-gray-500  text-xs text-base mb-4">
                    To: <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" target="_blank"  href={`https://ropsten.etherscan.io/address/${item.addressTo}`}>{etherAddressShortener(item.addressTo)}</a>
                    </p>
                    <p className="text-gray-500  text-xs text-base mb-4">
                    Message: <span className="text-gray-500  text-xs text-base mb-4">{item.message}</span>
                    </p>
                   <p className="text-gray-500  text-xs text-base mb-4">  Sent: {item.amount} ETH    </p>
                   

                </div>
                </div> 
                </div>
            )
        }) 
        }
        </div>
        </div>
 
        </>
    )
}

export default Transactions;
