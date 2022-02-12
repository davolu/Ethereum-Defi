import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';
import {contractABI, contractAddress} from '../utils/constants';

export const EtherTransactionContext = React.createContext();

const {ethereum} = window;

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const etherTransactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  
    return etherTransactionsContract;
  };


  export const EtherTransactionsProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setformData] = useState({ recieverAddress: "", amount: "",message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [numberOfTransactions, setNumberOfTransactions] = useState(localStorage.getItem("numberOfTransactions"));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
      };
    
    useEffect(() => {
        checkForWallets();
      }, []);

    const connectWalletAccount = async () => {
     
        try {
          if (!ethereum) return alert("Please install MetaMask.");
          const accounts = await ethereum.request({ method: "eth_requestAccounts", });
          setCurrentAccount(accounts[0]);
        } catch (error) {
          console.log(error);
          throw new Error("No ethereum found");
        }
      };

    const checkForWallets = async () => {
        try {
          if (!ethereum) return alert("Oops. Install MetaMask Wallet to use this App seamlessy.");
          const accounts = await ethereum.request({ method: "eth_accounts" });
          if (accounts.length) {
            setCurrentAccount(accounts[0]);
            getTransactionHistory();
          } else {
            console.log("No accounts found");
          }
        } catch (error) {
          console.log(error);
        }
      };
      
      const getTransactionHistory = async () => {
        try {
          if (ethereum) {
            const etheriumTransactionsContract = createEthereumContract();
    
            const TransactionsList = await etheriumTransactionsContract.getTransactionsHistory();
    
            const structuredTransactions = TransactionsList.map((transaction) => ({
              addressTo: transaction.receiver,
              addressFrom: transaction.sender,
              timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
              message: transaction.message,
              amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }));
        
            setTransactions(structuredTransactions);
          } else {
            console.log("Ethereum is not found");
          }
        } catch (error) {
          console.log(error);
        }
      };
      
      const sendEtherium = async () => {
        setIsLoading(true);
        setErrorMessage("");
        try {
          if (ethereum) {
            const { recieverAddress, amount, message } = formData;
            const etheriumTransactionsContract = createEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
    
            await ethereum.request({
              method: "eth_sendTransaction",
              params: [{
                from: currentAccount,
                to: recieverAddress,
                gas: "0x5208",
                value: parsedAmount._hex,
              }],
            });
    
            const transactionHash = await etheriumTransactionsContract.addToBlockchain(recieverAddress, parsedAmount, message);
    
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            setIsLoading(false);
    
            const transactionsCount = await etheriumTransactionsContract.getNumberOfTransactions();
    
            setNumberOfTransactions(transactionsCount.toNumber());
          } else {
           // console.log("No ethereum obj found");
            setIsLoading(false);
            setErrorMessage("No ethereum obj found");
          }
        } catch (error) {
         // console.log(error);
      
          setIsLoading(false);
          setErrorMessage(error.message);

          throw new Error("No ethereum obj found");
         }
      };

    return (
        <EtherTransactionContext.Provider 
        value={{
            connectWalletAccount,
            currentAccount,
            formData,
            handleChange,
            sendEtherium,
            isLoading,
            errorMessage,
            transactions
            }}>
          {children}
        </EtherTransactionContext.Provider>
      );
    };