import styled from "styled-components";
import Image from "next/image.js";

export const CardContainer = styled.div`
  width: 30rem;
`;

export const StyledParkName = styled.h3`
  margin-top: 1rem;
  color: #336234;
`;

export const ImageContainer = styled.div`
  position: relative;
  height: 20rem;
  width: 30rem;
`;

export const StyledImage = styled(Image)`
  object-fit: cover;
  filter: saturate(0.8);
`;
