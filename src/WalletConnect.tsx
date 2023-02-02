import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { Web3Modal, useWeb3ModalTheme } from '@web3modal/react'
import { useEffect, useState } from 'react'
import { configureChains, createClient, WagmiConfig, useAccount, useConnect } from "wagmi";
import { goerli, polygonMumbai } from 'wagmi/chains'
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

if (!process.env.REACT_APP_PROJECT_ID) {
  throw new Error('You need to provide REACT_APP_PROJECT_ID env variable')
}
const projectId = process.env.REACT_APP_PROJECT_ID

// 2. Configure wagmi client
const chains = [goerli, polygonMumbai]

const { provider } = configureChains(chains, [walletConnectProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ version: '1', appName: 'Quicker', chains, projectId }),
  provider
})

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains)

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoennt
export default function WalletConnnect() {
  const [ready, setReady] = useState(false)
  const { address, isConnected } = useAccount();
  const { setTheme } = useWeb3ModalTheme();
  setTheme({ themeMode: "light" });
  setTheme({ themeBackground: "gradient" });

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <>
      {ready ? (
        <WagmiConfig client={wagmiClient}>
        </WagmiConfig>
      ) : null}

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      <h4>연결여부: {isConnected ? "연결됨" : "연결안됨"}</h4>
      <h3>지갑주소: {address}</h3>
    </>
  )
}