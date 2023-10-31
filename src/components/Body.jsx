import React, { useState } from "react";
import styled from "styled-components";

import Home from "./Home";
import Search from "./Search";
import Mint from "./Mint";
import Tree from "./Tree";
import Enter from "./Enter";
import Wallet from "./Wallet";
import { useGetExtraData } from "../hooks/useGetExtraData";
import { useGetUserTrees } from "../hooks/useGetUserTrees";

function Body() {
  const [displayPage, setDisplayPage] = useState(0);

  const [treeId, setTreeId] = useState(0);

  const {
    extraData,
    isloading: treeLoading,
    refetch: getExtraData,
  } = useGetExtraData();


  // console.log(extraData)

  // const [demoTree, setDemoTree] = useState("")

  return (
    <>
      {displayPage == 0 && <Enter setDisplayPage={setDisplayPage} />}
      {displayPage == 5 &&  (
            <Wallet
              setDisplayPage={setDisplayPage}
              extraData={extraData}
            />
          )}

      {displayPage > 0 && displayPage < 5 && (
        <Container>
          {displayPage == 1 && <Home extraData={extraData} setDisplayPage={setDisplayPage} />}
          {displayPage == 2 && (
            <Search
              extraData={extraData}
              setDisplayPage={setDisplayPage}
              setTreeId={setTreeId}
            />
          )}
          {displayPage == 3 && (
            <Mint extraData={extraData} getExtraData={getExtraData} setDisplayPage={setDisplayPage} />
          )}
          {displayPage == 4 && (
            <Tree
              extraData={extraData}
              setDisplayPage={setDisplayPage}
              setTreeId={setTreeId}
              treeId={treeId}
            />
          )}

          
        </Container>
      )}
    </>
  );
}

export default Body;


const Object = styled.object`
background-color: orange;


`

const Demo = styled.div`
// margin-top: 680px;
// background-color: purple;
height: 85%;
display: flex;
align-items: center;
flex-direction: column;



`

const Container = styled.div`
  // margin-top: 3%;
  // padding-top: 5%;
  width: 80%;
  height: 80%;
  display: flex;
  // justify-content: flex-start;
  flex-direction: column;
  align-items: center;

  background-color: #b6b6b6;
  border: 2px solid black;
  overflow-y: scroll;
  box-shadow: 10px 10px rgb(26, 26, 26, 0.8);
`;
