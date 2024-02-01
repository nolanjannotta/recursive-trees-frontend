import React, { useState, useContext } from "react";
import styled from "styled-components";
import {useConnectModal} from "@rainbow-me/rainbowkit";
import {DataContext} from './DataContext'
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { useChainLinkEthPrice } from "../hooks/useChainLinkEthPrice";
import { formatEther } from "viem";

function Home() {
  const { openConnectModal } = useConnectModal();

  const {extraData} = useContext(DataContext);


  const price = useChainLinkEthPrice(extraData ? Number(extraData[10].result) : 1e18);


  if(!extraData) {
    return(
      <Loading/>
    )
  }

  return (
    <Container>
      <Demo>
        <Title>Recursive Trees</Title>
        
        {!extraData[0].error ? (
          <Image
            src={
              "data:image/svg+xml;base64," +
              Buffer.from(extraData[0].result).toString("base64")
            }
            
            type="image/svg+xml"
          ></Image>) : (<p>error loading tree #1. try reloading the page.</p>)
      
      }

        <ButtonGroup>
          <Link to="/search"><button>search</button></Link>

          <Link to="/plant"><button>plant</button></Link>
          

          {openConnectModal ? 
          
          (<button onClick={openConnectModal} type="button">connect</button>) : 
        
          (<Link to="/wallet"><button>wallet</button></Link>)}



        </ButtonGroup>
      </Demo>

      <Text>
        <br/>
        <br/>
        <h4>Welcome to Recursive Trees.</h4>
        <br/>
        <p>
          Recursive Trees is an ultra dynamic, constantly evolving, completely on chain
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
           <br/>
           
        </h4>

        <div>
        <h3>As of right now, this project has raised {formatEther(extraData[10].result)} eth! thats equal to ${(price)} USD! <small style={{fontSize: ".6em"}}>  (price courtesy of chainlink.)</small></h3>
        </div>

        <br/>
        <div>
          <h2>
            medium article explaining how this project works can be found  
        <a href="https://medium.com/@anjannotta/recursive-trees-a-revolutionary-new-digital-collectable-on-ethereum-4dfd9bf0aeb2" target="blank"> here!</a>
        </h2>
        </div>
        

        <br/>
        <br/>
        <h4>how it works:</h4>
        <br/>
        <br/>
        <p>
          When you plant a tree, your address and timestamp are stored on chain. 
          Adding these numbers together (the address is converted to a number) along with the token id
          gives us the "seed" of the tree. This seed is then hashed and used to deterministically generate branch lengths 
          and angles which results in a tree that is completely unique from every other tree. This is all done inside the smart contract.
          Everything is handled on chain in solidity. The image and all traits are drawn and calculated 
          everytime tokenURI() is called. This means there can be zero urls, ipfs, centralized servers, dependencies, p5.js etc. 
          <br/>
          There is one optional caveat however. In some cases, a tree might be so big 
          that, depending on the RPC url used, the call will run out of gas while generating the image and encoding everything on chain. 
          This will cause tokenURI() to fail. If this happens, the owner can choose to toggle the render
          method to off chain.
          This means that instead of generating the svg from scratch in the smart contract, an empty image 
          in returned with javascript code inside of it that handles the tree generating in the browser.
          This script depends on one external library for the keccak256 algorithm. A url to the library is stored on
          chain and can be updated by the owner in case anything breaks in the future.
          <br/>
          In these cases, theres another function available called getRawSvg().
          This returns only pure svg code for the entire tree directly from the smart contract. 
          This function uses much less gas than tokenURI() and still generates the image on completely chain. So, if your tree is 
          too big for tokenURI() but you're an on chain purest, getRawSvg() might be the function for you. 
          <br/> 
          In this interface, getRawSvg() is used to display all trees. There are rare cases where even getRawSvg() runs out of gas,
          in this case you might need to toggle to off chain rendering in order to view your tree on this website. This still all depends on 
          the RPC url used, in my tests, Open Sea has been pretty good with rendering everything on chain. 
        </p>
        <br />
        <p>
          Each tree by default takes exactly 50 days to fully grow starting at the moment
          it was planted (minted). The SVG image changes and grows over
          time to reflect the current position in the grow period. If you want
          to speed up the growing process, you can "water" a tree by calling
          "water(id)" and sending ether. If the tree exists, and is currently in
          its growing period, it will reduce the total grow period by 1 day 
          for every .01 ether sent. .1 eth = 10 days,  .23 = 23 days etc.
        </p>
        <p>
          Once the tree is fully grown, the first fruit grow period starts.
          Fruit takes 2 weeks to grow and be harvestable. in the first week,
          nothing happens. During the second week, fruit may or may not start
          slowly growing on your tree. The fruit amount and locations depends on the
          fruit seed that is generated at mint time and updated each time the
          tree is harvested or fruit is picked. after the 2 weeks, if the tree
          has fruit, it can be harvested.
        </p>
        <p>
          Watering a tree <Bold>after</Bold>  it is fully grow increases the odds that any particular leaf will turn into a fruit, 
          meaning it will grow more. The odds start 5% for every tree. This results in an average of about 100 fruit per tree per 
          cycle. Watering with .0005 eth increases the odds by .01%, amounts less than this won't have any effect
          (aside from donating more money). Watering with .1 eth increases the odds by 1%, and so on. So, watering with a total 
          of 4.75 eth (since it starts at 5%) means 100% of the leaves will be fruit for ever. All eth received from watering is 
          donated to charity.

        </p>
        <br />
        harvesting does a few things:
        <List>
          <li>counts the amount of fruit on the tree</li>  
          <li>creates and saves a new fruit seed</li>
          <li>mints Fruit Tokens to you. One for each fruit harvested</li>
          <li>sets the next harvest time to 2 weeks from this function call</li>
        </List>

        <br />
        <br />
        <p>
          since this function will likely be expensive, it might not always be worth
          it to harvest your fruit. If you still want to update the fruit seed
          and harvest time, you can call "pickFruit()". You can do this after only 1 week into the grow cycle. So if your tree has zero or very 
          few fruit, you dont need to wait the full 2 weeks before you can pick or harvest fruit.
          </p>
        <br />
        this does 2 things:
        
        <br />
        <List>
          <li>creates and saves a new fruit seed</li>
          <li>sets the next harvest time to 2 weeks from this function call</li>
        </List>
        <br/>
        <p>harvesting and picking fruit can only be called by the owner of the tree being harvested or picked.</p>
        <br />
        <br />
        <h4>The Fruit Token (ERC20)</h4>
        <p>
          As stated above, this token in minted only via harvesting fruit. The total supply starts at 0, there is a max supply of 1,000,000 tokens. 
          <br/>
          This token has 1 built in utility. It can be used to plant new trees.
          In addition to the 5,000 available to be planted with Eth, 2,000 more
          can be planted with fruit tokens.
        </p>
        <p>
          It costs 1,000 tokens to plant a new tree. Planting this way burns all 1000 tokens
          reducing the total supply. If the max amount of fruit tokens are
          minted (via harvesting) then harvesting will no longer mint tokens. 
          If a user plants a tree with fruit tokens, 1,000 tokens are burned and freed up to be minted by anyone via harvesting.
          </p> 
          <br/>
          <p>
          
          there is also a public "burn" function in the fruit token contract. This burns fruit tokens from the caller. 
          This allows anyone to build on top of this project by making something that consumes and burns fruit tokens. 
          allowing users to keep harvesting.
        </p>
        <br/>
        <br/>
        <br/>
        <div>        
        </div>
        
        <br/>
        <br/>
        <br/>
      </Text>
    </Container>
  );
}

export default Home;

const Donations = styled.div`
display: flex;
justify-content: center;
background-color: orange;


`

const Image = styled.img`
  width: 50%;
  @media (max-width: 500px) {
    width: 80%;
  }

`


const Title = styled.h1`
all: none;

@media (max-width: 500px) {
  font-size: 2rem;
}
`

const Bold = styled.span`
font-weight: bold;


`

const List = styled.ul`
display:flex;
flex-direction: column;
align-items: start;




`

const Text = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;

  @media (max-width: 500px) {
    width: 90%;
  }


`;


const ButtonGroup = styled.div`
  // background-color: orange;
  // padding: 20px 50px 20px 50px;
  margin-top: 2rem;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  `;

const Demo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  `;
