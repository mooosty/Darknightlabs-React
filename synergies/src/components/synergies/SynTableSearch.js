import React from "react";
import { CiSearch } from "react-icons/ci";

export default function SynTableSearch({ search, setSearch, setData, dbData }) {
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
    setData({
      nodes:
        dbData.synergies.filter(
          (synergy) =>
            synergy.synergyName
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            synergy.creator.toLowerCase().includes(searchValue.toLowerCase())
        ) || [],
    });
  };

  function inputBoxPlaceHolder() {
    return "Search";
  }

  return (
    <div>
      <label htmlFor="search">
        <div className="search-container">
          <h1>Synergies Manager</h1>
          <div className="search-input-container">
            <CiSearch className="search-icon" />
            <input
              id="search"
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder={inputBoxPlaceHolder()}
              className="search-input"
            />
          </div>
          <div className="second-header-wrap">
            <h2>Darknight Labs</h2>
          </div>
        </div>
      </label>
      <br />
    </div>
  );
}
