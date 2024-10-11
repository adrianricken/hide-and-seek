import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const FullScreenDiv = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw; // 100% der Breite des Viewports
  height: 100vh; // 100% der Höhe des Viewports
  z-index: 999; // Stellen Sie sicher, dass das Element über anderen Elementen angezeigt wird
`;

const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
  object-fit: cover;
  filter: blur(10px);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 8vw;
  color: #69af69;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #a3d2a3;
  }
`;

export default function HomePage() {
  const router = useRouter();
  // const { data: session, status } = useSession();

  return (
    <>
      <VideoBackground autoPlay loop muted>
        <source src="/leaves_cut.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <FullScreenDiv>
        <StyledLink href={"./parks"}>Hide and Seek</StyledLink>
      </FullScreenDiv>
    </>
  );
}

// above return:
// useEffect(() => {
//   if (status === "authenticated") {
//     // Redirect to the gallery page once authenticated
//     router.push("/parks");
//   }
// }, [status, router]);

// if (status === "loading" || status === "authenticated") {
//   // While the authentication status is being determined or user is already logged in, show nothing to avoid flickering effect
//   return null;
// }
