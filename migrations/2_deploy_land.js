const Land = artifacts.require('Land');

module.exports = function (deployer) {
  
  const NAME = 'Fluture Buildings'
  const SYMBOOL = 'DUB'
  const COST = web3.utils.toWei('1', 'ether')

  await deployer.deploy(Land, NAME, SYMBOL, COST);
};