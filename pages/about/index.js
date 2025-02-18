import styled from "styled-components";

const AboutContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -15vh;

  padding: 20rem;

  @media (max-width: 1000px) {
    padding: 5rem;
  }
  @media (max-width: 600px) {
    padding: 3rem;
  }
`;

const About = styled.p`
  color: #336234;
  line-height: 2;
`;

export default function events() {
  return (
    <AboutContainer>
      <About>
        Introducing my capstone project for the Web Development bootcamp at
        Spiced Academy: an application designed to explore and showcase the
        parks of Berlin. This app allows users to easily browse the public parks
        in the city, complete with detailed information about each location.
        Users can filter parks based on available sports facilities, making it
        easy to find what they&apos;re looking for. Each park entry includes an
        overview of the recreational opportunities available, ensuring users can
        maximize their outdoor experiences. Logged in users are also able to add
        comments to communicate their experiences and share them with others.
      </About>
    </AboutContainer>
  );
}
