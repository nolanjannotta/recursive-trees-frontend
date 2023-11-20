import {useState, useEffect} from 'react'

export function useUserTrees(extraData) {

    const [ids, setIds] = useState([]);
  
      useEffect(()=>{
        if(extraData && extraData[6].result) {
  
          // setIds({
          //   ids: extraData[6].result.length > 20 ? extraData[6].result.slice(0,20) : extraData[6].result,
          //   overFlow: extraData[6].result.length > 20 ? extraData[6].result.length - 20 : 0
          // })

          setIds(extraData[6].result)

          
  
          
        }
        
      },[extraData])

      return ids

 
}

