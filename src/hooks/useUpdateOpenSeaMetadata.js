import {recursiveTrees} from '../Contracts.js'










export function useUpdateOpenSeaMetadata(id) {




    const options = {method: 'POST'};

    function update() {
       fetch(`https://api.opensea.io/api/v2/chain/goerli/contract/${recursiveTrees}/nfts/${id}/refresh`, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err)); 
    }

    
    return {update}

}