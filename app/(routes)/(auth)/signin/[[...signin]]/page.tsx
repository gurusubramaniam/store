import React from 'react'
import { SignIn } from '@clerk/nextjs'
import { Sign } from 'crypto'
export default function Signin () {
  return(
  <div className="flex justify-center">
   <SignIn />
  </div>)
}