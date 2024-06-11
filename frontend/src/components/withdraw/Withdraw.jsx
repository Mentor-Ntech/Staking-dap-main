"use client"
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

const Withdraw = () => {

    const handleToast = () => {
        toast.error('Please enter a valid number!')
    }
  return (
    <div>
        <h1>Amount to withdraw</h1>
        <input type="text" />

        <h2 className='ml-1o cursor-pointer font-semibold mt-7' onClick={handleToast}>Withdraw your stake</h2>
        <Toaster/>
    </div>
  )
}

export default Withdraw