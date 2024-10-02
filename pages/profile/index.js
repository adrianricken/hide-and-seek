import styled from "styled-components";
import Head from "next/head.js";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Profile({ children }) {
  const { data: session } = useSession();
  return (
    <>
      <h1>TEST</h1>
    </>
  );
}
