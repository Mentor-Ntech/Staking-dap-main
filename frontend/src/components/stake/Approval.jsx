"use client"
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

const Approval = () => {

    const handleToast = () => {
        toast.success('You have successfully staked!')
        // toast.error('Please enter a valid number!')
    }
  return (
    <div>
      <h1 className='font-semibold cursor-pointer' onClick={handleToast}>Token Approval</h1>
    </div>
  )
}

export default Approval