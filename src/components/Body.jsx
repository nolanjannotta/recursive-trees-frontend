import React,{useState, useEffect} from "react";

import styled from 'styled-components'

import {DataProvider} from './DataContext'


import Home from "./Home";
import Search from "./Search";
import Mint from "./Mint";
import Tree from "./Tree";
import Enter from "./Enter";
import Wallet from "./Wallet";
import NavBar from "./NavBar";
import Footer from "./Footer";
import InvalidUrl from "./InvalidUrl";

import {Routes, Route, useNavigate,useLocation} from 'react-router-dom';

import { useNetwork, useAccount, useSwitchNetwork } from 'wagmi'



function Body() {
  const { chain } = useNetwork()
  const {isConnected} = useAccount();
  const { switchNetwork } = useSwitchNetwork()
  const navigate = useNavigate();
  const location = useLocation();

  const [doNotEnter, setDoNotEnter] = useState(chain?.id != 5 && isConnected);

  if(doNotEnter && location.pathname != "/") {
    // navigate("/") 
  }


  useEffect(()=> {
    setDoNotEnter(chain?.id != 5 && isConnected);

  },[chain, isConnected, location.pathname])


  return (
    <>
    <NavBar/>


    <DataProvider>
    <Routes> 
      <Route path="/" element={<Enter doNotEnter={doNotEnter}/>}/>
      <Route path="/home" element={<Container><Home/></Container> }/>
      <Route path="/plant" element={<Container><Mint/></Container> }/>
      <Route path="/search" element={<Container><Search/></Container> }/>
      <Route path="/wallet" element={<Wallet/>}/>
      <Route path="/tree/:id" element={<Container><Tree/></Container> }/>
      <Route path="/user/tree/:id" element={<Container><Tree/></Container> }/>
      <Route path="*" element={<InvalidUrl/>}/>

    </Routes>
            
    </DataProvider>

    <Footer/>
    </>
  )
 
}

export default Body;


const Container = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  background-color: #b6b6b6;
  border: 2px solid black;
  overflow-y: scroll;
  box-shadow: 10px 10px rgb(26, 26, 26, 0.8);

  @media (max-width: 500px) {
    width: 95%;
  }

  @media (max-width: 1280px) {
    width: 95%;
            
  }
`;
