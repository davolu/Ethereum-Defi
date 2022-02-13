// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

pragma experimental ABIEncoderV2;

contract EtherTransactions {
    uint numberOfTransactions;
 

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp);

    struct EtherTransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
    }

    EtherTransferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message) public {
        numberOfTransactions +=1;
        transactions.push(EtherTransferStruct(msg.sender, receiver, amount, message, block.timestamp));

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp);

    }

    function getTransactionsHistory() public view returns ( EtherTransferStruct[] memory){
        //returns all the transactions history
        return transactions;

    }

    function getNumberOfTransactions() public view returns(uint256){
        //returns the number of transactions
        return numberOfTransactions;
    }
  
 

}

