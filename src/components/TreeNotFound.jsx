import React from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components";

function TreeNotFound() {
  return (
    <Container>
    
    <h1>tree not found</h1>
    <Link to="/search"><button>back</button></Link>
    </Container>
)
  
}

export default TreeNotFound

const Container = styled.div`
// background-color: orange;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;


`