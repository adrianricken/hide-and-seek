import styled from "styled-components";

const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 82vh;
  width: 100vw;
`;

export default function events() {
  return (
    <EventsContainer>
      <p>- coming soon -</p>
    </EventsContainer>
  );
}
