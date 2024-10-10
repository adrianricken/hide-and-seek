import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const CommentForm = ({ parkId }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]); // State to hold comments

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments/${parkId}/comments`);
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments); // Set the fetched comments to state
        }
      } catch (error) {
        console.error("Failed to load comments:", error);
      }
    };

    fetchComments();
  }, [parkId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parkId, content: comment }),
    });

    if (res.ok) {
      const newComment = await res.json(); // Assuming the API returns the new comment
      setComments((prevComments) => [...prevComments, newComment]); // Update the comments list
      setComment(""); // Clear the input field
    } else {
      console.error("Failed to post comment");
    }
  };

  if (!session) return <p>You must be logged in to post a comment.</p>;

  return (
    <>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>{comment.content}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comment..."
          required
        />
        <button type="submit">Post</button>
      </form>
    </>
  );
};

export default CommentForm;
