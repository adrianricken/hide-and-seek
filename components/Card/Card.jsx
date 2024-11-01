import Link from "next/link";
import * as Styled from "./Card.styles";

export default function Card({ name, image, id }) {
  return (
    <Styled.CardContainer>
      <Link href={`/parks/${id}`} passHref>
        <Styled.ImageContainer>
          <Styled.newImage
            src={image}
            fill
            sizes="30rem"
            alt="image of park"
            priority={true}
          />
        </Styled.ImageContainer>
      </Link>
      <Styled.ParkName>{name}</Styled.ParkName>
    </Styled.CardContainer>
  );
}
