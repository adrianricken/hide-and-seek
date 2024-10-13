import MapBerlin from "@/components/Maps/MapBerlin";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{session.user.name}</h1>
      <h3>Your favorite parks:</h3>
      <ul></ul>
    </>
  );
}
