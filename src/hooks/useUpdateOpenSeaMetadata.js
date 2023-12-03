import {recursiveTrees} from '../Contracts.js'










export function useUpdateOpenSeaMetadata(id) {




    const options = {method: 'POST', headers: {'x-api-key': 'e6282758971e434ea141c7f926d1f31f'}};

    function update() {
       fetch(`https://api.opensea.io/api/v2/chain/goerli/contract/${recursiveTrees}/nfts/${id}/refresh`, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err)); 
    }

    
    return {update}

}