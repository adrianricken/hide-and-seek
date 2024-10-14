import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Modal from "../Modal";
import styled from "styled-components";

// Styled components should be outside the functional component to prevent re-creation
const StyledTextarea = styled.textarea`
  width: 100%;
  height: auto;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
`;

const StyledButton = styled.button`
  background-color: #69af69;
  border: none;
  width: 5rem;
  height: 3rem;
  border-radius: 2rem;

  &:hover {
    background-color: #a3d2a3;
  }
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const DeleteButton = styled.button`
  background-color: #ff6961;
  border: none;
  width: 5rem;
  height: 2rem;
  border-radius: 2rem;
  color: white;

  &:hover {
    background-color: #ff9a9a;
  }
`;

const CommentForm = ({ parkId }) => {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [commentToDelete, setCommentToDelete] = useState(null); // Store comment ID for deletion

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?parkId=${parkId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [parkId]);

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
        userId: session.user.name, // Use session.user.id if available
        parkId,
        content,
      }),
    });

    if (response.ok) {
      const newComment = await response.json();
      setComments([newComment, ...comments]); // Add new comment to the list
      setContent(""); // Clear the input after successful submission
      setError(""); // Clear any error
    } else {
      setError("Failed to submit the comment.");
    }
  };

  const confirmDelete = (commentId) => {
    setCommentToDelete(commentId); // Store the ID of the comment to delete
    setShowModal(true); // Show the modal
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `/api/comments?commentId=${commentToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setComments(
          comments.filter((comment) => comment._id !== commentToDelete)
        ); // Remove the comment from the list
      } else {
        throw new Error("Failed to delete the comment.");
      }
    } catch (error) {
      setError(error.message); // Capture and display error
    }
    setShowModal(false); // Close the modal
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <StyledTextarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="Write a comment..."
        />
        <ButtonContainer>
          <StyledButton type="submit">Submit</StyledButton>
        </ButtonContainer>
        {error && <p>{error}</p>}
      </form>

      <CommentList>
        {comments.map((comment) => (
          <CommentItem key={comment._id}>
            <div>
              <strong>{comment.userId}</strong>: {comment.content}
            </div>
            {session && session.user.name === comment.userId && (
              <DeleteButton onClick={() => confirmDelete(comment._id)}>
                Delete
              </DeleteButton>
            )}
          </CommentItem>
        ))}
      </CommentList>

      {showModal && (
        <Modal
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)} // Close the modal on cancel
        />
      )}
    </>
  );
};

export default CommentForm;
