import React, { useState } from "react";
import styled from "styled-components";
// import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { useGetExtraData } from "../hooks/useGetExtraData";

function Home({ extraData, setDisplayPage }) {
  const { openConnectModal } = useConnectModal();

  return (
    <Container>
      <Demo>
        <h1>Recursive Trees</h1>
        {!extraData[0].error ? (
          <object
            data={
              "data:image/svg+xml;base64," +
              Buffer.from(extraData[0].result).toString("base64")
            }
            width="50%"
            // height="100%"
            type="image/svg+xml"
          ></object>) : (<p>error loading demo tree</p>)
      
      }

        <ButtonGroup>
          <button onClick={() => {setDisplayPage(2);}}>search</button>

          <button onClick={() => {setDisplayPage(3);}}>plant</button>
          

          {openConnectModal ? 
          
          (<button onClick={openConnectModal} type="button">connect</button>) : 
        
          (<button
            onClick={() => {
              setDisplayPage(5);
            }}
          >
            wallet
          </button>)}



        </ButtonGroup>
      </Demo>

      <Text>
        <br/>
        <br/>
        <h4>Welcome to Recursive Trees.</h4>
        <br/>
        <p>
          Recursive Trees is an ultra dynamic, constantly evolving, on chain
          ERC721 digital collectible on the Ethereum blockchain.
        </p>
        <br/>
        <h4>
          This project automatically donates 100% of the ether it receives to
          charity.
        </h4>
        <br />
        <h4>
          The charity is called{" "}
          <a target="blank" href="https://onetreeplanted.org/">
            One Tree Planted.
          </a>
        </h4>
        
        <h4>
          Donations are facilitated by{" "}
          <a href="https://endaoment.org/">Endaoment,</a> and are sent directly
          from the smart contract. The address can be found{" "}
          <a target="blank" href="https://app.endaoment.org/orgs/46-4664562">here</a> and
           {" "} <a target="blank" href="https://etherscan.io/address/0x42dc3bb63d6763a9e73948a1155a5538471071e4">here</a>. 
        </h4>

        <br/>
        <br/>
        <h4>how it works:</h4>
        <br/>
        <br/>
        <br/>
        <p>
          When you plant a tree, the timestamp and minters address are stored on chain. 
          The minters address is converted to number and added to the saved timestamp and the token id, this gives us the "seed" of the tree and is used to
          deterministically generate unique branch lengths and angles resulting
          in a tree that is comepletely unique. This is all done inside the smart contract, the entire svg and all traits are returned from the blockchain.
          This means there are zero urls, centralized servers, dependencies, javascript etc. There is one caveat though, in some cases a tree might be so big
          that it runs out of gas while recursively generating the image and encoding everything on chain which will cause tokenURI() to fail. If this happens, the owner can toggle the render method to off chain. 
          This means that instead of generating the svg from scratch in the smart contract, an empty image in returned with a javascript program inside of it that handles the tree generating in the browser.
          This script depends on one external library for the keccak256 algorithm, which is used to generate an identical tree as it. A url to the library is stored on chain and can be updated.
          <br/>
          In some cases though even if calling tokenURI() might fail, theres another function called getRawSvg() which returns raw svg code for a tree. 
          This function costs much less than token URI and still generates the svg on chain. So, if your tree is too big for tokenURI() and you're an on chain purest, getRawSvg() might still be able to generate your tree for you.


        </p>
        <br />
        <p>
          Each tree takes exactly 100 days to fully grow starting at the moment
          it was planted (minted). The SVG image changes and grows over
          time to reflect the current position in the grow period. If you want
          to speed up the growing process, you can "water" a tree by calling
          "water(id)" and sending ether. If the tree exists, and is currently in
          its growing period, it will reduce the total grow period by
          about 1 day for every .01 ether. for example, if a user mints and waits 50 days (50% grown) 
          and then "waters" it with .5 ether, it will become fully grown. any user can water any tree at any
          time.
        </p>
        <p>
          Once the tree is fully grown, the first fruit grow period starts.
          Fruit takes 2 weeks to grow and be harvestable. in the first week,
          nothing happens. during the second week, fruit may or may not start
          slowly growing on your tree. the fruit amount depends on the
          fruit seed that is generated at mint time and updated each time the
          tree is harvested or fruit is picked. after the 2 weeks, if the tree
          has fruit, it can be harvested. harvesting does 2 things:
        </p>
        <br />
        - recursively counts the amount of fruit on the tree (expensive)
        <br />
        - creates and saves a new fruit seed
        <br />
        - mints Fruit Tokens to you. 1:1 for each fruit harvested
        <br />
        - sets the next harvest time to 2 weeks from this function call
        <br />
        <br />
        <p>
          since this function will likely be expensive, it might not always be worth
          it to harvest your fruit. If you still want to update the fruit seed
          and harvest time, you can call "pickFruit()". 
        
        <p>this does 2 things:</p>
        </p>
        <br />
        - creates and saves a new fruit seed
        <br />
        - sets the next harvest time to 2 weeks from this function call
        <br />
        <br />
        <h4>The Fruit Token (ERC20)</h4>
        <p>
          This token has 1 built in utility. It can be used to plant new trees.
          In addition to the 5,000 available to be planted with Eth, 2,000 more
          can be planted with fruit tokens.
        </p>
        <p>
          It costs 1,000 tokens to plant a new tree. Planting this way also burns the tokens
          reducing the total supply. If the max amount of fruit tokens are
          minted (via harvesting) then harvesting will no longer mint tokens. 
          If a user plants a tree with fruit tokens, 1,000 tokens are freed up to be minted via harvesting.
          </p> 
          <br/>
          <p>
          
          there is also a public "burn" function in the fruit token contract. This allows anyone 
          build on top of this project by making something that consumes and burns fruit tokens. 
          allowing users to keep harvesting.
        </p>
        <br/>
        <br/>
        <br/>
        more info can be found here.
        <br/>
        <br/>
        <br/>
      </Text>
    </Container>
  );
}

export default Home;

const Text = styled.div`
  width: 70%;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const ButtonGroup = styled.div`
  // background-color: red;
  padding: 20px 50px 20px 50px;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  // background-color: blue;
  display: flex;
  // justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  // margin-top: 200px;
  // overflow-y: scroll;
`;

const Object = styled.object`
  background-color: orange;
`;

const Demo = styled.div`
  // margin-top: 680px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  `;
