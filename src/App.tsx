import Axios from "axios";
import useAxios, { configure } from "axios-hooks";
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import MapComponent from "./components/map/Map";
import { IpifyConfigRequestParams, IpifyResponse } from "./types/Types";
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
  const [latLng, setLatLng] = useState<number[]>([]);

  const [{ data, loading, error, response }, refetch] = useAxios<IpifyResponse>(
    {}
  );

  useEffect(() => {
    if (data) {
      console.debug("🚀 ~ file: App.tsx ~ line 63 ~ useEffect ~ data", data);
      setLatLng([data.location.lat, data.location.lng]);
    }
  }, [data, response]);

  return (
    <>
      {data && (
        <Header
          data={data}
          refetch={refetch}
          refetchParams={IPIFY_DEFAULT_PARAMS}
          loading={loading}
        />
      )}

      {latLng.length === 2 && <MapComponent latLng={latLng} />}
    </>
  );
}

export default App;
