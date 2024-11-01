import styled from "styled-components";
import Image from "next/image";

export const CardContainer = styled.div`
  width: 30rem;
`;

export const ParkName = styled.h3`
  margin-top: 1rem;
  color: #336234;
`;

export const ImageContainer = styled.div`
  position: relative;
  height: 20rem;
  width: 30rem;
`;

export const newImage = styled(Image)`
  object-fit: cover;
  filter: saturate(0.8);
`;
