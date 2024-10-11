import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = styled.header`
  display: flex;
  position: fixed;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f7f7ee;
  height: 8vh;
  width: 100%;
  z-index: 2;
  font-size: 30px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  transition: color 0.3s ease;

  &:hover {
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding-top: 8vh;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Footer = styled.footer`
  position: relative;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 2vh;
  background-color: #f7f7ee;
  padding: 1rem 0;
  color: #2c4f2c;
  z-index: 2;
`;

export default function Layout({ children }) {
  const router = useRouter();

  const hideHeaderFooter = router.pathname === "/"; // Hier anpassen

  return (
    <>
      <Head>
        <title>Hide and Seek</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      {!hideHeaderFooter && (
        <Header>
          <StyledLink href={"/parks"}>
            <h3>Hide and Seek</h3>
          </StyledLink>
        </Header>
      )}
      <Main>{children}</Main>
      {!hideHeaderFooter && (
        <Footer>
          <div>2024 Adrian Ricken</div>
        </Footer>
      )}
    </>
  );
}
