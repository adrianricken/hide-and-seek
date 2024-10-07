import styled from "styled-components";
import Head from "next/head.js";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Profile({ children }) {
  const { data: session } = useSession();

  return (
    <>
      <h1>{session.user.name}</h1>
      <h3>Your favorite parks:</h3>
      <ul></ul>
    </>
  );
}
