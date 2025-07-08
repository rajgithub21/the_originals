import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between '>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
        <p className='text-4xl'>ADMIN PANEL</p>
        <button onClick={()=>setToken('')} className='active:bg-gray-600 bg-black text-white px-5 py-2 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar