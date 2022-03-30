import { useEffect, useState } from 'react';
import Web3 from 'web3';
import Land from './abis/Land.json';

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [landContract, setLandContract] = useState(null);
  const [cost, setCost] = useState(null);
  const [buidings, setBuildings] = useState(null);

  useEffect(() => {
    loadBlockchainData();
  }, [account]);

  const loadBlockchainData = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);

      const accounts = await web3.eth.getAccounts();

      if (account.length > 0) {
        setAccount(accounts[0]);
      }

      const networkId = await web3.eth.net.getId();

      const land = new web3.eth.Contract(
        Land.abi,
        Land.networks[network.Id].address
      );
      setLandContract(land);

      const cost = await land.methods.cost().call();
      setCost(web3.utils.fromWei(cost.toString(), 'ether'));

      const buildings = await land.methods.getBuildings().call();
      setBuildings(buildings);
      // accountChanged listener listens for changes to the account
      window.ethereum.on('accountsChanged', function (accounts) {
        setAccount(accounts[0]);
      });

      window.ethereum.on('chainChanged', (chainId) => {
        window.locatoin.reload();
      });
    }
  };
  return <div>Virtual Land</div>;
}

export default App;
