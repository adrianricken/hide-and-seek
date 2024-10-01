import Link from "next/link.js";
import styled from "styled-components";
import Image from "next/image.js";

const ImageContainer = styled.div`
  position: relative;
  height: 30rem;
  width: 30rem;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export default function Card({ name, image, id }) {
  return (
    <>
      <br />
      <h2>{name}</h2>
      <Link href={"parks / [id]"} passHref legacyBehavior>
        <ImageContainer>
          <StyledImage src={image} fill alt="" />
        </ImageContainer>
      </Link>
    </>
  );
}
