import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import {useAccount} from "wagmi";
import {formatEther} from "viem"
import {useAccountModal} from "@rainbow-me/rainbowkit";
import {DataContext} from './DataContext'
import {Link} from "react-router-dom";

function Wallet() {
    
    const { address, isConnecting, isDisconnected } = useAccount();
    const {extraData, refetch} = useContext(DataContext);

    const { openAccountModal } = useAccountModal();
    const [ids, setIds] = useState({
      ids: [],
      overFlow:0
    });

    useEffect(()=>{
      if(extraData && extraData[6].result) {

        setIds({
          ids: extraData[6].result.length > 20 ? extraData[6].result.slice(0,20) : extraData[6].result,
          overFlow: extraData[6].result.length > 20 ? extraData[6].result.length - 20 : 0
        })

        
      }
      
    },[extraData[6]])



    useEffect(()=>{
      console.log(ids)
    },[ids])

  return (
    <Container>
        <h1>wallet</h1>
        <Body>
        <h4>{address}</h4>

          <h4> fruit token balance: {formatEther(extraData[4].result)} </h4>
          
        <h4> fruit total supply: {formatEther(extraData[9].result)}</h4>

        <h4> tree  balance: {extraData[3].result ? extraData[3].result.toString() : 0}</h4>

        {<h4> ids: {ids.ids.map(element => " " + element.toString()).toString()} { ids.overFlow > 0 && ("+" + ids.overFlow + "more") }</h4>}
        
        
        

        </Body>

        
        
        <ButtonGroup>
        <Link to="/home"><button> back</button> </Link>

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


const FruitToken = styled.div`
  display: flex;
  width: 80%;
  align-items: flex-end;
  justify-content: center;

`


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
  box-shadow: 10px 10px rgb(26, 26, 26, 0.8);
`;


const Input = styled.input`
  width: 15%;
  height: 10%;


`