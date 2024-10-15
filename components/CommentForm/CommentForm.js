import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Modal from "../Modal";
import styled from "styled-components";

// Styled components should be outside the functional component to prevent re-creation
const StyledTextarea = styled.textarea`
  width: calc(100% - 150px); /* Adjust width to leave space for the button */
  height: auto;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 30px;
  border: 1px solid #bab7b6;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const StyledButton = styled.button`
  background-color: #ffff;
  width: 5rem;
  height: 3rem;
  border: 1px solid #69af69;
  color: #69af69;
  border-radius: 2rem;

  &:hover {
    background-color: #a3d2a3;
  }
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Comment = styled.li`
  display: flex;
  justify-content: space-between; /* Space out children to fill the item */
  align-items: center; /* Align items vertically */
  margin-bottom: 1rem;
  background-color: #e8e3e1;
  padding: 20px; /* Add padding inside the border */
  border-radius: 30px;
  color: #336234;
  width: calc(100% - 150px);
  height: auto;
`;

const StyledSmall = styled.small`
  color: #bab7b6;
`;

const DeleteButton = styled.button`
  background-color: #ffff;
  border: none;
  width: 5rem;
  height: 2rem;
  border: 1px solid red;
  border-radius: 2rem;
  color: red;

  &:hover {
    background-color: #e3b6b3;
  }
`;

const NoCommentsDiv = styled.div`
  display: flex;
  justify-content: center;
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
        <InputContainer>
          <StyledTextarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Write a comment..."
          />
          <StyledButton type="submit">Submit</StyledButton>
        </InputContainer>
        {error && <p>{error}</p>}
      </form>

      {comments.length === 0 ? (
        <NoCommentsDiv>
          <p>No comments yet. Be the first!</p>
        </NoCommentsDiv>
      ) : (
        <CommentList>
          {comments.map((comment) => (
            <CommentContainer>
              <Comment key={comment._id}>
                <div style={{ flexGrow: 1 }}>
                  {comment.content}
                  <div>
                    <StyledSmall>
                      {comment.userId},{" "}
                      {new Date(comment.timestamp).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                      ,{" "}
                      {new Date(comment.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </StyledSmall>
                  </div>
                </div>
              </Comment>
              {session && session.user.name === comment.userId && (
                <DeleteButton onClick={() => confirmDelete(comment._id)}>
                  Delete
                </DeleteButton>
              )}
            </CommentContainer>
          ))}
        </CommentList>
      )}

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
