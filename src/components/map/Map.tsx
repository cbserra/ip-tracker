import L, { LatLng } from "leaflet";

import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import iconLocation from "../../images/icon-location.svg";
import "leaflet/dist/leaflet.css";
import { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";

const Map = (props: { latLng: number[] }) => {
  const [latLong, setLatLong] = useState<LatLng>(
    L.latLng(props.latLng[0], props.latLng[1])
  );
  const mapRef = useRef<LeafletMap>();
  const markerRef = useRef<LeafletMarker>();

  useEffect(() => {
    const localLatLong: LatLng = L.latLng(props.latLng[0], props.latLng[1]);
    console.log(
      "🚀 ~ file: Map.tsx ~ line 15 ~ useEffect ~ localLatLong",
      localLatLong
    );
    setLatLong(localLatLong);
  }, [props.latLng]); //[handleOnFlyTo, props.latLng]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo(latLong, mapRef.current.getZoom(), {
        animate: true,
        duration: 5,
        easeLinearity: 1,
      });
    }

    if (markerRef.current) {
      markerRef.current.setLatLng(latLong);
    }
  }, [latLong]);

  return (
    <>
      <MapContainer
        className="map h-[100vh]"
        center={[0, 0]}
        zoom={13}
        ref={mapRef}
        scrollWheelZoom={false}
        zoomControl={true}
        zoomAnimation={true}
        fadeAnimation={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          icon={L.icon({ iconUrl: iconLocation })}
          draggable={false}
          position={latLong}
          ref={markerRef}
        ></Marker>
      </MapContainer>
    </>
  );
};

export default Map;
