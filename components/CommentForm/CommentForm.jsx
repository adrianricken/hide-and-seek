import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Modal from "../Modal";
import * as Styled from "./CommentForm.styles";

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
        );
        setCommentToDelete(null); // Reset after delete
      } else {
        throw new Error("Failed to delete the comment.");
      }
    } catch (error) {
      setError(error.message);
    }
    setShowModal(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Styled.InputContainer>
          <Styled.StyledTextarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Write a comment..."
            maxLength={300}
          />
          <Styled.StyledButton type="submit">Submit</Styled.StyledButton>
        </Styled.InputContainer>
        {error && <Styled.StyledError>{error}</Styled.StyledError>}
      </form>

      {comments.length === 0 ? (
        <Styled.NoCommentsDiv>
          <p>No comments yet. Be the first!</p>
        </Styled.NoCommentsDiv>
      ) : (
        <Styled.CommentList>
          {comments.map((comment) => (
            <Styled.CommentContainer key={comment._id}>
              <Styled.Comment key={comment._id}>
                <div style={{ flexGrow: 1 }}>
                  {comment.content}
                  <div>
                    <Styled.StyledSmall>
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
                    </Styled.StyledSmall>
                  </div>
                </div>
              </Styled.Comment>
              {session && session.user.name === comment.userId && (
                <Styled.DeleteButton onClick={() => confirmDelete(comment._id)}>
                  Delete
                </Styled.DeleteButton>
              )}
            </Styled.CommentContainer>
          ))}
        </Styled.CommentList>
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
