import React from 'react'
import styled from 'styled-components'

function Footer() {
  return (
    <Container>
      <a target="blank" href="https://testnets.opensea.io/collection/recursive-trees-63">open sea</a>
      <a target="blank" href="https://goerli.etherscan.io/address/0xe11150b535926ddd6fa6c16047008c15ce149238" >etherscan</a>

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