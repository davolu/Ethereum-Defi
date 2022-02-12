

const  main = async () => {

  // We get the contract to deploy
  const etherTransactionsFactory = await hre.ethers.getContractFactory("EtherTransactions");
  const etherTransactionsContract = await etherTransactionsFactory.deploy();

  await etherTransactionsContract.deployed();

  console.log("etherTransactions  deployed to:", etherTransactionsContract.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
