import React from 'react'
import { useDispatch } from 'react-redux'


const Search = ({query,searchVal}) => {
    const dispatch=useDispatch()
  return (
    <>
        <input
      type="search"
      value={searchVal} 
      onChange={(e) => dispatch(query(e.target.value))} 
      className=" w-full mb-5  md:mb-0  md:w-1/3 rounded-lg border-gray-400 p-2"
      placeholder="Search"
    />
    </>
  )
}

export default Search
