import Image from "next/image";
import styled from "styled-components";
import CommentForm from "../CommentForm/CommentForm";
import dynamic from "next/dynamic";

const MapVolksparkFriedrichshain = dynamic(
  () => import("../Maps/MapVolksparkFriedrichshain"),
  {
    ssr: false,
  }
);

const IntroSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 53vh;
  background-color: #ffff;
  position: relative;
  margin-top: -8vh;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 93vh;
  background-color: #ffff;
  position: relative;
`;

const OutroSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 92vh;
  position: relative;
`;

const IntroImage = styled.div`
  position: relative;
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
  margin-top: 8vh;
`;

const IntroTitle = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20rem 0 20rem;
  z-index: 1;
`;

const BlockTitle = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
  color: #336234;
  font-size: 1.75rem;
`;

const BlockDescription = styled.p`
  margin: 0;
  text-align: center;
  color: #336234;
`;

const RightContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BlockDescriptionFull = styled.div`
  display: block;
  padding: 20rem;
  color: #336234;
`;

const OutroImage = styled.div`
  position: relative;
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden; /* Prevents overflow of the pseudo-elements */

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 20%; /* Adjust height to control the fade area */
    pointer-events: none; /* Allows clicks to pass through */
  }

  &::before {
    top: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
  }

  &::after {
    bottom: 0;
    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
  }
`;

const CommentSection = styled.section`
  flex: 1;
  padding: 5rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function CardDetail({
  id,
  name,
  description,
  image,
  accessible,
  description_short,
  secondImage,
}) {
  const formatDescription = (description) => {
    return description.replace(/\n/g, "<br />");
  };

  return (
    <Container>
      <IntroSection id="intro">
        <IntroImage>
          <Image
            src={image}
            fill
            alt={name}
            style={{ objectFit: "cover" }}
            priority={true}
          />
        </IntroImage>
      </IntroSection>
      <Section>
        <IntroTitle>
          <BlockTitle>{name}</BlockTitle>
          <BlockDescription>
            {description_short}
            <br />
            <br />
            <strong>Accessibility:</strong> {accessible}
          </BlockDescription>
        </IntroTitle>

        <MapVolksparkFriedrichshain />
      </Section>

      <Section id="map">
        <RightContainer>
          <BlockDescriptionFull
            dangerouslySetInnerHTML={{ __html: formatDescription(description) }}
          />
        </RightContainer>
      </Section>

      <OutroSection id="outro">
        <OutroImage>
          <Image
            src={secondImage}
            fill
            alt={name}
            style={{ objectFit: "cover" }}
            priority={true}
          />
        </OutroImage>
        <CommentSection id="comments">
          <CommentForm parkId={id} />
        </CommentSection>
      </OutroSection>
    </Container>
  );
}
