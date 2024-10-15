import Image from "next/image";
import styled from "styled-components";
import CommentForm from "../CommentForm/CommentForm";

const IntroSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 93vh;
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
  height: 50vh;
  background-color: #f5f0ec;
  position: relative;
`;

const IntroImage = styled.div`
  position: relative;
  width: 100vw;
  height: 72%;
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

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
  height: 50%;
  width: 100%;
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
  margin: 0 0 15px 0;
  padding: 5rem;
  color: #336234;
`;

const OutroImage = styled.div`
  position: relative;
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
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
        <IntroTitle>
          <BlockTitle>{name}</BlockTitle>
          <BlockDescription>
            {description_short}
            <br />
            <br />
            <strong>Accessibility:</strong> {accessible}
          </BlockDescription>
        </IntroTitle>
      </IntroSection>

      <Section id="map">
        <LeftContainer>
          <p>Map Placeholder</p>
        </LeftContainer>

        <RightContainer>
          <BlockDescriptionFull>
            {description.split(/\n/).map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </BlockDescriptionFull>
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
      </OutroSection>

      <CommentSection id="comments">
        <CommentForm parkId={id} />
      </CommentSection>
    </Container>
  );
}
