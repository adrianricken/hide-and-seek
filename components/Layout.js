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

  @media (max-width: 770px) {
    display: none; /* Verstecke Links ab 770px abwärts */
  }
`;

const DropdownContainer = styled.div`
  display: none;

  @media (max-width: 770px) {
    display: flex;
    align-items: center;
    position: relative;
  }
`;

const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #336234;

  &:hover {
    color: #69af69;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  padding: 0;
  margin: 0;
  list-style-type: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;

  li {
    padding: 0.5rem 1rem;
    text-align: left;

    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

const StyledLink = styled(({ active, ...rest }) => <Link {...rest} />)`
  text-decoration: none;
  font-size: 1.5rem;
  color: ${(props) => (props.active ? "#69af69" : "#336234")};

  &:hover {
    color: #a3d2a3;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding-top: 15vh;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export default function Layout({ children }) {
  const router = useRouter();
  const [isShrunk, setIsShrunk] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        {/* Normale Navigation, die nur auf großen Bildschirmen angezeigt wird */}
        <NavLinks>
          <StyledLink href="/about" active={router.pathname === "/about"}>
            About
          </StyledLink>
          <StyledLink href="/parks" active={router.pathname === "/parks"}>
            Parks
          </StyledLink>

          <StyledLink href="/">Hide and Seek</StyledLink>

          <StyledLink href="/events" active={router.pathname === "/events"}>
            Events
          </StyledLink>
          <StyledLink href="/profile" active={router.pathname === "/profile"}>
            Profile
          </StyledLink>
        </NavLinks>

        {/* Dropdown für kleine Bildschirme */}
        <DropdownContainer>
          <DropdownButton onClick={() => setDropdownOpen(!dropdownOpen)}>
            Hide and Seek
          </DropdownButton>
          {dropdownOpen && (
            <DropdownMenu>
              <li>
                <StyledLink href="/about" active={router.pathname === "/about"}>
                  About
                </StyledLink>
              </li>
              <li>
                <StyledLink href="/parks" active={router.pathname === "/parks"}>
                  Parks
                </StyledLink>
              </li>
              <li>
                <StyledLink
                  href="/events"
                  active={router.pathname === "/events"}
                >
                  Events
                </StyledLink>
              </li>
              <li>
                <StyledLink
                  href="/profile"
                  active={router.pathname === "/profile"}
                >
                  Profile
                </StyledLink>
              </li>
            </DropdownMenu>
          )}
        </DropdownContainer>
      </Header>
      <Main>{children}</Main>
    </>
  );
}
