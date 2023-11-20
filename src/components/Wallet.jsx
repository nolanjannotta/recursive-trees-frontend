import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import {useAccount} from "wagmi";
import {formatEther} from "viem"
import {useAccountModal} from "@rainbow-me/rainbowkit";
import {DataContext} from './DataContext'
import {Link} from "react-router-dom";
import { useUserTrees } from '../hooks/useUserTrees';
import Loading from "./Loading";

function Wallet() {
    
    const { address } = useAccount();
    const {extraData} = useContext(DataContext);

    const { openAccountModal } = useAccountModal();
    console.log(extraData)
    const ids = useUserTrees(extraData)

    if(!extraData ) {
      return(<Container><Loading/></Container>)
    }

  return (
    <Container>
        <h1>wallet</h1>
        <Body>
        <h4>{address}</h4>

          <h4> fruit token balance: {formatEther(extraData[4].result)} </h4>
          
        <h4> fruit total supply: {formatEther(extraData[9].result)}</h4>

        <h4> tree  balance: {extraData[3].result ? extraData[3].result.toString() : 0}</h4>

        <h4>your trees:</h4>
        <TokenList>
          
          {ids.map((element) => {return <Id><Link style={{color: "inherit"}} to={`/user/tree/${element}`}>{element.toString()}</Link></Id>})}
        </TokenList>
        

        </Body>

        
        
        <div>
        <Link to="/home"><button> back</button> </Link>

           {openAccountModal && (
        <button onClick={() => {openAccountModal()}} type="button">
          account
        </button>
      )}
        </div>
      
    </Container>
  )
}

export default Wallet


const Id = styled.li`
margin-right: 8px;
font-size: 20px;





`

const TokenList = styled.ul`
max-width: 80%;
height: 50px;
list-style: none;
// background-color: blue;
display:inline;
display:flex;
overflow-x: hidden;
overflow-y: hidden;
&:hover {
  overflow-x: scroll;
}
`

const Body = styled.div`
height: 80%;
width: 60%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-evenly;
`


const Container = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #b6b6b6;
  border: 2px solid black;
  box-shadow: 10px 10px rgb(26, 26, 26, 0.8);
`;

