import { useState } from "react";
import { useSession } from "next-auth/react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: 100%;
  height: auto;
  padding: 20px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
`;

const CommentForm = ({ parkId, onCommentAdded }) => {
  const { data: session } = useSession();
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      setError("You must be logged in to submit a comment.");
      return;
    }
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user.name,
        parkId,
        content,
      }),
    });

    if (response.ok) {
      const newComment = await response.json();
      onCommentAdded(newComment); // Notify parent component to update UI
      setContent(""); // Clear the input field
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledTextarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        placeholder="Write a comment..."
      />
      <ButtonContainer>
        <button type="submit">Submit</button>
      </ButtonContainer>
    </form>
  );
};

export default CommentForm;
