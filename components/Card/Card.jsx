import Link from "next/link";
import * as Styled from "./Card.styles";

export default function Card({ name, image, id }) {
  return (
    <Styled.CardContainer>
      <Link href={`/parks/${id}`} passHref>
        <Styled.ImageContainer>
          <Styled.StyledImage
            src={image}
            fill
            sizes="30rem"
            alt="image of park"
            priority={true}
          />
        </Styled.ImageContainer>
      </Link>
      <Styled.StyledParkName>{name}</Styled.StyledParkName>
    </Styled.CardContainer>
  );
}
