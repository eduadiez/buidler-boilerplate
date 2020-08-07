module.exports = async ({getNamedAccounts, deployments, getChainId}) => {
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  console.log(deployer);
  // the following will only deploy "Token" if the contract was never deployed or if the code changed since last deployment
  await deploy("Token", {
    from: "0xb4124cEB3451635DAcedd11767f004d8a28c6eE7",
    gas: 4000000,
    args: [],
  });
};
