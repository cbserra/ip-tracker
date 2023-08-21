export const IP_API_BASE_URL = 'http://api.ipstack.com/'
export const IP_API_API_KEY = 'fb4942756608d75e1436103600f84de4'
export const IP_API_RESP_FIELDS = ['main', 'time_zone', 'connection']

type OutputType = 'json' | 'xml'

export const IP_API_CONFIG_REQUEST_PARAMS: IpApiRequestConfigParams = {
  access_key: IP_API_API_KEY,
  fields: IP_API_RESP_FIELDS.join(','),
}

export interface IpApiRequestConfigParams {
  ip_dns_address?: string
  access_key: string
  fields?: string
  hostname?: number
  security?: number
  language?: string
  callback?: string
  output?: OutputType
}

export interface IpApiResponse {
  ip: string
  hostname: string
  type: string
  continent_code: string
  continent_name: string
  country_code: string
  country_name: string
  region_code: string
  region_name: string
  city: string
  zip: string
  latitude: number
  longitude: number
  location: Location
  time_zone: TimeZone
  currency: Currency
  connection: Connection
  security: Security
}

export interface Location {
  geoname_id: number
  capital: string
  languages: Language[]
  country_flag: string
  country_flag_emoji: string
  country_flag_emoji_unicode: string
  calling_code: string
  is_eu: boolean
}

export interface Language {
  code: string
  name: string
  native: string
}

export interface TimeZone {
  id: string
  current_time: string
  gmt_offset: number
  code: string
  is_daylight_saving: boolean
}

export interface Currency {
  code: string
  name: string
  plural: string
  symbol: string
  symbol_native: string
}

export interface Connection {
  asn: number
  isp: string
}

export interface Security {
  is_proxy: boolean
  proxy_type: any
  is_crawler: boolean
  crawler_name: any
  crawler_type: any
  is_tor: boolean
  threat_level: string
  threat_types: any
}
