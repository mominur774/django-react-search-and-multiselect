import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai'

const Search = () => {
  const [searchInput, setSearchInput] = useState("");

  const router = useRouter();

  const handleSearch = e => {
    setSearchInput(e.target.value)
  }
  const submitSearch = () => {
    router.push({
      pathname: '',
      query: { ...router.query, 'search': searchInput }
    })
  }
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        name="search"
        placeholder='Search...'
        onChange={handleSearch}
      />
      <span
        style={{ 'cursor': 'pointer' }}
        className="input-group-text"
        onClick={submitSearch}
      >
        <AiOutlineSearch />
      </span>
    </div>
  )
}

export default Search