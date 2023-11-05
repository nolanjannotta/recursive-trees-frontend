import React, { useState, createContext, useContext } from "react";
import styled from "styled-components";

import {DataProvider} from './DataContext'


import Home from "./Home";
import Search from "./Search";
import Mint from "./Mint";
import Tree from "./Tree";
import Enter from "./Enter";
import Wallet from "./Wallet";
import NavBar from "./NavBar";
import Footer from "./Footer";


import {Routes, Route} from 'react-router-dom';
import InvalidUrl from "./InvalidUrl";

// export const DataContext = createContext({});


function Body() {

  const [treeId, setTreeId] = useState(0);

  // const data = useGetExtraData();

  // console.log(data)

  return (
    <>
    <NavBar/>

    <Routes>
      <Route path="/" element={<Enter/>}/>
    </Routes>

    <DataProvider>
    <Routes>  
      <Route path="/home" element={<Container><Home/></Container> }/>
      <Route path="/plant" element={<Container><Mint/></Container> }/>
      <Route path="/search" element={<Container><Search/></Container> }/>
      <Route path="/wallet" element={<Wallet/>}/>
      <Route path="/tree/:id" element={<Container><Tree/></Container> }/>

      <Route path="*" element={<InvalidUrl/>}/>

    </Routes>
            
    </DataProvider>

    <Footer/>
    </>
  )
 
  

  // return (


  //  <>
  //      {displayPage == 0 && <Enter setDisplayPage={setDisplayPage} />}

  //     {displayPage == 5 &&  (
  //           <Wallet
  //             setDisplayPage={setDisplayPage}
  //             extraData={extraData}
  //           />
  //         )}

  //     {displayPage > 0 && displayPage < 5 && (
  //       <Container>
  //         {displayPage == 1 && <Home extraData={extraData} setDisplayPage={setDisplayPage} />}
  //         {displayPage == 2 && (
  //           <Search
  //             extraData={extraData}
  //             setDisplayPage={setDisplayPage}
  //             setTreeId={setTreeId}
  //           />
  //         )}
  //         {displayPage == 3 && (<Mint extraData={extraData} getExtraData={getExtraData} setDisplayPage={setDisplayPage} />)}
  //         {displayPage == 4 && (
  //           <Tree
  //             extraData={extraData}
  //             setDisplayPage={setDisplayPage}
  //             setTreeId={setTreeId}
  //             treeId={treeId}
  //           />
  //         )}

          
  //       </Container>
  //     )}
  //   </> 
  // );
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
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // margin: 20px 0px 20px 0px;
  background-color: #b6b6b6;
  border: 2px solid black;
  overflow-y: scroll;
  box-shadow: 10px 10px rgb(26, 26, 26, 0.8);
`;
