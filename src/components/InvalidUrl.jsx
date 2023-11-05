import React from 'react'
import { Navigate } from 'react-router-dom'

function InvalidUrl() {
  return (
    <Navigate to='/home'/>
  )
}

export default InvalidUrl