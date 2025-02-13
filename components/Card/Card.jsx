import Link from "next/link";
import * as Styled from "./Card.styles";

export default function Card({ name, id }) {
  return (
    <Styled.CardContainer>
      <Link href={`/parks/${id}`} passHref>
        <Styled.ImageContainer>
          <Styled.StyledImage
            src={`/ParkIcons/${name}.svg`}
            alt="image of park"
            priority={true}
            fill
            sizes="30rem"
          />
        </Styled.ImageContainer>
      </Link>
      <Styled.StyledParkName>{name}</Styled.StyledParkName>
    </Styled.CardContainer>
  );
}
