import Image from "next/image";
import styled from "styled-components";
import CommentForm from "../Comments/CommentForm";
import { useEffect, useState } from "react";

const IntroSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #f5f0ec;
  position: relative;
  margin-top: -8vh;
`;

const IntroImage = styled.div`
  position: relative;
  width: 100vw;
  height: 60%;
  box-sizing: border-box;
  margin-top: 8vh;
`;

const IntroTitle = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20rem 0 20rem;
  z-index: 1;
`;

const BlockTitle = styled.h1`
  display: block;
  margin: 0 0 10px 0; /* Abstand nach unten */
  text-align: center; /* Zentrieren */
  margin-bottom: 3rem;
`;

const BlockDescription = styled.p`
  display: block;
  margin: 0;
  text-align: center;
`;

const MapSection = styled.section`
  display: flex;
  width: 100%;
  height: 92vh; /* Höhe der oberen Hälfte */
  background-color: #f5f0ec; /* Hintergrundfarbe */
`;

const LeftContainer = styled.div`
  flex: 1; /* Karte nimmt die gesamte obere Hälfte ein */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc; /* Platzhalterfarbe für die Karte */
`;

const RightContainer = styled.div`
  flex: 1; /* Beschreibung nimmt die gesamte untere Hälfte ein */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BlockDescriptionFull = styled.p`
  display: block;
  margin: 0 0 15px 0;
  padding: 5rem;
`;

const LastSection = styled.section`
  display: flex;
  flex-direction: column; /* Vertikal anordnen */
  width: 100%;
  height: 92vh; /* Höhe der letzten Section */
`;

const ImagePlaceholder = styled.div`
  position: relative;
  width: 100vw;
  height: 50%;
  box-sizing: border-box;
`;

const CommentSection = styled.section`
  flex: 1; /* Kommentare nehmen die untere Hälfte ein */
  padding: 5rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function CardDetail({
  id,
  name,
  description,
  image,
  accessible,
  description_short,
  secondImage,
}) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?parkId=${id}`);
      if (!response.ok) {
        // If the response is not ok, throw an error
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setComments(data); // Update the comments state
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <Container>
      <IntroSection id="intro">
        <IntroImage>
          <Image src={image} fill alt={name} style={{ objectFit: "cover" }} />
        </IntroImage>
        <IntroTitle>
          <BlockTitle>{name}</BlockTitle>
          <BlockDescription>{description_short}</BlockDescription>
        </IntroTitle>
      </IntroSection>

      <MapSection id="map">
        <LeftContainer>
          {/* Platzhalter für die Karte */}
          <h2>Map Placeholder</h2>
        </LeftContainer>

        <RightContainer>
          <BlockDescriptionFull>{description}</BlockDescriptionFull>
          <BlockDescriptionFull>
            <h3>Accessibility:</h3>
            {accessible}
          </BlockDescriptionFull>
        </RightContainer>
      </MapSection>

      <LastSection>
        <ImagePlaceholder>
          <Image
            src={secondImage}
            fill
            alt={name}
            style={{ objectFit: "cover" }}
          />
        </ImagePlaceholder>
        <CommentSection>
          <h3>Post a comment:</h3>
          <CommentForm parkId={id} onCommentAdded={handleCommentAdded} />
          <h3>Comments:</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>
                <p>{comment.content}</p>
                <small>
                  {comment.userId},{" "}
                  {new Date(comment.timestamp).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        </CommentSection>
      </LastSection>
    </Container>
  );
}
