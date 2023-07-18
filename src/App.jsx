import './polyfills.js';
import { useState } from 'react'
import '@rainbow-me/rainbowkit/styles.css';
import {getDefaultWallets,RainbowKitProvider} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import './App.css'
import './components/NavBar.jsx'
import NavBar from './components/NavBar.jsx';
import Body from './components/Body.jsx';
import Footer from './components/Footer.jsx';
import styled from 'styled-components'; 
import treeCollage2 from './assets/treeCollage2.png';




function App() {
  const [count, setCount] = useState(0)


  const { chains, publicClient } = configureChains(
    [goerli, mainnet, polygon, optimism, arbitrum],
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
          <NavBar/>
          <Body/>
          <Footer/>
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