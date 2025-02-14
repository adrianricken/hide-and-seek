import styled from "styled-components";
import Image from "next/image.js";

export const CardContainer = styled.div`
  width: 300px;
  height: auto;
`;

export const StyledParkName = styled.h3`
  margin-top: 1rem;
  color: #336234;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 66.66%; /* 3:2 Ratio */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledImage = styled(Image)`
  object-fit: contain; /* Verkleinert das Bild, damit es komplett sichtbar bleibt */
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
