const { expect } = require("chai");
const { ethers } = require("hardhat");
  
 
describe("EtherTransactions", function () {
  
 
  let etherTransactions;
 
  let EtherTransactions;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async () => {
   
    EtherTransactions = await ethers.getContractFactory("EtherTransactions");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    etherTransactions = await EtherTransactions.deploy();
    await etherTransactions.deployed();
   });

  describe("Transactions", () => {

     
        it("Should transfer tokens to accounts", async function () {
          // Transfer 50 tokens from owner to addr1
         await etherTransactions.addToBlockchain(addr1.address,50,"Send etherium"); 
        });

        it("Should return Transaction History", async function () {
          //
         await etherTransactions.getTransactionsHistory(); 
         expect(etherTransactions).be.not.empty;
        });
        
        it("Should return transaction history count", async function () {
          //
         await etherTransactions.getNumberOfTransactions(); 
         expect(etherTransactions).be.not.empty;

        });

  });


//more ...
});

 