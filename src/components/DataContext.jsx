import React from 'react'
import { useGetExtraData } from '../hooks/useGetExtraData'

export const DataContext = React.createContext();


export function DataProvider({children}) {
    const data = useGetExtraData();
  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  )
}

