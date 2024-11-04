import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'

const SideChats = () => {
  return (
    <div className='border-r border-slate-500 p-4 md:min-w-[350px] sm:min-w-[250px] flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<Conversations />
			<LogoutButton />
		</div>
  )
}

export default SideChats