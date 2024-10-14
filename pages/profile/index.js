import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const LogButton = styled.button`
  border: none;
  background-color: transparent;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 60rem;
  top: 0;
  right: 0;
`;

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <>
      <nav>
        {!session ? (
          <LogButton onClick={() => signIn()}>Login</LogButton>
        ) : (
          <ProfileContainer>
            <Image
              src={session.user.image}
              alt="User Profile"
              width={100}
              height={100}
              style={{ borderRadius: "50%" }}
            />
            <LogButton onClick={() => signOut()}>Logout</LogButton>
            <br />
          </ProfileContainer>
        )}
      </nav>
      <h3>Your favorite parks:</h3>
    </>
  );
}
