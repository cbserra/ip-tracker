import L, { LatLng } from "leaflet";

import { useEffect, useRef, useState } from "react";
import {
  // Map,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import iconLocation from "../../images/icon-location.svg";
import "leaflet/dist/leaflet.css";
import { useCallback } from "react";
import { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";

const Map = (props: { latLng: number[] }) => {
  const [latLong, setLatLong] = useState<LatLng>(
    L.latLng(props.latLng[0], props.latLng[1])
  );
  const mapRef = useRef<LeafletMap>();
  const markerRef = useRef<LeafletMarker>();

  // const handleOnFlyTo = useCallback(() => {
  //   const { current = {} } = mapRef;
  //   const { leafletElement: map } = current;

  //   const { current = {} } = markerRef;
  //   const { leafletElement: marker } = current;

  //   map.flyTo(latLong, 14, {
  //     duration: 2,
  //   });
  // }, [latLong]);

  useEffect(() => {
    const localLatLong: LatLng = L.latLng(props.latLng[0], props.latLng[1]);
    console.log(
      "🚀 ~ file: Map.tsx ~ line 15 ~ useEffect ~ localLatLong",
      localLatLong
    );
    setLatLong(localLatLong);

    // if (mapRef.current) {
    //   mapRef.current.flyTo(localLatLong, mapRef.current.getZoom());
    // }

    // if (markerRef.current) {
    //   markerRef.current.setLatLng(localLatLong);
    // }
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
      {/* {latLong && ( */}
      <MapContainer
        className="map h-[100vh]"
        // center={latLong}
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
        >
          {/* <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup> */}
        </Marker>
      </MapContainer>
      {/* )} */}
    </>
  );
};

export default Map;
