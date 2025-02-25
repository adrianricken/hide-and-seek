import styled from "styled-components";

export const IntroSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 53vh;
  background-color: #ffff;
  position: relative;
  margin-top: -8vh;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  height: 100%;
  background-color: #ffff;
  position: relative;
`;

export const OutroSection = styled.section`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  max-width: 1280px;
`;

export const IntroImage = styled.div`
  position: relative;
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
  margin-top: 8vh;
`;

export const IntroTitle = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const ContentWrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto; /* Zentriert das Element */
  padding: 0 2rem; /* Fügt etwas Abstand an den Seiten hinzu */
`;

export const FullWidthContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const BlockTitle = styled.h1`
  text-align: center;
  margin-top: 3rem;
  color: #336234;
  font-size: 3rem;
`;

export const BlockDescription = styled.p`
  text-align: center;
  width: 100%;
  color: #336234;
  padding: 5rem 3rem 5rem 3rem;
`;

export const RightContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const BlockDescriptionFull = styled.div`
  display: block;
  padding: 5rem 3rem 5rem 3rem;
  color: #336234;
`;

export const OutroImage = styled.div`
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

export const CommentSection = styled.section`
  flex: 1;
  width: 100%;
  padding: 5rem 3rem 5rem 3rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
