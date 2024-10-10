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
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  float: left;
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
`;

const MapSection = styled.section`
  width: 50%;
  position: relative;
  height: auto;
  float: right;
`;

const CommentSection = styled.section`
  display: flex;
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
      <IntroSection id="intro">
        <IntroImage>
          <div>
            <Image src={image} fill alt="" />
          </div>
        </IntroImage>
        <IntroTitle>
          <h1>{name}</h1>
          <p>{description_short}</p>
        </IntroTitle>
      </IntroSection>
      <MapSection id="map">
        <p>{description}</p>
        <br />
        {/* maybe another image? */}
        <h3>Accessibility:</h3>
        <p>{accessible}</p>
      </MapSection>
      <CommentSection>
        <h3>Comment section:</h3>
        <Comments />
      </CommentSection>
    </>
  );
}
