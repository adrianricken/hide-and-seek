import { useState } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import styled from "styled-components";

const climbingIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/6162/6162025.png",
  iconSize: [30, 30],
});

const volleyballIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/6162/6162025.png",
  iconSize: [30, 30],
});

const playgroundIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/6162/6162025.png",
  iconSize: [30, 30],
});

const tableTennisIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/6162/6162025.png",
  iconSize: [30, 30],
});

const footballIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/6162/6162025.png",
  iconSize: [30, 30],
});

const skatingIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/6162/6162025.png",
  iconSize: [30, 30],
});

const basketballIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/6162/6162025.png",
  iconSize: [30, 30],
});

const LevelContainer = styled.div`
  z-index: 100;
  box-sizing: border-box;
  height: fit-content;
`;

export default function MapVolksparkFriedrichshain() {
  return (
    <>
      <LevelContainer>
        <MapContainer center={[52.52741, 13.4324]} zoom={16}>
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <TileLayer url="https://tile.jawg.io/1ca2be1b-3c2c-4d66-bbf6-82bcad84a98a/{z}/{x}/{y}{r}.png?access-token=OCQMFeqjmuIUfZ9XUmVpkiFgeLCwveHnhg78w316UnrCDNpitbJ0Xus26IF0J4WW" />
          <Marker position={[52.528103, 13.441276]} icon={climbingIcon}>
            <Popup>Climbing</Popup>
          </Marker>
          <Marker position={[52.528662, 13.441593]} icon={volleyballIcon}>
            <Popup>Beach volleyball</Popup>
          </Marker>
          <Marker position={[52.526539, 13.428662]} icon={playgroundIcon}>
            <Popup>Playground</Popup>
          </Marker>
          <Marker position={[52.527541, 13.430907]} icon={playgroundIcon}>
            <Popup>Playground</Popup>
          </Marker>
          <Marker position={[52.528523, 13.43239]} icon={tableTennisIcon}>
            <Popup>Table tennis</Popup>
          </Marker>
          <Marker position={[52.527779, 13.434509]} icon={tableTennisIcon}>
            <Popup>Table tennis</Popup>
          </Marker>
          <Marker position={[52.527779, 13.434509]} icon={footballIcon}>
            <Popup>Football</Popup>
          </Marker>
          <Marker position={[52.528644, 13.432041]} icon={skatingIcon}>
            <Popup>Skating</Popup>
          </Marker>
          <Marker position={[52.528689, 13.432487]} icon={basketballIcon}>
            <Popup>Basketbabll</Popup>
          </Marker>
          <Marker position={[52.528689, 13.432835]} icon={footballIcon}>
            <Popup>Football</Popup>
          </Marker>
        </MapContainer>
      </LevelContainer>
    </>
  );
}
