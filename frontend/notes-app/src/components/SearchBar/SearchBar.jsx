import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {

  return (
    <div className='searchbox-width flex items-center px-4 bg-slate-100 rounded-md hover:shadow-md transition-all ease-in-out'>
      <input
        type='text'
        placeholder='Search Notes Title'
        className='w-full text-sm font-medium bg-transparent py-[13px] outline-none searchbox'
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3" onClick={onClearSearch} />
      )}

      <FaMagnifyingGlass className='text-slate-400 cursor-pointer hover:text-black' onClick={handleSearch} />

    </div>
  )
}

export default SearchBar
