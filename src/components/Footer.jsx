import React from 'react'
import styled from 'styled-components'
import {recursiveTrees} from "../Contracts"

function Footer({address}) {
  return (
    <Container>
      <a target="blank" href={`https://testnets.opensea.io/assets/goerli/${recursiveTrees}`}>open sea</a>
      <a target="blank" href={`https://goerli.etherscan.io/address/${recursiveTrees}`} >etherscan</a>

    </Container>
  )
}

export default Footer



const Container = styled.div`
background-color: #b6b6b6;
width: 100%;
height: 3%;
display: flex;
justify-content: space-evenly;
align-items: center;



`