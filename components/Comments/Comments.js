import styled from "styled-components";
import useSWR from "swr";
import { useRouter } from "next/router.js";

export default function Comments() {
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate } = useSWR(`/api/places/${id}`);

  async function handleSubmitComment(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const commentData = Object.fromEntries(formData);

    const response = await fetch(`/api/places/${id}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
      mutate();
      e.target.reset();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }
  const comments = data?.comments;

  async function handleDeleteComment(commentId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDelete) {
      const response = await fetch(`/api/places/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ commentId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        mutate();
      } else {
        console.error("Failed to delete comment");
      }
    }
  }

  return (
    <div>
      {comments && comments.length > 0 ? (
        <>
          <h1>
            {`${comments.length} fan${
              comments.length === 1 ? "" : "s"
            } commented on this place:`}
          </h1>
          {comments.map(({ _id, name, comment }) => (
            <div key={_id}>
              <p>
                <strong>{session.user.name}</strong>
              </p>
              <span>{comment}</span>
              <br />
              <button onClick={() => handleDeleteComment(_id)}>❌</button>
            </div>
          ))}
        </>
      ) : (
        <p>No comments yet. Be the first!</p>
      )}
      <div onSubmit={handleSubmitComment}>
        <label htmlFor="comment">Your Comment</label>
        <input type="text" name="comment" placeholder="comment here..." />
        <button type="submit">Send</button>
      </div>
    </div>
  );
}
