import Link from "next/link";

// Language: German option

export default function HomePage() {
  return (
    <>
      <p>
        Hide and Seek is an interactive web platform designed to showcase the
        parks of Berlin, providing users with comprehensive information about
        amenities, nearby shops, and upcoming events. Users can easily browse
        through a curated list of parks, filter options based on specific
        features, and search for parks by name. Each park is presented in a
        detailed view, offering insights into available activities and local
        attractions.
      </p>
      <Link href={"./parks"}>BERLIN</Link>
    </>
  );
}
