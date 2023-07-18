import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useContractWrites } from "../hooks/useContractWrites";

function TreeControls({ isOwner, treeId, tokenURI }) {
  const [waterAmount, setWaterAmount] = useState(0);
  const [treeJson, setTreeJson] = useState({});
  function handleInput(event) {
    setWaterAmount(event.target.value);
  }

  // console.log(tokenURI)

  const { harvestWrite, pickFruitWrite, waterWrite, renderForIdWrite } =
    useContractWrites(treeId, waterAmount);

  const loadTree = (uri) => {
    let jsonManifestString = Buffer.from(uri.substring(29), "base64");
    let jsonManifest = JSON.parse(jsonManifestString);
    setTreeJson(jsonManifest);
  };

  useEffect(() => {
    tokenURI && loadTree(tokenURI);
  }, [tokenURI]);

  return (
    <Controls>
      <ButtonColumn>
        <Button disabled={!isOwner} onClick={renderForIdWrite.write}>
          Toggle render method
        </Button>
        <Button disabled={!isOwner} onClick={harvestWrite.write}>
          Harvest fruit
        </Button>
        <Button disabled={!isOwner} onClick={pickFruitWrite.write}>
          Pick fruit
        </Button>
      </ButtonColumn>
      <ButtonColumn>
        <Input type="number" onWheel={(e) => e.preventDefault} value={waterAmount} onChange={handleInput}></Input>
        <Button onClick={waterWrite.write}>water</Button>

        <Button
          disabled={!tokenURI}
          onClick={() => {
            navigator.clipboard.writeText(tokenURI);
          }}
        >
          copy token uri
        </Button>
        <Button
          disabled={!tokenURI}
          onClick={() => {
            navigator.clipboard.writeText(treeJson.image);
          }}
        >
          copy image uri
        </Button>
      </ButtonColumn>
      <OutOfGas>
        {!tokenURI &&
          "oof, looks like tokenURI() ran out of gas :( if you want, toggle render method to 'off chain' and refresh"}
      </OutOfGas>
    </Controls>
  );
}

export default TreeControls;

const OutOfGas = styled.p`
  // background-color: red;
  height: 10%;
  width: 100%;
  text-align: center;
`;
const ButtonColumn = styled.div`
  // background-color: orange;
  width: 50%;
`;
const Button = styled.button``;

const Water = styled.div`
  background-color: purple;
  // width: 100%;
  display: flex;
  justify-content: center;
  // padding: 0;
  // margin: 0;
`;
const Controls = styled.div`
  // background-color: orange;
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  // align-items: center;
  // flex-direction: column;
  flex-wrap: wrap;
  // overflowY: auto;
`;

const Input = styled.input`
  width: 10%;
  margin-right: 0;
`;
