import L, { LatLng } from "leaflet";

import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import iconLocation from "../../images/icon-location.svg";
import "leaflet/dist/leaflet.css";
import { useCallback } from "react";

const MapComponent = (props: { latLng: number[] }) => {
  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);
  const [latLong, setLatLong] = useState<LatLng>(
    L.latLng(props.latLng[0], props.latLng[1])
  );
  const mapRef = useRef();
  const markerRef = useRef();

  // const handleOnFlyTo = useCallback(() => {
  //   const { current = {} } = mapRef;
  //   const { leafletElement: map } = current;

  //   const { current = {} } = markerRef;
  //   const { leafletElement: marker } = current;

  //   map.flyTo(latLong, 14, {
  //     duration: 2,
  //   });
  // }, [latLong]);

  // const LocationMarker = (latLong: LatLng) => {
  //     const [position, setPosition] = useState(null)
  //     const map = useMapEvents({
  //       update() {
  //         setPosition(latLong)
  //         map.flyTo(latLong, map.getZoom())
  //       }
  //       // click() {
  //       //   map.locate()
  //       // },
  //       // locationfound(e) {
  //       //   setPosition(e.latlng)
  //       //   map.flyTo(e.latlng, map.getZoom())
  //       // },
  //     })

  //     return position === null ? null : (
  //       <Marker position={position}>
  //         <Popup>You are here</Popup>
  //       </Marker>
  //     )
  // }

  useEffect(() => {
    // console.log(
    //   "🚀 ~ file: Map.tsx ~ line 12 ~ Map ~ props.latLongStr",
    //   props.latLng
    // );

    const localLatLong: LatLng = L.latLng(props.latLng[0], props.latLng[1]);
    console.log(
      "🚀 ~ file: Map.tsx ~ line 15 ~ useEffect ~ localLatLong",
      localLatLong
    );
    setLatLong(localLatLong);

    // handleOnFlyTo();

    // console.log(
    //   "🚀 ~ file: Map.tsx ~ line 69 ~ useEffect ~ LocationMarker(localLatLong)",
    //   LocationMarker(localLatLong)
    // );
  }, [props.latLng]); //[handleOnFlyTo, props.latLng]);

  return (
    //   <MapContainer center={center} zoom={13}>
    //   <TileLayer
    //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //   />
    //   <Square center={center} size={1000} />
    // </MapContainer>
    <>
      {latLong && (
        <MapContainer
          className="map h-[90vh]"
          center={latLong}
          zoom={13}
          ref={mapRef}
          // scrollWheelZoom={false}
          // zoomControl={true}
        >
          {/* <Map> */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            icon={L.icon({ iconUrl: iconLocation })}
            draggable={true}
            position={latLong}
            ref={markerRef}
          >
            {/* <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup> */}
          </Marker>
          {/* </Map> */}
        </MapContainer>
      )}
    </>
  );
};

export default MapComponent;
