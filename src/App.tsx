import Axios from "axios";
import useAxios, { configure } from "axios-hooks";
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import MapComponent from "./components/map/Map";
import { IPIFY_DEFAULT_PARAMS, IPIFY_END_POINT, IP_GEO_CONFIG_REQUEST_PARAMS, IpifyConfigRequestParams, IpifyResponse } from "./types/Types";
import { IpGeoResponse } from "./types/IpGeoType";
import { getIpGeoUseAxios } from "./service/GeoIpService";
// import { getIpGeoLocationApiInstance } from "./service/IpGeoLocationApi";
// import LRU from "lru-cache";

// const apiBaseUrl = IPIFY_END_POINT
// console.log(`🚀 ~ apiBaseUrl:`, apiBaseUrl)
const apiParams = IP_GEO_CONFIG_REQUEST_PARAMS
console.log(`🚀 ~ apiParams:`, apiParams)

function App() {
  const [latLng, setLatLng] = useState<number[]>([]);
  const useAxios = getIpGeoUseAxios();
  const [{ data, loading, error, response }, refetch] = useAxios<IpGeoResponse>({})

  useEffect(() => {
    console.log(`🚀 ~ App ~ loading:`, loading)  
    console.log(`🚀 ~ App ~ error:`, error)
    console.log(`🚀 ~ App ~ response:`, response)
  }, [error, loading, response])

  useEffect(() => {
    if (data) {
      console.debug("🚀 ~ file: App.tsx ~ line 63 ~ useEffect ~ data", data);
      // setLatLng([data.location.lat, data.location.lng]);
      setLatLng([parseFloat(data.latitude), parseFloat(data.longitude)]);
    }
  }, [data, response]);

  // useEffect(() => {
  //   getIpGeoLocationApiInstance({ipAddress: '1.1.1.1'})
  // }, [])

  return (
    <>
      {data && (
        <Header
          axiosError={error}
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
