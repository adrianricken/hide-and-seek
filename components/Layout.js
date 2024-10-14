import { useEffect, useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = styled(({ isShrunk, ...rest }) => <header {...rest} />)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: ${({ isShrunk }) => (isShrunk ? "8vh" : "15vh")};
  left: 0;
  right: 0;
  z-index: 2;
  font-size: 3rem;
  position: fixed;
  background-color: white;
  transition: height 0.3s ease;
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 10vh;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const StyledLink = styled(({ active, ...rest }) => <Link {...rest} />)`
  text-decoration: none;
  font-size: 1.8rem;
  color: ${(props) => (props.active ? "#69af69" : "#336234")};

  &:hover {
    color: #a3d2a3;
  }
`;

const StyledMainLink = styled(({ active, ...rest }) => <Link {...rest} />)`
  text-decoration: none;
  font-size: 2.5rem;
  color: #336234;

  &:hover {
    color: #a3d2a3;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding-top: 15vh; // To account for the header
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
  const hideFooter = router.pathname === "/";
  const [isShrunk, setIsShrunk] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsShrunk(true);
    } else {
      setIsShrunk(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Hide and Seek</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Header isShrunk={isShrunk}>
        <NavLinks>
          <StyledLink href="/about" active={router.pathname === "/about"}>
            About
          </StyledLink>
          <StyledLink href="/parks" active={router.pathname === "/parks"}>
            Parks
          </StyledLink>
          <StyledMainLink href="../" active={router.pathname === "/"}>
            Hide and Seek
          </StyledMainLink>
          <StyledLink href="/events" active={router.pathname === "/events"}>
            Events
          </StyledLink>
          <StyledLink href="/profile" active={router.pathname === "/shop"}>
            Profile
          </StyledLink>
        </NavLinks>
      </Header>
      <Main>{children}</Main>
      {!hideFooter && (
        <Footer>
          <div>2024 Adrian Ricken</div>
        </Footer>
      )}
    </>
  );
}
