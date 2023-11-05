import React from 'react'
import styled from 'styled-components'
import { formatEther } from 'viem'

function Stats({treeId, treeData, isOwner}) {
    const colorRarities = ["ultra rare","very rare", "rare", "semi rare","common"]

  return (
    <StatsContainer>
                <StatList>
                    <StatBox><h5>id: {treeId}</h5></StatBox>
                    <StatBox><h5>owner: {isOwner ? "you :)" :  treeData[2].result.substring(0,6) + "..." + treeData[2].result.substring(37,42)}</h5></StatBox>
                    <StatBox><h5>color: {colorRarities[Number(treeData[1].result.colorId)-1]}</h5></StatBox>
                    <StatBox><h5>planted on: {new Date(Number(treeData[1].result.plantedAt) * 1000).toLocaleDateString('en-us')}</h5></StatBox>
                    <StatBox><h5>age: {(Number(treeData[1].result.age) / 86400).toFixed(3)} days</h5></StatBox>
                    <StatBox><h5>next harvest: {Math.floor(Number(treeData[1].result.nextHarvest) - Date.now()/1000) > 0 ? Math.floor(Number(treeData[1].result.nextHarvest) - Date.now()/1000) : 0 }s</h5> <h5><small>&#160;&#160;&#160;&#160;&#160;({new Date(Number(treeData[1].result.nextHarvest) * 1000).toLocaleDateString('en-us')}) </small></h5></StatBox>

                </StatList>
                <StatList>
                    <StatBox><h5> percent grown: {Number(treeData[1].result.percentGrown) / 100}</h5></StatBox>
                    <StatBox><h5> render method: { treeData[1].result.renderMethod ? "off chain" : "on chain"}</h5></StatBox>
                    <StatBox><h5>current fruit total: { Number(treeData[3].result)}</h5></StatBox>
                    <StatBox><h5>total harvested: {Number(treeData[1].result.totalHarvested)}</h5></StatBox>
                    <StatBox><h5>eth received: {formatEther(treeData[1].result.ethReceived)}</h5></StatBox>
                    <StatBox><h5>clouds: {treeData[1].result.clouds ? "yes" : "no"} </h5></StatBox>
                </StatList>
                

          </StatsContainer>
  )
}

export default Stats


const NextHarvest = styled.p`
position: relative:
right: 0;
margin: 0;
padding: 0;
flex: none;



`


const StatBox = styled.div`
border: 1px solid black;
border-radius: 8px;
width: 100%;
height: 15%;
display: flex;
justify-content: center;
align-items: center;
// flex-grow: 4;

`



const StatList = styled.div`
// background-color: yellow;
width: 49%;
height: 100%;
display:flex;
flex-direction: column;
justify-content: space-between;
align-items: center;

`


   
const StatsContainer = styled.div`
    // background-color: purple;
    width: 100%;
    height: 50%;  
    display:flex;
    justify-content: space-between;
    align-items: space-between;
    // flex-direction: column;

`
