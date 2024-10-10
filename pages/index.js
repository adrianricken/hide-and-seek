import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: bottom;
  margin-top: 8vh;
  min-width: 100%;
  min-height: 100%;
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

const TextContainer = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  height: 300px;
  background-color: white;
  padding: 10px;
  border: 1px solid black;
`;

const LogButton = styled.button`
  border: none;
  background-color: transparent;
`;

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <>
      <VideoBackground autoPlay loop muted>
        <source src="/leaves_cut.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>

      <Background>
        <TextContainer>
          <p>
            Hide and Seek is an interactive web platform designed to showcase
            the parks in your city, providing users with comprehensive
            information about available activities, nearby shops, and upcoming
            events. Users can easily browse through a curated list of parks,
            filter those based on specific features, and search for parks by
            name. If interested: each park is presented in a detailed view.
          </p>
        </TextContainer>
      </Background>
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
