import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: system-ui;
    line-height: 1.6;
  }

  /* sizing of map container */
  .leaflet-container {
  height: 50vh;
  width: 100%;
  }

  `;
