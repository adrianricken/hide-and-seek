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
`;

export default function events() {
  return (
    <AboutContainer>
      <About>
        Hide and Seek is an interactive city guide that helps you discover the
        parks of Berlin. Browse through a curated list of parks and look for
        amenities like sports facilities, and dive into detailed park
        descriptions. The app offers real-time search, filtering options, and an
        intuitive user experience designed to make exploring the city’s green
        spaces fun and engaging.
      </About>
    </AboutContainer>
  );
}
