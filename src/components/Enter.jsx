import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useNetwork, useSwitchNetwork } from 'wagmi'


function Enter() {

  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()



  return (
    <Container>
      <h1>Recursive Trees</h1>
      
      {/* {!chain ? (
      <>
        
      <h5>hmm, it doesn't look like you have a wallet extension installed</h5>
      <br/>
      <h5>you wont be able to interact with any trees but feel free to take a look around!</h5>
      </>) :
       */}

      {chain && chain?.id != 5 && (
        <MessageBox>
        
        <Message>
        
      uh oh! looks like you aren't connected to Mainnet, click&nbsp;
      <SwitchNetwork onClick={()=>switchNetwork?.(5)}>here</SwitchNetwork> to switch!
      </Message>

      <Message>
      Otherwise feel free to take a look around.

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

`

