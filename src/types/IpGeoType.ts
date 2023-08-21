export const IP_GEO_ENDPOINT = 'https://api.ipgeolocation.io/ipgeo'
export const IP_GEO_API_KEY = '95dccca1a9844e8db47163fe8b88c554'
export const IP_GEO_CONFIG_REQUEST_PARAMS: IpGeoConfigRequestParams = {
  apiKey: IP_GEO_API_KEY,
  // fields: "geo,time_zone,isp",
}

export interface IpGeoResponse {
  ip: string
  hostname: string
  continent_code: string
  continent_name: string
  country_code2: string
  country_code3: string
  country_name: string
  country_capital: string
  state_prov: string
  district: string
  city: string
  zipcode: string
  latitude: string
  longitude: string
  is_eu: boolean
  calling_code: string
  country_tld: string
  languages: string
  country_flag: string
  geoname_id: string
  isp: string
  connection_type: string
  organization: string
  asn: string
  currency: Currency
  time_zone: TimeZone
}

export interface Currency {
  code: string
  name: string
  symbol: string
}

export interface TimeZone {
  name: string
  offset: number
  current_time: string
  current_time_unix: number
  is_dst: boolean
  dst_savings: number
}

export type IpGeoConfigRequestParams = {
  apiKey: string
  fields?: string
  ip?: string
}
