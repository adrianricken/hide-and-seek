import styled from "styled-components";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 82vh;
  width: 100vw;
  padding: 10rem;
`;

export default function events() {
  return (
    <AboutContainer>
      Hide and Seek is an interactive city guide that helps you discover the
      parks of Berlin. Browse through a curated list of parks and look for
      amenities like sports facilities, and dive into detailed park
      descriptions. The app offers real-time search, filtering options, and an
      intuitive user experience designed to make exploring the city’s green
      spaces fun and engaging.
    </AboutContainer>
  );
}
