import Image from "next/image";
import styled from "styled-components";
import CommentForm from "../Comments/CommentForm";
import { useEffect, useState } from "react";

const IntroSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 93vh;
  background-color: #f5f0ec;
  position: relative;
  margin-top: -8vh;
`;

const IntroImage = styled.div`
  position: relative;
  width: 100vw;
  height: 72%;
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
  margin: 0 0 10px 0;
  text-align: center;
  margin-bottom: 3rem;
  color: ;
`;

const BlockDescription = styled.p`
  display: block;
  margin: 0;
  text-align: center;
`;

const MapSection = styled.section`
  display: flex;
  width: 100%;
  height: 92vh;
  background-color: #f5f0ec;
`;

const LeftContainer = styled.div`
  flex: 1; /* map takes up whole space */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
`;

const RightContainer = styled.div`
  flex: 1; /* Beschreibung nimmt die gesamte untere Hälfte ein */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BlockDescriptionFull = styled.div`
  display: block;
  margin: 0 0 15px 0;
  padding: 5rem;
`;

const OutroSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #f5f0ec;
  position: relative;
`;

const OutroImage = styled.div`
  position: relative;
  width: 100vw;
  height: 50%;
  box-sizing: border-box;
`;

const CommentSection = styled.section`
  flex: 1; /* Kommentare nehmen die untere Hälfte ein */
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledListItem = styled.li`
  list-style: none;
`;

const CommentContainer = styled.div`
  height: auto;
  width: 100%;
  background-color: #cce6cc;
  border-radius: 30px;
  padding: 20px;
  margin-top: 30px;
  overflow: hidden; /* Versteckt überlaufenden Inhalt */
  white-space: normal; /* Ermöglicht Zeilenumbrüche */
  word-wrap: break-word; /* Bricht lange Wörter um */
  text-overflow: ellipsis; /* Zeigt "..." für überlaufenden Text an */
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
          <Image
            src={image}
            fill
            alt={name}
            style={{ objectFit: "cover" }}
            priority={true}
          />
        </IntroImage>
        <IntroTitle>
          <BlockTitle>{name}</BlockTitle>
          <BlockDescription>{description_short}</BlockDescription>
        </IntroTitle>
      </IntroSection>

      <MapSection id="map">
        <LeftContainer>
          {/* Platzhalter für die Karte */}
          <p>Map Placeholder</p>
        </LeftContainer>

        <RightContainer>
          <BlockDescriptionFull>{description}</BlockDescriptionFull>
        </RightContainer>
      </MapSection>

      <OutroSection id="outro">
        <OutroImage>
          <h3>Accessibility:</h3>
          {accessible}
        </OutroImage>
        <Image
          src={secondImage}
          fill
          alt={name}
          style={{ objectFit: "cover" }}
          priority={true}
        />
      </OutroSection>
      <CommentSection id="comments">
        <CommentForm parkId={id} onCommentAdded={handleCommentAdded} />

        <ul>
          {comments.length === 0 ? (
            <StyledListItem>
              <p>No comments yet. Be the first!</p>
            </StyledListItem>
          ) : (
            comments.map((comment) => (
              <StyledListItem key={comment._id}>
                <CommentContainer>
                  <p>{comment.content}</p>
                  <br />
                  <small>
                    {comment.userId},{" "}
                    {new Date(comment.timestamp).toLocaleString()}
                  </small>
                </CommentContainer>
              </StyledListItem>
            ))
          )}
        </ul>
      </CommentSection>
    </Container>
  );
}
