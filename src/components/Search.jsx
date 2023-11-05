import React,{useState, useEffect,useContext} from 'react'
import styled from 'styled-components'
import {DataContext} from './DataContext'
import { Link } from 'react-router-dom';
import Loading from "./Loading";

function Search() {

  

    const {extraData} = useContext(DataContext);
    if(!extraData) {
        return(
          <Loading/>
        )
      }
    const [input, setInput] = useState(0);
    const [treeExists, setTreeExists] = useState(true)
    function handleInput(event) {
        setInput(event.target.value)
    }

    useEffect(()=>{
      setTreeExists(input <= (extraData[2].result))

    },[input])



    

  return (
    <Container>
      <h1>search</h1>
      <SearchControls>      
        <p>{(extraData[2].result).toString()} / {extraData[1].result.toString()} minted</p>

        <TreeNotExist>{!treeExists && `tree #${input} hasn't been planted yet :(`}</TreeNotExist>
        
        <ButtonGroup>
        <Input type="number" onChange={handleInput}></Input>

        <Link to={`/tree/${input}`}><button disabled={!treeExists}>search</button>  </Link>
        </ButtonGroup>
        <Link to="/home"><button>back</button></Link>
        </SearchControls>
    </Container>
  )
}

export default Search

const TreeNotExist = styled.div`
  height: 20px;
  margin: 20px;



`


const SearchControls = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;



`





const ButtonGroup = styled.div`
// background-color: red;
// padding: 20px 50px 20px 50px;
`

const Container = styled.div`
    // background-color: blue;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;



`


const Input = styled.input`
  // width: 15%;
  // height: 10%;


`