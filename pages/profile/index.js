import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import Image from "next/image";

const LogButton = styled.button`
  border: none;
  background-color: #aba4a3;
  width: 75px;
  height: 30px;
  border-radius: 20px;
  position: absolute;
  margin-top: 15rem;

  &:hover {
    background-color: #bfb7b6;
  }
`;

const ButtonContainer = styled.div`
  height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfilePictureContainer = styled.div`
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  margin-top: -3rem;
`;

const HeadingContainer = styled.div`
  height: 5rem;
  margin-top: 10rem;
  display: flex;
  justify-content: center;
`;

const FavoritesContainer = styled.div`
  height: 100%;
  margin: 5rem;
`;

const FavoriteParksContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <>
      <nav>
        {!session ? (
          <ButtonContainer>
            <LogButton onClick={() => signIn()}>Login</LogButton>
          </ButtonContainer>
        ) : (
          <>
            <ButtonContainer>
              <LogButton onClick={() => signOut()}>Logout</LogButton>
            </ButtonContainer>
            <ProfilePictureContainer>
              <Image
                src={session.user.image}
                alt="User Profile"
                width={100}
                height={100}
                style={{ borderRadius: "50%" }}
              />
            </ProfilePictureContainer>
            <HeadingContainer>
              <h2>Hello, {session.user.name}</h2>
            </HeadingContainer>
            <FavoritesContainer>
              <br />
              <p>Your favorite parks:</p>
              <FavoriteParksContainer>
                <p>- coming soon-</p>
              </FavoriteParksContainer>
            </FavoritesContainer>
          </>
        )}
      </nav>
    </>
  );
}
