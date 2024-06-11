import React from 'react'
import DisplayPanel from '../components/displayPanel/DisplayPanel'
import { StakingProvider } from '../context/StakingProvider'

const page = () => {
  return (
    <StakingProvider>
      <DisplayPanel/>
    </StakingProvider>
  )
}

export default page