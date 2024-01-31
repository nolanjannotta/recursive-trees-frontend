import React from 'react'
import styled from 'styled-components'
import {recursiveTrees} from "../Contracts"

function Footer() {
  return (
    <Container>

      <a target="blank" href={`https://testnets.opensea.io/assets/goerli/${recursiveTrees}`}>open sea</a>
      <a target="blank" href={`https://etherscan.io/address/${recursiveTrees}`} >etherscan</a>
      <a target="blank" href={"https://twitter.com/jannotta_nolan"} >creator</a>

    </Container>
  )
}

export default Footer



const Container = styled.div`
background-color: #b6b6b6;
// opacity: 0.8;
width: 100%;
height: 40px;
display: flex;
justify-content: space-evenly;
align-items: center;
font-size: 25px;

`