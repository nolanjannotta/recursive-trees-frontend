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



    function handleKeyPress(target) {
      console.log(target)
      if(target.charCode==13){
        // navigate(`/tree/${input}`);
        
      }
    }

    

  return (
    <Container>
      <h1>search</h1>
      <SearchControls>      
        <p>{(extraData[2].result).toString()} / 7,000 minted</p>

        <TreeNotExist>{!treeExists && `tree #${input} hasn't been planted yet :(`}</TreeNotExist>
        
        <SearchBox>
        <Input type="number" onChange={handleInput}></Input>

        <Link to={`/tree/${input}`}><Button disabled={!treeExists}>search</Button> </Link>
        </SearchBox>
        <Link to="/home"><Button>back</Button></Link>
        </SearchControls>
    </Container>
  )
}

export default Search

const Button = styled.button`
@media (max-width: 500px) {
  padding: .5rem 1rem .5rem  1rem; 
  font-size: .5rem;
}

`

const SearchBox = styled.div`
display: flex;
justify-content: center;

`

const Input = styled.input`

  @media (max-width: 500px) {
    width: 15%;
    padding: .5rem 1rem .5rem  1rem; 
  font-size: .5rem;
  }


`

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

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;

`
