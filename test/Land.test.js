const Land = artifacts.require('./Land');

require('chai').use(require('chai-as-promised')).should();

const EVM_REVERT = 'VM Exception while processing transaction: revert';

contract('Land', ([owner1, owner2]) => {
  const NAME = 'Fluture Buildings';
  const SYMBOL = 'DUB';
  const COST = web3.utils.toWei('1', 'ether');

  let land, result;

  beforeEach(async () => {
    land = await Land.new(NAME, SYMBOL, COST);
  });

  describe('Deployment', () => {
    it('Returns the contract name', async () => {
      result = await land.name();
      result.should.equal(NAME);
    });

    it('Returns the symbol', async () => {
      result = await land.symbol();
      result.should.equal(SYMBOL);
    });

    it('Returns the cost to mint', async () => {
      result = await land.cost();
      result.toString().should.equal(COST);
    });

    it('Returns the max supply', async () => {
      result = await land.maxSupply();
      result.toString().should.equal('5');
    });

    it('Returns the number of buildings/land available', async () => {
      result = await land.getBuildings();
      result.length.should.equal(5);
    });
  });

  describe('Minting', () => {
    describe('Success', () => {
      beforeEach(async () => {
        result = await land.mint(1, { from: owner1, value: COST });
      });

      it('Updates the owner address', async () => {
        result = await land.ownerOf(1);
        result.should.equal(owner1);
      });

      it('Updates building details', async () => {
        result = await land.getBuilding(1);
        result.owner.should.equal(owner1);
      });
    });
  });
});
