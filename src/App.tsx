import Axios from "axios";
import useAxios, { configure } from "axios-hooks";
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import MapComponent from "./components/map/Map";
import { IpifyConfigRequestParams, IpifyResponse } from "./types/Types";
import LRU from "lru-cache";

const IPIFY_API_KEY = "at_61f2wtZVyZAEmqSkhh60ObEIV2wlj";
const IPIFY_END_POINT = "https://geo.ipify.org/api/v2/country,city";
const IPIFY_DEFAULT_PARAMS: IpifyConfigRequestParams = {
  apiKey: IPIFY_API_KEY,
};

const axios = Axios.create({
  baseURL: IPIFY_END_POINT,
});
const cache = new LRU({ max: 10 });

configure({ axios, cache });

// const IP_GEO_CONFIG_REQUEST_PARAMS: IpGeoConfigRequestParams = {
//   apiKey: IP_GEO_API_KEY,
//   fields: "geo,time_zone,isp",
// };

function App() {
  const [ipifyResponse, setIpifyResponse] = useState<IpifyResponse>();
  const [requestIpAddress, setRequestIpAddress] = useState<string>("");
  const [latLng, setLatLng] = useState<number[]>([]);
  // const [isValidCoords, setIsValidCoords] = useState(false);

  const [{ data, loading, error }, refetch] = useAxios<IpifyResponse>({
    params: IPIFY_DEFAULT_PARAMS,
  });
  // const [{ data, loading, error }, refetch] = useAxios('http://ip-api.com/json/')

  // useEffect(() => {
  //   console.log(
  //     "🚀 ~ file: App.tsx ~ line 42 ~ useEffect ~ requestIpAddress",
  //     requestIpAddress
  //   );
  //   const ipAddress = requestIpAddress;

  //   refetch({
  //     params: { ...IPIFY_DEFAULT_PARAMS, ipAddress: ipAddress },
  //   });
  // }, [refetch, requestIpAddress]);

  useEffect(() => {
    console.log("🚀 ~ file: App.tsx ~ line 52 ~ useEffect ~ data", data);
    if (data) {
      setIpifyResponse(data);
      setRequestIpAddress(data.ip);
      setLatLng([data.location.lat, data.location.lng]);
    }
  }, [data]);
  // useEffect(() => {
  //   // async function fetchData() {
  //   //   let response = await getIpApiResponse()
  //   //   console.log("🚀 ~ file: App.tsx ~ line 61 ~ useEffect ~ response", response)
  //   //   // ...
  //   // }
  //   // fetchData()

  //   getIpAddressInfo()
  //     .then((response) => response.data)
  //     .then(setGeoIpResponse)
  //     .catch((error: any) => {
  //       console.error(
  //         "🚀 ~ file: App.tsx ~ line 50 ~ getIpAddressInfo ~ error",
  //         error
  //       );
  //     });
  // }, []);

  // useEffect(() => {
  //   console.log(
  //     "🚀 ~ file: App.tsx ~ line 35 ~ App ~ geoIpResponse",
  //     geoIpResponse
  //   );

  //   setLatLongStr([geoIpResponse?.latitude, geoIpResponse?.longitude]);

  //   const isValidCoords =
  //     !isNaN(parseFloat(geoIpResponse?.latitude)) &&
  //     !isNaN(parseFloat(geoIpResponse?.longitude));
  //   console.log(
  //     "🚀 ~ file: App.tsx ~ line 39 ~ useEffect ~ isValidCoords",
  //     isValidCoords
  //   );
  //   setIsValidCoords(isValidCoords);
  // }, [geoIpResponse]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <>
      <Header
        data={data}
        refetch={refetch}
        refetchParams={IPIFY_DEFAULT_PARAMS}
        // ipifyResponse={ipifyResponse}
        requestIpAddress={requestIpAddress}
        setRequestIpAddress={setRequestIpAddress}
      />

      {latLng.length === 2 && <MapComponent latLng={latLng} />}
    </>
  );
}

export default App;
