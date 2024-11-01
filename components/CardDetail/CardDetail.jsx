import Image from "next/image";
import CommentForm from "../CommentForm/CommentForm";
import dynamic from "next/dynamic";
import * as Styled from "./CardDetail.styles";

const MapPark = dynamic(() => import("../Maps/MapPark"), {
  ssr: false,
});

export default function CardDetail({
  id,
  name,
  latitude,
  longitude,
  zoomLevel,
  description,
  image,
  accessible,
  description_short,
  secondImage,
  amenities,
}) {
  const formatDescription = (description) => {
    return description.replace(/\n/g, "<br />");
  };

  return (
    <Styled.Container>
      <Styled.IntroSection id="intro">
        <Styled.IntroImage>
          <Image
            src={image}
            fill
            alt={name}
            style={{ objectFit: "cover" }}
            priority={true}
          />
        </Styled.IntroImage>
      </Styled.IntroSection>

      <Styled.Section>
        <Styled.IntroTitle>
          <Styled.BlockTitle>{name}</Styled.BlockTitle>
          <Styled.BlockDescription>
            {description_short}
            <br />
            <br />
            <strong>Accessibility:</strong> {accessible}
          </Styled.BlockDescription>
        </Styled.IntroTitle>
        <MapPark
          latitude={latitude}
          longitude={longitude}
          zoomLevel={zoomLevel}
          amenities={amenities}
        />
      </Styled.Section>

      <Styled.Section id="map">
        <Styled.RightContainer>
          <Styled.BlockDescriptionFull
            dangerouslySetInnerHTML={{ __html: formatDescription(description) }}
          />
        </Styled.RightContainer>
      </Styled.Section>

      <Styled.OutroSection id="outro">
        <Styled.OutroImage>
          <Image
            src={secondImage}
            fill
            alt={name}
            style={{ objectFit: "cover" }}
            priority={true}
          />
        </Styled.OutroImage>
        <Styled.CommentSection id="comments">
          <CommentForm parkId={id} />
        </Styled.CommentSection>
      </Styled.OutroSection>
    </Styled.Container>
  );
}
