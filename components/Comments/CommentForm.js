import { useState } from "react";
import { useSession } from "next-auth/react";

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
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        placeholder="Write your comment..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
