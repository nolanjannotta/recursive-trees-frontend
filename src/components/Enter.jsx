import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useNetwork, useSwitchNetwork, useDisconnect } from 'wagmi'
import {useAccountModal} from "@rainbow-me/rainbowkit";



function Enter({doNotEnter}) {

  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  // const { disconnect } = useDisconnect()



  return (
    <Container>
      <h1>Recursive Trees</h1>


      {chain && chain?.id != 5 && (
        <MessageBox>
        
        <Message>
        
      uh oh! looks like you aren't connected to the correct network, click <SwitchNetwork onClick={()=>switchNetwork?.(5)}>here</SwitchNetwork> to switch!
      <br/>
      but feel free to take a look around.
      </Message>

      </MessageBox>
      )}

        <Link to="/home"><button>enter</button></Link>
    </Container>
  )
}

export default Enter


const SwitchNetwork = styled.span`
cursor: pointer;
text-decoration: underline;


`

const MessageBox = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;

`


const Message = styled.h3`
margin: 0;
padding: 0;
text-align: center;

`



const Container = styled.div`
width: 40%;
min-height: 30%;
display:flex;
justify-content: space-around;
flex-direction: column;
align-items: center;
background-color: rgba(182, 182, 182, 0.6);
border: 2px solid black;
overflow-y: auto;
box-shadow: 10px 10px rgb(26, 26, 26, 0.8);

@media (max-width: 500px) {
  width: 90%;
  font-size: .9rem
}

`

