import axios, { AxiosPromise, AxiosResponse } from "axios";
import {
  GeoIpResponse,
  GetIpifyResponse,
  IpApiResponse,
  IpGeoConfigRequestParams,
  IpifyResponse,
} from "../types/Types";
import wrapper from "axios-cache-plugin";
import { setupCache } from "axios-cache-adapter";

const IP_GEO_ENDPOINT = "https://api.ipgeolocation.io/ipgeo";
const IP_GEO_API_KEY = "449eae68ae1e4463844bfe33e3d1f71f";

const IP_API_BASE_URL = "http://api.ipapi.com/api";
const IP_API_API_KEY = "e0898d0cf1f8c12317f24f9f4b9ae12a";
const IP_API_RESP_FIELDS = ["main", "time_zone", "connection"];

const IP_GEO_CONFIG_REQUEST_PARAMS: IpGeoConfigRequestParams = {
  apiKey: IP_GEO_API_KEY,
  fields: "geo,time_zone,isp",
};

export const getIpAddressInfo = async (ipOrDnsAddress?: string) => {
  let configParams = { ...IP_GEO_CONFIG_REQUEST_PARAMS };
  if (ipOrDnsAddress) {
    configParams = {
      ...configParams,
      ip: ipOrDnsAddress,
    };
  }
  const response = await axios.get<GeoIpResponse>(IP_GEO_ENDPOINT, {
    params: configParams,
  });

  console.table(response);

  return response;

  // console.log("🚀 ~ file: App.tsx ~ line 16 ~ getIpAddressInfo ~ data", data)
  // setGetIpifyResponse(data)
  // setIpifyResponse(data.data)
  // return data
  // setInputIpAddress(ipifyResponse?.ip || '')
};

// const http = axios.create({
//   baseURL: IP_API_BASE_URL,
//   withCredentials: false,
// })

// const httpProxy = wrapper(http, {
//   maxCacheSize: 15
// })
// httpProxy.__addFilter(/check/)

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
  adapter: cache.adapter,
});

export const testCache = async () => {
  // Send a GET request to some REST api
  api({
    url: IP_API_BASE_URL + "/check",
    params: {
      access_key: IP_API_API_KEY,
      //  'fields': IP_API_RESP_FIELDS.join(',')
    },
    method: "get",
  }).then(async (response) => {
    // Do something fantastic with response.data \o/
    console.log("Request response:", response);

    // Interacting with the store, see `localForage` API.
    const store = await cache.store;

    console.log("Cache store:", JSON.stringify(store));
  });
};

// export const getIpApiResponse = async (): Promise<AxiosResponse<IpApiResponse, any>> => {
//   let resp = await http({
//     url: '/check/',
//     method: 'GET',
//     params: {
//       'access_key': IP_API_API_KEY,
//       // 'fields': IP_API_RESP_FIELDS.join(',')
//     }
//   })

//   console.log("🚀 ~ file: GeoIpService.tsx ~ line 30 ~ getIpApiResponse ~ httpProxy", httpProxy.__cacher.cacheMap)

//   return resp

// }

// const IPIFY_ENDPOINT = 'https://geo.ipify.org/api/v2/country,city'
// const IPIFY_API_KEY = 'at_b5Mpsni3uchxBwpMFtzrCgM0dclIk'

// export const GetIpAddressInfo = async (): Promise<string | IpifyResponse> => {
//     try {
//         const {data, status} = await axios.get<GetIpifyResponse>(IPIFY_ENDPOINT, {params: {'apiKey': IPIFY_API_KEY}})
//         console.log(JSON.stringify(data, null, 4));

//         console.log('response status is: ', status);

//         return data.data
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.log('error message: ', error.message);
//             return error.message;
//           } else {
//             console.log('unexpected error: ', error);
//             return 'An unexpected error occurred';
//           }
//       }
// }
