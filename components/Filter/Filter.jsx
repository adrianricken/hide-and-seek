import React, { useState } from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  width: 100%;
`;

const Filter = ({ setFilter }) => {
  const [selectedAmenity, setSelectedAmenity] = useState("");

  const handleFilterChange = (e) => {
    setSelectedAmenity(e.target.value);
    setFilter(e.target.value);
  };

  return (
    <div>
      <p>Filter:</p>
      <StyledSelect value={selectedAmenity} onChange={handleFilterChange}>
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
      </StyledSelect>
    </div>
  );
};

export default Filter;
