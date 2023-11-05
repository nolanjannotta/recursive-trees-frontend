import React,{useContext} from 'react'
import styled from 'styled-components'
// import { DataContext } from './Body';
import { Link } from 'react-router-dom'

function Enter() {

  // const data = useContext(DataContext);
  // console.log(data)

  return (
    <Container>
      <h1>Recursive Trees</h1>
        <Link to="/home">
        <button>enter</button>
        </Link>
    </Container>
  )
}

export default Enter





const Container = styled.div`
// margin-top: 3%;
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