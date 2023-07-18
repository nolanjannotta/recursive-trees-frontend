import React, {useState} from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import {useGetTree} from '../hooks/useTokenUri'
import styled from 'styled-components';
import { useAccount,useBalance, useEnsName  } from 'wagmi'



function NavBar() {
    const { address, isConnecting, isDisconnected } = useAccount()

    const { data, isError, isLoading } = useEnsName({
      address: address,
    }) 

    
    
  return (
    <Container>
      <Account>
        {address ? 
        <p>
          greetings {data ? data : address.substring(0,6) + "..." + address.substring(37,42)}
        </p>
         : 
         <p>
          welcome, please connect your wallet
         </p>


        }
        {/* <p>balance: {!isLoading && !isError && data && data.formatted.substring(0,5) || 0} ether</p> */}
      </Account>

      
    </Container>
    
  )
}

export default NavBar

const Container = styled.div`
background-color: #b6b6b6;
// opacity: 0.8;
width: 100%;
height: min-content;
display: flex;
justify-content: end;

`

const Account = styled.div`
// background-color: orange;
// width: 20%;
// height: 100%;
margin-right: 20px;
// text-align: center;


`

