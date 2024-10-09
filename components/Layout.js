import styled from "styled-components";
import Head from "next/head.js";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Header = styled.header`
  display: flex;
  position: fixed;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #e5dbcf;
  height: 8%;
  width: 100%;
  z-index: 2;
  font-size: 30px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit; /* Ensures the color stays consistent */
  transition: color 0.3s ease; /* Smooth transition effect */

  &:hover {
    // color: #2c4f2c; /* Change color on hover */
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding-top: 10%;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
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
  height: 20px;
  background-color: #a3d2a3;
  bottom: 0 !important;
  padding: 2rem 0 2rem;
  color: #2c4f2c;
  z-index: 2;
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
        <StyledLink href={"/parks"}>
          <h3>Hide and Seek</h3>
        </StyledLink>
        <nav>
          {!session ? (
            <LogButton onClick={() => signIn()}>Login</LogButton>
          ) : (
            <>
              <Link href={"./profile"}>
                <Image
                  src={session.user.image}
                  alt="User Profile"
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
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
