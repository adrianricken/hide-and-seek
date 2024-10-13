import styled from "styled-components";
import Link from "next/link";

const FullScreenDiv = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const VideoBackground = styled.video`
  position: absolute;
  width: 50vw;
  height: 50vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  object-fit: cover;
  filter: blur(2px);
`;

const MainLink = styled(Link)`
  text-decoration: none;
  font-size: 10vw;
  color: #69af69;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #a3d2a3;
  }
`;

export default function HomePage() {
  return (
    <FullScreenDiv>
      <VideoBackground autoPlay loop muted>
        <source src="/leaves_cut.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <MainLink href={"./parks"}>Hide and Seek</MainLink>
    </FullScreenDiv>
  );
}
