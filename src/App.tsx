import Axios from "axios";
import useAxios, { configure } from "axios-hooks";
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import MapComponent from "./components/map/Map";
import { IPIFY_DEFAULT_PARAMS, IPIFY_END_POINT, IpifyConfigRequestParams, IpifyResponse } from "./types/Types";
// import { getIpGeoLocationApiInstance } from "./service/IpGeoLocationApi";
// import LRU from "lru-cache";

const apiBaseUrl = IPIFY_END_POINT
const apiParams = IPIFY_DEFAULT_PARAMS

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

  // useEffect(() => {
  //   getIpGeoLocationApiInstance({ipAddress: '1.1.1.1'})
  // }, [])

  return (
    <>
      {data && (
        <Header
          data={data}
          refetch={refetch}
          refetchParams={apiParams}
          loading={loading}
        />
      )}

      {latLng.length === 2 && <MapComponent latLng={latLng} />}
    </>
  );
}

export default App;
