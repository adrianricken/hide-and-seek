import styled from "styled-components";
import Image from "next/image.js";
import Link from "next/link";

const CardContainer = styled.div`
  width: 30rem;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 20rem;
  width: 30rem;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  filter: saturate(0.8);
`;

const ParkDescription = styled.p`
  margin: 0;
  color: #555;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) =>
    props.isExpanded ? "none" : "3"}; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function Card({ name, image, id, info }) {
  return (
    <CardContainer>
      <h2>{name}</h2>
      <ImageContainer>
        <Link href={`/parks/${id}`} passHref>
          <StyledImage src={image} fill alt="" />
        </Link>
      </ImageContainer>
      <ParkDescription>{info}</ParkDescription>
    </CardContainer>
  );
}
