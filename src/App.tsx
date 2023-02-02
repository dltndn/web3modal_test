import { Web3Button } from '@web3modal/react'
import WalletConnnect from './WalletConnect';

function App() {
  return (
    <>
      {/* Predefined button  */}
      <Web3Button icon="hide" label="지갑연결" balance="hide" />
      <br />
      <WalletConnnect/>
      <br />
      
    </>
  );
}

export default App;
