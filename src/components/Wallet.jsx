import React from 'react'
import styled from 'styled-components'
import {useAccount} from "wagmi";
import {
    useConnectModal,
    useAccountModal,
    useChainModal,
  } from "@rainbow-me/rainbowkit";


function Wallet({setDisplayPage, extraData}) {
    console.log(extraData)
    
    const { address, isConnecting, isDisconnected } = useAccount();

    const { openAccountModal } = useAccountModal();

  return (
    <Container>
        <h1>wallet</h1>
        <Body>
        <h4>{address}</h4>
        <h4> fruit token balance: {extraData[4].result ? extraData[4].result.toString() : 0}</h4>
        <h4> tree  balance: {extraData[3].result ? extraData[3].result.toString() : 0}</h4>
        <h4> ids: {extraData[6].result && extraData[6].result.map(element => " " + element.toString()).toString()}</h4>
        
        

        </Body>

        
        
        <ButtonGroup>
        <button onClick={() => {setDisplayPage(1)}}> back</button> 

           {openAccountModal && (
        <button onClick={() => {openAccountModal()}} type="button">
          account
        </button>
      )}
        </ButtonGroup>
      
    </Container>
  )
}

export default Wallet


const Body = styled.div`
height: 80%;
width: 60%;
// background-color: blue;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-evenly;



`



const ButtonGroup = styled.div`
// background-color: red;
`

const Container = styled.div`
  // margin-top: 3%;
  // padding-top: 5%;
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  

  background-color: #b6b6b6;
  border: 2px solid black;
//   overflow-y: scroll;
  box-shadow: 10px 10px rgb(26, 26, 26, 0.8);
`;


const Input = styled.input`
  width: 15%;
  height: 10%;


`