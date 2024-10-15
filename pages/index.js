import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

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
  height: 30vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  object-fit: cover;
  filter: blur(${(props) => props.blurValue}px);
  transition: filter 0.1s ease; /* Schnellerer Übergang */
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
  const router = useRouter();
  const [blurValue, setBlurValue] = useState(2); // Initialer Blur-Wert

  // Event-Handler für die Mausbewegung
  const handleMouseMove = useCallback(
    (e) => {
      const { clientX, clientY } = e;

      // Berechne die Entfernung der Maus von der Mitte des Bildschirms
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const centerX = windowWidth / 2;
      const centerY = windowHeight / 2;

      const distanceX = Math.abs(clientX - centerX);
      const distanceY = Math.abs(clientY - centerY);

      // Berechne die Entfernung vom Mittelpunkt
      const distanceFromCenter = Math.sqrt(
        Math.pow(distanceX, 2) + Math.pow(distanceY, 2)
      );

      // Normalisiere die Entfernung und setze eine Obergrenze für den Blur-Effekt
      const maxDistance = Math.sqrt(
        Math.pow(centerX, 2) + Math.pow(centerY, 2)
      );
      const normalizedDistance = distanceFromCenter / maxDistance;

      // Begrenze den Blur-Wert auf einen Bereich von 0 bis 10
      const newBlurValue = Math.min(normalizedDistance * 15, 10); // Maximaler Blur-Wert ist 10

      // Setze den neuen Blur-Wert, aber nur wenn er sich merklich ändert
      if (Math.abs(newBlurValue - blurValue) > 0.1) {
        setBlurValue(newBlurValue);
      }
    },
    [blurValue]
  );

  useEffect(() => {
    // Füge den Event Listener für die Mausbewegung hinzu
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Entferne den Event Listener, wenn die Komponente unmontiert wird
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <>
      <FullScreenDiv>
        <VideoBackground autoPlay loop muted blurValue={blurValue}>
          <source src="/leaves_cut.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </VideoBackground>
        <MainLink href={"./parks"}>Hide and Seek</MainLink>
      </FullScreenDiv>
    </>
  );
}
