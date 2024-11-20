import React from 'react'
import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
  return (
    <div className='mt-auto' onClick={()=> (console.log("hii clicked"))}>
        <BiLogOut className='w-6 h-6 mt-5 text-white cursor-pointer'  onClick={()=> (console.log("hii clicked 2"))}/>
			{/* {!loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
			) : (
				<span className='loading loading-spinner'></span>
			)} */}
		</div>
  )
}

export default LogoutButton