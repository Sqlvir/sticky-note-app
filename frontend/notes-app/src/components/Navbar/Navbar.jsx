import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import Logo from '../../assets/sticky-notes.png';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {

  const [searchQUery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if(searchQUery) {
      onSearchNote(searchQUery)
    }
  };

  const onClearSearch = () => {
     setSearchQuery("");
     handleClearSearch();
  };

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
       <h2 className='text-xl font-medium text-black item-center justify-center py-2'><span>Sticky</span> <img src={Logo} /></h2>

       <SearchBar value={searchQUery}
           onChange={({target}) => {
              setSearchQuery(target.value);
           }}
           handleSearch={handleSearch}
           onClearSearch={onClearSearch}
       />

       <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  )
}

export default Navbar
