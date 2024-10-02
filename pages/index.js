import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";

// Language: German option

const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const TextContainer = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  height: 800px;
  background-color: white;
  padding: 10px;
`;

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      // Redirect to the gallery page once authenticated
      router.push("/parks");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    // While the authentication status is being determined or user is already logged in, show nothing to avoid flickering effect
    return null;
  }

  return (
    <>
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
