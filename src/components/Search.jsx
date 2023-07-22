import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
// import { useGetTree } from '../hooks/useGetTree'

function Search({extraData, userTrees, setDisplayPage, setTreeId}) {
    const [input, setInput] = useState(0);
    const [treeExists, setTreeExists] = useState(true)
    console.log(extraData);
    function handleInput(event) {
        setInput(event.target.value)
    }

    useEffect(()=>{
      setTreeExists(input <= (extraData[2].result - 1n))

    },[input])


  return (
    <Container>
      <h1>search</h1>
      <SearchControls>      
        <p>{(extraData[2].result).toString()} / {extraData[1].result.toString()} minted</p>
        {/* <p>{userTrees.length > 0 ? "you own trees " + userTrees.toString() : !userTrees ? "" : "you own zero trees"}</p> */}
        {/* <p>{"you own " + extraData[3].result + " trees"}</p> */}
        
        <TreeNotExist>{!treeExists && `tree #${input} hasn't been planted yet :(`}</TreeNotExist>
        
        <ButtonGroup>
        <Input type="number" onChange={handleInput}></Input>
        <button disabled={!treeExists} onClick={() => {setDisplayPage(4); setTreeId(input)}}>search</button>  
        </ButtonGroup>
        <button onClick={() => {setDisplayPage(1)}}>back</button>
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