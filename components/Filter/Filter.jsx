import React, { useState } from "react";
import * as Styled from "./Filter.styles";

function Filter({ setFilter }) {
  const [selectedAmenity, setSelectedAmenity] = useState("");

  function handleFilterChange(e) {
    setSelectedAmenity(e.target.value);
    setFilter(e.target.value);
  }

  return (
    <div>
      <p>Filter:</p>
      <Styled.Dropdown value={selectedAmenity} onChange={handleFilterChange}>
        <option value="">All amenities</option>
        <option value="Basketball">Basketball</option>
        <option value="Beach volleyball">Beach volleyball</option>
        <option value="Boule">Boule</option>
        <option value="Calisthenics">Calisthenics</option>
        <option value="Climbing">Climbing</option>
        <option value="Football">Football</option>
        <option value="Skating">Skating</option>
        <option value="Playground">Playground</option>
        <option value="Table tennis">Table tennis</option>
      </Styled.Dropdown>
    </div>
  );
}

export default Filter;
