import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { formatEther } from 'viem'
import { UseTreeTimeDisplays } from '../hooks/UseTreeTimeDisplays'

function Stats({treeId, treeData, isOwner}) {
    const colorRarities = ["ultra rare","very rare", "rare", "semi rare","common"]

    const timeDisplay = UseTreeTimeDisplays(Number(treeData[1].result.nextHarvest), Number(treeData[1].result.percentGrown))

    if(treeData[0].error || treeData[1].error || treeData[2].error || treeData[3].error) {
        return
    }

  return (
    <StatsContainer>
                <StatList>
                    <StatBox><h5>id: {treeId}</h5></StatBox>
                    <StatBox><h5>owner: {isOwner ? "you :)" :  treeData[2].result.substring(0,6) + "..." + treeData[2].result.substring(37,42)}</h5></StatBox>
                    <StatBox><h5>color: {colorRarities[Number(treeData[1].result.colorId)-1]}</h5></StatBox>
                    <StatBox><h5>planted on: {new Date(Number(treeData[1].result.plantedAt) * 1000).toLocaleDateString('en-us')}</h5></StatBox>
                    <StatBox><h5>age: {(Number(treeData[1].result.age) / 86400).toFixed(3)} days</h5></StatBox>

                    {timeDisplay.isGrown ?  
                    <StatBox><h5>next harvest in {timeDisplay.time > 0 ? timeDisplay.time : 0 } {timeDisplay.unit}</h5> <h5><small>{timeDisplay.date}</small></h5></StatBox>
                    :
                    <StatBox><h5>fully grown in {timeDisplay.time} {timeDisplay.unit}</h5> <h5><small>{timeDisplay.date} </small></h5></StatBox>}

                </StatList>
                <StatList>
                    <StatBox><h5>percent grown: {Number(treeData[1].result.percentGrown) / 100}</h5></StatBox>
                    <StatBox><h5>render method: { treeData[1].result.renderMethod ? "off chain" : "on chain"}</h5></StatBox>
                    <StatBox><h5>current fruit total: { Number(treeData[3].result)}</h5></StatBox>
                    <StatBox><h5>total harvested: {Number(treeData[1].result.totalHarvested)}</h5></StatBox>
                    <StatBox><h5>eth received: {formatEther(treeData[1].result.ethReceived)}</h5></StatBox>
                    <StatBox><h5>clouds: {treeData[1].result.clouds ? "yes" : "no"} </h5></StatBox>
                </StatList>
                

          </StatsContainer>
  )
}

export default Stats




const StatBox = styled.div`
border: 1px solid black;
border-radius: 8px;
width: 100%;
// max-height: min-content;
display: flex;
justify-content: space-evenly;
align-items: center;
text-align: center;
padding: 1.2rem 0 1.2rem  0;
margin .5rem auto;
    @media (max-width: 500px) {
        font-size: .5rem;
        padding: .5rem 0 .5rem  0;
        flex-direction: column;
        margin .2rem auto;
        // width: 90%;
    }


    @media (max-width: 1280px) {
        padding: .2rem 0 .2rem  0;
      }

      @media (height: 1000px) {
        padding: .5rem 0 .5rem  0; 
      }

`



const StatList = styled.div`
width: 49%;
height: 100%;
display:flex;
// background-color: blue;
flex-direction: column;
// justify-content: start;
// align-items: space-evenly;

@media (max-width: 500px) {
    
}
`;


   
const StatsContainer = styled.div`
    width: 100%;
    height: max-content;
    display:flex;
    // background-color: orange;
    justify-content: space-between;
    // align-content: start;
    // margin: auto;
    @media (max-width: 500px) {
        height: 100%;
        
    }

    

`
