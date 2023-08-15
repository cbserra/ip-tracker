import axios, { AxiosResponse } from "axios";
import Axios from "axios";
import { IPIFY_DEFAULT_PARAMS, IPIFY_END_POINT, IP_API_API_KEY, IP_API_BASE_URL, IP_API_CONFIG_REQUEST_PARAMS, IP_API_RESP_FIELDS, IP_GEO_CONFIG_REQUEST_PARAMS, IP_GEO_ENDPOINT, IpApiResponse, SearchKeyType } from "../types/Types";
import { setupCache } from "axios-cache-adapter";
import { UseAxios, configure, makeUseAxios } from "axios-hooks";
import LRU from "lru-cache";
import { IpGeoResponse } from "../types/IpGeoType";

// const cache = new LRU({ max: 10 });

export const getIpGeoAddressInfo = async (ipOrDnsAddress?: string): Promise<AxiosResponse<IpGeoResponse, any>> => {
  let configParams = { ...IP_GEO_CONFIG_REQUEST_PARAMS };
  if (ipOrDnsAddress) {
    configParams = {
      ...configParams,
      ip: ipOrDnsAddress,
    };
  }
  const response = await axios.get<IpGeoResponse>(IP_GEO_ENDPOINT, {
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

export const getIpApiResponse = async (input?: string): Promise<AxiosResponse<IpApiResponse, any>> => {
  const response = await axios.get<IpApiResponse>(IP_API_BASE_URL, { 
    url: `/${input}` || '/check',
    method: 'GET',
    params: {
      'access_key': IP_API_API_KEY,
      'fields': IP_API_RESP_FIELDS.join(',')
    }
  })

  return response

}

export const getIpifyResponse = async (input?: SearchKeyType): Promise<AxiosResponse<IpApiResponse, any>> => {
  const requestKey = Object.keys(input)[0]

    const response = await axios.get<IpApiResponse>(IPIFY_END_POINT, { 
    method: 'GET',
    params: {
      ...IPIFY_DEFAULT_PARAMS,
      [requestKey]: input[requestKey]
      // 'access_key': IP_API_API_KEY,
      // 'fields': IP_API_RESP_FIELDS.join(',')
    }
  })

  return response
}

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

export const getIpifyUseAxios = (): UseAxios => {
  const axios = Axios.create({
    baseURL: IPIFY_END_POINT,
    params: IPIFY_DEFAULT_PARAMS,
  });

  const cache = new LRU({ max: 10 });
  configure({ axios, cache });

  return makeUseAxios({ axios, cache });
}

export const getIpGeoUseAxios = (): UseAxios => {
  const axios = Axios.create({
    baseURL: IP_GEO_ENDPOINT,
    params: IPIFY_DEFAULT_PARAMS,
  });

  const cache = new LRU({ max: 10 });
  configure({ axios, cache });

  return makeUseAxios({ axios, cache });
}

export const getIpApiUseAxios = (): UseAxios => {
  const axios = Axios.create({
    baseURL: IP_API_BASE_URL,
    params: IP_API_CONFIG_REQUEST_PARAMS,
  });

  const cache = new LRU({ max: 10 });
  configure({ axios, cache });

  return makeUseAxios({ axios, cache });
}