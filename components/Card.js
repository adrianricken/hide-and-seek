import Link from "next/link.js";
import styled from "styled-components";
import Image from "next/image.js";

const ImageContainer = styled.div`
  position: relative;
  height: 15rem;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const Anchor = styled.a`
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
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
      <ImageContainer>
        <StyledImage src={image} fill alt="" />
      </ImageContainer>
      <h2>{name}</h2>
      <Link href={`parks/${id}`} passHref legacyBehavior>
        <Anchor>
          <ScreenReaderOnly>More Info</ScreenReaderOnly>
        </Anchor>
      </Link>
    </>
  );
}
