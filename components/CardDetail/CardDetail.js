import Image from "next/image";
import styled from "styled-components";
import Comments from "../Comments/Comments";

const IntroSection = styled.section`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f5f0ec;
`;

const IntroImage = styled.div`
  width: 50%;
  height: 180%;
  position: absolute;
  object-fit: cover;
  z-index: 1;
`;

const IntroTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  position: absolute;
  right: 0;
  margin-top: 200px;
  padding: 40px;
`;

const MapSection = styled.section`
  width: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  height: auto;
  float: right;
  padding: 40px;
`;

const CommentSection = styled.section`
  display: flex;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full height of the viewport */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack the elements on smaller screens */
  }
`;

export default function CardDetail({
  // id,
  name,
  location,
  description,
  image,
  // amenities,
  accessible,
  description_short,
}) {
  return (
    <>
      <Container>
        <IntroSection id="intro">
          <IntroImage>
            <Image src={image} fill alt="" />
          </IntroImage>
          <IntroTitle>
            <h1>{name}</h1>
            <br />
            <p>{description_short}</p>
          </IntroTitle>
        </IntroSection>
        <MapSection id="map">
          <p>{description}</p>
          <br />
          <h3>Accessibility:</h3>
          <p>{accessible}</p>
        </MapSection>
        <CommentSection>
          <h3>Comment section:</h3>
          <Comments />
        </CommentSection>
      </Container>
    </>
  );
}
