import React, { useContext, useEffect, useState } from "react";
import { synCtx } from "../../context/context";
import './FilterSyn.css';

export default function FilterSyn({ setFilter }) {
  const { dbData } = useContext(synCtx);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999);

  useEffect(() => {
  function handlePriceFilter() {
    // We want to set the max and min prices to the values the user has inputted. We also want to set Filter.type to price so we know we're filtering by price. 
    setFilter({ type: "price", value: { min: minPrice, max: maxPrice } });
  }
    handlePriceFilter();
    }, [minPrice, maxPrice ]);

  return (
    <div className="filter-container">
      {/* data.synergies is an array of objects. Each object has certain properties we want to be able to filter by. Creator, Price, etc.  */}
      <label>Filter by Creator</label>
      {/* We want to be able to filter by creator. We need to map through the array of synergies and get the unique creators */}
      <select
        onChange={(e) => setFilter({ type: "creator", value: e.target.value })}
      >
        <option value="All">All</option>
        {/* synergies.synergy.creator is going to have many creators. Some duplicates. We only want to map over the duplicates once essentially creating unique buttons for each new name */}

        {[...new Set(dbData.synergies.map(synergy => synergy.creator))].map(creator => (
          <option key={creator} value={creator}>
            {creator}
          </option>
        ))}
      </select>
      <label>Filter by Price</label>
      {/* We want to display to text boxes that allow the user to filter price by min and max */}
      <input
        type="number"
        placeholder="Min"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
    </div>
  );
}
