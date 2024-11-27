import React from 'react'
import Search from '../components/body/search/Search'
import CreateUser from '../components/body/user/CreateUser'
import ListUser from '../components/body/user/ListUser'
import { setSearchQuery } from '../utils/slice/userSlice'
import { useSelector } from 'react-redux'

const User = () => {
  const searchVal=useSelector((store)=>store.user.searchQuery)
  return (
    <div className="w-full h-full bg-white shadow-lg rounded-lg p-10">
        <h1 className="text-xl font-bold mb-10">User Management</h1>
        <div className="w-full md:flex items-center justify-between">
          <Search searchVal={searchVal} query={setSearchQuery} />
          <CreateUser/>
        </div>
        <div className="w-full py-5">
          <ListUser />
        </div>
      </div>
  )
}

export default User
