// SearchDoctor.jsx
import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";

const SearchDoctor = ({ handleSearch }) => {
    const [searchInput, setSearchInput] = useState('');

    const handleChangeSearch = (event) => {
        const inputValue = event.target.value;
        setSearchInput(inputValue);
    };

    const handleClickSearch = () => {
        handleSearch(searchInput); // Truyền giá trị searchInput tới parent component
    };

    return (
        <>
            <div className='doctor-search'>
                <input
                    type='text'
                    placeholder=' Search doctor...'
                    value={searchInput}
                    onChange={handleChangeSearch}
                />
            
            </div>
            <div className='search'>
                <button onClick={handleClickSearch}><IoSearchSharp /></button>
            </div>
        </>
        
    );
};

export default SearchDoctor;
