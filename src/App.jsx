import './polyfills.js';
import '@rainbow-me/rainbowkit/styles.css';
import {getDefaultWallets,RainbowKitProvider} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, goerli, foundry } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Body from './components/Body.jsx';
import styled from 'styled-components'; 
import treeCollage2 from './assets/treeCollage2.png';




function App() {

  const { chains, publicClient } = configureChains(
    [goerli],
    [
      alchemyProvider({ apiKey: "RMv47zcgxW5yjSyfRQjPHCru9rJyNiuK" }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'Recursive Trees',
    projectId: 'e1bee9ecffe40a40a7c225a8d39c52e0',
    chains
  });
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })


  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Background>
          <Body/>
        </Background>
      </RainbowKitProvider>
    </WagmiConfig>
    
  )
}

export default App


const Background = styled.div`
  position: absolute;
  background-image: url(${treeCollage2});
  
  width: 100%;
  height: 100%;
  display:flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  // overflowY: auto;


`