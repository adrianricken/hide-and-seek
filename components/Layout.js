import styled from "styled-components";
import Head from "next/head.js";

const Header = styled.header`
  display: flex;
  positon: fixed;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 10%;
  margin-top: 50px;
  font-size: 50px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  padding: 0.5rem;
  position: relative;
  width: 100%;
  height: 100%;
`;

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Hide and Seek</title>
        <link rel="icon" href="../public/favicon.ico" type="image/x-icon" />
      </Head>
      <Header>Hide and Seek</Header>
      <Main>{children}</Main>
    </>
  );
}
