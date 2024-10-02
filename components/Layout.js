import styled from "styled-components";
import Head from "next/head.js";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = styled.header`
  display: flex;
  position: fixed;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: lightgray;
  height: 8%;
  width: 100%;
  z-index: 1;
  font-size: 30px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding-top: 10%;
  position: relative;
  width: 100%;
  height: 100%;
`;

const LogButton = styled.button`
  border: none;
  background-color: transparent;
`;

export default function Layout({ children }) {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Hide and Seek</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <Header>
        <h3>Hide and Seek</h3>
        <nav>
          {!session ? (
            <LogButton onClick={() => signIn()}>Sign In</LogButton>
          ) : (
            <>
              <LogButton onClick={() => signOut({ callbackUrl: "/" })}>
                Sign Out
              </LogButton>{" "}
            </>
          )}
        </nav>
      </Header>
      <Main>{children}</Main>
    </>
  );
}
