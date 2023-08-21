import { IpifySearchKey } from './IpifyType'

export type SearchKeyType = { [key in IpifySearchKey]?: string }
export interface Language {
  code: string
  name: string
  native: string
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

export interface TimeZone {
  id: string
  current_time: Date
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

export interface IpPapiResponse {
  ip: string
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
}

export const ipv4RegExPattern =
  '^[0-2]{,1}[0-9]{,2}.[0-2]{,1}[0-9]{,2}.[0-2]{,1}[0-9]{,2}.[0-2]{,1}[0-9]{,2}$'
export const ipV6RegExPattern =
  '^[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}$'
export const hostnameRegExPattern =
  '^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$'
export const emailRegExPattern =
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"

// In case I need to use a different API which doesn't format the DST offset.
export const determineDstOffset = (offset: number, isDst: boolean, dstSavings?: number) => {
  const currentOffset = offset + (isDst ? dstSavings || 1 : 0)

  if (currentOffset === 0) {
    return '00:00'
  }

  const fractionalMinutes = currentOffset % 1
  const minutes = Math.floor(fractionalMinutes * 60)
  const formattedMinutes = zeroPadIfNeeded(minutes)
  const formattedHours = zeroPadIfNeeded(Math.floor(Math.abs(currentOffset)))

  const formattedOffset = (currentOffset < 0 ? '-' : '') + formattedHours + ':' + formattedMinutes

  return formattedOffset

  function zeroPadIfNeeded(value: number): string {
    return (value < 10 ? '0' : '').concat(Math.floor(value).toString())
  }
}

export interface IpTrackerResponse {
  searchKey: SearchKeyType
  searchValue: string
  ipAddress: string
  location: string
  timeZone: string
  isp: string
  lat: number
  lng: number
}
