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

const Footer = styled.footer`
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: #a3d2a3;
  bottom: 0 !important;
  padding: 2rem 0 2rem;
  color: #2c4f2c;
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
        <Link href={"/parks"}>
          <h3>Hide and Seek</h3>
        </Link>
        <nav>
          {!session ? (
            <LogButton onClick={() => signIn()}>Login</LogButton>
          ) : (
            <>
              <Link href={"./profile"}>
                <img
                  src={session.user.image}
                  alt="User Profile"
                  style={{
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                  }}
                />
              </Link>
              <LogButton onClick={() => signOut({ callbackUrl: "/" })}>
                Logout
              </LogButton>{" "}
            </>
          )}
        </nav>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <div>2024 Adrian Ricken</div>
      </Footer>
    </>
  );
}
