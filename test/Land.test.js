const Land = artifacts.require('./Land');

require('chai').use(require('chai-as-promised')).should();

contract('Land', ([owner1, owner2]) => {
  const NAME = 'Fluture Buildings';
  const SYMBOOL = 'DUB';
  const COST = web3.utils.toWei('1', 'ether');

  let land, result;

  beforeEach(async () => {
    land = await Land.new(NAME, SYMBOL, COST);
  });

  describe('Deployment', () => {
    it('returns the contract name', async () => {
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
      result = await land.mint(1, {from: owner1, value: COST})
       
      it('Updates the owner address', async () => {
        result = await land.ownerOf(1)
        result.should.equal(owner)
      })
  
      it('Updates building details', async () => {
        result = await land.getBuilding(1)
        result.owner1.should.equal(owner1)
      })
    })

  
  })
});
