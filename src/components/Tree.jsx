import React, { useState, useEffect, useContext } from "react";
import { useGetTreeData } from "../hooks/useGetTreeData";
import { useGetTokenURI } from "../hooks/useGetTokenURI";
import styled from "styled-components";
import {useAccount} from "wagmi";
import Stats from "./Stats";
import TreeControls from "./TreeControls";
import {Link, useParams, useNavigate,useLocation} from "react-router-dom";

import {DataContext} from './DataContext'
import TreeNotFound from "./TreeNotFound";
import Loading from "./Loading";



function Tree() {

  let {id} = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

  const {extraData} = useContext(DataContext);

  const userTrees = location.pathname.substring(0,5) == "/user";


  const { treeData,  refetch: getTreeData } = useGetTreeData(id); 
  const {tokenURI, treeJson, getUri } = useGetTokenURI(id);

  // console.log((treeData[1].result.treeSeed).toString());
  const { address } = useAccount();

  const isOwner = treeData ? treeData[2].result == address : false;

  if(!extraData || !treeData ) {
    return(<Loading/>)
  }

  if(extraData && id > extraData[2].result || !Number(id)) {
    return(<TreeNotFound/>)
  }

  return (
    <Container>
      <h1>Tree #{id}</h1>
      <Middle>
        <Left>
          
            {!treeData[0].error && <SVG id="svg" data={"data:image/svg+xml;base64," + Buffer.from(treeData[0].result).toString("base64")} type="image/svg+xml"></SVG>}

            {treeData[0].error && !treeJson && 
              <Error>uh oh, looks like `getRawSvg()` failed using this RPC url. This can happen when a tree is particularly large.
              
              Feel free to view on open sea or toggle the render method to off chain if you own this tree.
              
              </Error>}

            {treeData[0].error && treeJson && <SVG id="svg" data={treeJson.image} type="image/svg+xml"></SVG>}
            
          <div>
            <Link to={`/${userTrees ? "user/" : ""}tree/${Number(id) - 1}`}><button disabled={Number(id) == 1} >previous</button></Link>
            <Link to={`/${userTrees ? "user/" : ""}tree/${Number(id) + 1}`}><button disabled={Number(id) == extraData[2].result} >next</button></Link>
          </div>

        </Left>

        <Right>
        <Stats treeData={treeData} treeId={id} address={address} isOwner={isOwner} />
          <TreeControls address={address} isOwner={isOwner} treeId={id} treeJson={treeJson} tokenURI={tokenURI} nextHarvest={Number(treeData[1].result.nextHarvest)}></TreeControls>

        </Right>

      </Middle>

      <div>

        <Link to={`/${userTrees ? "wallet/" : "search/"}`}><button>back</button></Link>

        
        <button onClick={() => {getUri(); getTreeData();}}>refresh</button>
      </div>

      

    </Container>
  );
}

export default Tree;



const Right = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Left = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Error = styled.p`
  height: 100%;

`

const SVG = styled.object`
  width: 80%;  
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;

  
`;

const Middle = styled.div`
  width: 90%;
  min-height: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`