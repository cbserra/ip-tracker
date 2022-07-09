import Axios from "axios";
import useAxios, { configure } from "axios-hooks";
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import MapComponent from "./components/map/Map";
import {
  IpifyConfigRequestParams,
  IpifyResponse,
  IpTrackerResponse,
} from "./types/Types";
import LRU from "lru-cache";

const IPIFY_API_KEY = "at_V78ozgFV7TkXKnnzzhkTH8iRUlQIS";
const IPIFY_END_POINT = "https://geo.ipify.org/api/v2/country,city";
const IPIFY_DEFAULT_PARAMS: IpifyConfigRequestParams = {
  apiKey: IPIFY_API_KEY,
};

const axios = Axios.create({
  baseURL: IPIFY_END_POINT,
  params: IPIFY_DEFAULT_PARAMS,
});
const cache = new LRU({ max: 10 });

configure({ axios, cache });

// const IP_GEO_CONFIG_REQUEST_PARAMS: IpGeoConfigRequestParams = {
//   apiKey: IP_GEO_API_KEY,
//   fields: "geo,time_zone,isp",
// };

function App() {
  // const [ipifyResponse, setIpifyResponse] = useState<IpifyResponse>();
  const [requestIpAddress, setRequestIpAddress] = useState<string>("");
  const [latLng, setLatLng] = useState<number[]>([]);
  // const [isValidCoords, setIsValidCoords] = useState(false);

  const [{ data, loading, error, response }, refetch] = useAxios<IpifyResponse>(
    {}
  );

  let inputValue: string;
  useEffect(() => {
    if (response) {
      console.debug(
        "🚀 ~ file: App.tsx ~ line 45 ~ useEffect ~ response",
        response
      );
      let inputValue = requestIpAddress;
      if (response.config.params.email?.length > 0) {
        inputValue = response.config.params.email;
      } else if (response.config.params.domain?.length > 0) {
        inputValue = response.config.params.domain;
      } else if (response.config.params.ip?.length > 0) {
        inputValue = response.config.params.ip;
      }

      // setRequestIpAddress(inputValue);
    }

    if (data) {
      console.debug("🚀 ~ file: App.tsx ~ line 63 ~ useEffect ~ data", data);
      // setIpifyResponse(data);
      if (!inputValue) {
        inputValue = data.ip;
      }
      setLatLng([data.location.lat, data.location.lng]);
    }

    console.log(
      "🚀 ~ file: App.tsx ~ line 67 ~ useEffect ~ inputValue",
      inputValue
    );
    setRequestIpAddress(inputValue);
  }, [data]);

  // useEffect(() => {
  //   if (response) {
  //     console.log(
  //       "🚀 ~ file: App.tsx ~ line 47 ~ useEffect ~ response",
  //       response
  //     );
  //     let inputValue = requestIpAddress;
  //     if (response.config.params.email?.length > 0) {
  //       inputValue = response.config.params.email;
  //     } else if (response.config.params.domain?.length > 0) {
  //       inputValue = response.config.params.domain;
  //     } else if (response.config.params.ip?.length > 0) {
  //       inputValue = response.config.params.ip;
  //     }

  //     setRequestIpAddress(inputValue);
  //     console.log(
  //       "🚀 ~ file: App.tsx ~ line 67 ~ useEffect ~ inputValue",
  //       inputValue
  //     );
  //   }
  // }, [response]);

  // useEffect(() => {
  //   console.error("🚀 ~ file: App.tsx ~ line 36 ~ App ~ error", error);
  // }, [error]);

  // useEffect(() => {
  //   console.debug("🚀 ~ file: App.tsx ~ line 36 ~ App ~ loading", loading);
  // }, [loading]);

  // useEffect(() => {
  //   console.debug("🚀 ~ file: App.tsx ~ line 36 ~ App ~ response", response);
  // }, [response]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error!</div>;
  // }

  return (
    <>
      <Header
        data={data}
        refetch={refetch}
        refetchParams={IPIFY_DEFAULT_PARAMS}
        requestIpAddress={requestIpAddress}
        setRequestIpAddress={setRequestIpAddress}
        loading={loading}
      />

      {latLng.length === 2 && <MapComponent latLng={latLng} />}
    </>
  );
}

export default App;
