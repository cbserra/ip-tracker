import axios, { AxiosResponse } from 'axios'
import Axios from 'axios'
import { SearchKeyType } from '../types/Types'
import {
  IP_API_API_KEY,
  IP_API_BASE_URL,
  IP_API_CONFIG_REQUEST_PARAMS,
  IP_API_RESP_FIELDS,
  IpApiResponse,
} from '../types/IpApiType'
import {
  IPIFY_DEFAULT_PARAMS,
  IPIFY_END_POINT,
  IPIFY_REQUEST_CONFIG,
  IpifyResponse,
} from '../types/IpifyType'
import { IP_GEO_CONFIG_REQUEST_PARAMS, IP_GEO_ENDPOINT } from '../types/IpGeoType'
import { UseAxios, configure, makeUseAxios } from 'axios-hooks'
import LRU from 'lru-cache'
import { IpGeoResponse } from '../types/IpGeoType'
import { GenericResponse } from '../types/GenericResponse'
import { determineDstOffset } from '../types/Types'

export const getIpGeoAddressInfo = async (
  ipOrDnsAddress?: SearchKeyType
): Promise<AxiosResponse<IpGeoResponse, any>> => {
  console.log(`🚀 ~ getIpGeoAddressInfo ~ ipOrDnsAddress:`, ipOrDnsAddress)
  const key = Object.keys(ipOrDnsAddress)[0]
  const ip = ipOrDnsAddress[key]

  let configParams = { ...IP_GEO_CONFIG_REQUEST_PARAMS }
  if (ip) {
    configParams = {
      ...configParams,
      ip: ip,
    }
  }
  const response = await axios.get<IpGeoResponse>(IP_GEO_ENDPOINT, {
    params: configParams,
  })

  console.table(response)

  return response
}

export const getIpApiResponse = async (
  input?: SearchKeyType
): Promise<AxiosResponse<IpApiResponse, any>> => {
  console.log(`🚀 ~ getIpApiResponse ~ input:`, input)
  const key = Object.keys(input)[0]

  const response = await axios.get<IpApiResponse>(IP_API_BASE_URL, {
    url: `/${input[key]}` || '/check',
    method: 'GET',
    params: {
      access_key: IP_API_API_KEY,
      fields: IP_API_RESP_FIELDS.join(','),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    transformResponse: (data: IpApiResponse): GenericResponse => {
      const transResp: GenericResponse = {
        ipAddress: data.ip,
        isp: data.connection.isp,
        latitude: data.latitude,
        longitude: data.longitude,
        location: `${data.city}, ${data.region_code} ${data.zip}`,
        timeZone: determineDstOffset(data.time_zone.gmt_offset, data.time_zone.is_daylight_saving),
      }

      return transResp
    },
  })

  return response
}

export const getIpifyResponse = async (
  input?: SearchKeyType
): Promise<AxiosResponse<IpifyResponse, any>> => {
  const requestKey = Object.keys(input)[0]

  const response = await axios.get<IpifyResponse>(IPIFY_END_POINT, {
    method: 'GET',
    params: {
      ...IPIFY_DEFAULT_PARAMS,
      ...input,
    },
    transformResponse: (data: IpifyResponse): GenericResponse => {
      const transResp: GenericResponse = {
        ipAddress: data.ip,
        isp: data.isp,
        latitude: data.location.lat,
        longitude: data.location.lng,
        location: `${data.location.city}, ${data.location.region} ${data.location.postalCode}`,
        timeZone: data.location.timezone,
      }

      return transResp
    },
  })

  return response
}

export const getIpifyUseAxios = (): UseAxios => {
  const axios = Axios.create({
    ...IPIFY_REQUEST_CONFIG,
    // transformResponse: (data: IpifyResponse): GenericResponse => {
    //   let jsonResp = JSON.stringify(data)
    //   console.log(`🚀 ~ getIpifyUseAxios ~ data:`, data)
    //   console.log(`🚀 ~ getIpifyUseAxios ~ jsonResp:`, jsonResp)
    //   const transResp: GenericResponse = {
    //     ipAddress: data.ip,
    //     isp: data.isp,
    //     // latitude: data.location.lat,
    //     // longitude: data.location.lng,
    //     // location: `${data.location.city}, ${data.location.region} ${data.location.postalCode}`,
    //     // timeZone: data.location.timezone
    //   }

    //   console.log(`🚀 ~ getIpifyUseAxios ~ transResp:`, transResp)

    //   return transResp

    // }
  })

  const cache = new LRU({ max: 10 })
  configure({ axios, cache })

  return makeUseAxios({ axios, cache })
}

export const getIpGeoUseAxios = (): UseAxios => {
  const axios = Axios.create({
    baseURL: IP_GEO_ENDPOINT,
    params: IP_GEO_CONFIG_REQUEST_PARAMS,
  })

  const cache = new LRU({ max: 10 })
  configure({ axios, cache })

  return makeUseAxios({ axios, cache })
}

export const getIpApiUseAxios = (): UseAxios => {
  const axios = Axios.create({
    baseURL: IP_API_BASE_URL,
    params: IP_API_CONFIG_REQUEST_PARAMS,
  })

  const cache = new LRU({ max: 10 })
  configure({ axios, cache })

  return makeUseAxios({ axios, cache })
}
