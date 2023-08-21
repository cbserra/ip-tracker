import { AxiosRequestConfig } from 'axios'

export type IpifySearchKey = 'ipAddress' | 'domain' | 'email' | 'error'
// export type SearchKeyType = { [key in IpifySearchKey]?: string }

export type IpifyResponse = {
  ip: string
  location: {
    country: string
    region: string
    city: string
    lat: number
    lng: number
    postalCode: string
    timezone: string
    geonameId: number
  }
  domains: string[]
  as: {
    asn: number
    name: string
    route: string
    domain: string
    type: string
  }
  isp: string
}

export type IpifyRequestConfig = {
  baseURL: string
  params: IpifyRequestConfigParams
}

export type IpifyRequestConfigParams = {
  apiKey: string
  ipAddress?: string
  domain?: string
  email?: string
}

export const IPIFY_API_KEY = 'at_7eFMbpI6mnpuFmmUFwnZ5KyD7By1n'
export const IPIFY_END_POINT = 'https://geo.ipify.org/api/v2/country,city'
export const IPIFY_DEFAULT_PARAMS: IpifyRequestConfigParams = {
  apiKey: IPIFY_API_KEY,
}
export const IPIFY_REQUEST_CONFIG: AxiosRequestConfig<IpifyRequestConfig> = {
  baseURL: IPIFY_END_POINT,
  params: {
    ...IPIFY_DEFAULT_PARAMS,
    // },
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  },
}
