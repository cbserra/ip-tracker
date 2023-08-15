import { IncomingHttpStatusHeader } from "http2";

// export interface AxiosResponse<T = any> {
//   // `data` is the response that was provided by the server
//   data: T;

//   // `status` is the HTTP status code from the server response
//   status: number;

//   // `statusText` is the HTTP status message from the server response
//   // As of HTTP/2 status text is blank or unsupported.
//   // (HTTP/2 RFC: https://www.rfc-editor.org/rfc/rfc7540#section-8.1.2.4)
//   statusText: string;

//   // `headers` the HTTP headers that the server responded with
//   // All header names are lower cased and can be accessed using the bracket notation.
//   // Example: `response.headers['content-type']`
//   headers: {};

//   // `config` is the config that was provided to `axios` for the request
//   config: {};

//   // `request` is the request that generated this response
//   // It is the last ClientRequest instance in node.js (in redirects)
//   // and an XMLHttpRequest instance in the browser
//   request: {};
// }

export const IP_GEO_ENDPOINT = "https://api.ipgeolocation.io/ipgeo";
export const IP_GEO_API_KEY = "95dccca1a9844e8db47163fe8b88c554";
export const IP_GEO_CONFIG_REQUEST_PARAMS: IpGeoConfigRequestParams = {
  apiKey: IP_GEO_API_KEY,
  fields: "geo,time_zone,isp",
};

export const IP_API_BASE_URL = "http://api.ipapi.com/api";
export const IP_API_API_KEY = "e0898d0cf1f8c12317f24f9f4b9ae12a";
export const IP_API_RESP_FIELDS = ["main", "time_zone", "connection"];
export const IP_API_CONFIG_REQUEST_PARAMS = {
  access_key: IP_API_API_KEY,
}

export const IPIFY_API_KEY = "at_61f2wtZVyZAEmqSkhh60ObEIV2wlj";
export const IPIFY_END_POINT = "https://geo.ipify.org/api/v2/country,city";
export const IPIFY_DEFAULT_PARAMS: IpifyConfigRequestParams = {
  apiKey: IPIFY_API_KEY,
};

export type SearchKeyType = { [key in IpifySearchKey]?: string };

export type IpifyResponse = {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: number;
  };
  domains: string[];
  as: {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
  };
  isp: string;
};

export interface IpApiResponse {
  query: string;
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
}

export type GetIpifyResponse = {
  config: any;
  data: IpifyResponse;
  headers: any;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
};

export interface TimeZone {
  name: string;
  offset: number;
  current_time: string;
  current_time_unix: number;
  is_dst: boolean;
  dst_savings: number;
}

export interface GeoIpResponse {
  ip: string;
  country_code2: string;
  country_code3: string;
  country_name: string;
  state_prov: string;
  district: string;
  city: string;
  zipcode: string;
  latitude: string;
  longitude: string;
  time_zone: TimeZone;
  isp: string;
}

declare module IpPapiNamespace {
  export interface Language {
    code: string;
    name: string;
    native: string;
  }

  export interface Location {
    geoname_id: number;
    capital: string;
    languages: Language[];
    country_flag: string;
    country_flag_emoji: string;
    country_flag_emoji_unicode: string;
    calling_code: string;
    is_eu: boolean;
  }

  export interface TimeZone {
    id: string;
    current_time: Date;
    gmt_offset: number;
    code: string;
    is_daylight_saving: boolean;
  }

  export interface Currency {
    code: string;
    name: string;
    plural: string;
    symbol: string;
    symbol_native: string;
  }

  export interface Connection {
    asn: number;
    isp: string;
  }

  export interface IpPapiResponse {
    ip: string;
    type: string;
    continent_code: string;
    continent_name: string;
    country_code: string;
    country_name: string;
    region_code: string;
    region_name: string;
    city: string;
    zip: string;
    latitude: number;
    longitude: number;
    location: Location;
    time_zone: TimeZone;
    currency: Currency;
    connection: Connection;
  }
}

export type IpGeoConfigRequestParams = {
  apiKey: string;
  fields?: string;
  ip?: string;
};

export type IpifyConfigRequestParams = {
  apiKey: string;
  ipAddress?: string;
  domain?: string;
  email?: string;
};

export type IpifySearchKey = "ipAddress" | "domain" | "email" | "error";

export const ipv4RegExPattern =
  "^[0-2]{,1}[0-9]{,2}.[0-2]{,1}[0-9]{,2}.[0-2]{,1}[0-9]{,2}.[0-2]{,1}[0-9]{,2}$";
export const ipV6RegExPattern =
  "^[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}$";
export const hostnameRegExPattern =
  "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$";
export const emailRegExPattern =
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

// In case I need to use a different API which doesn't format the DST offset.
const determineDstOffset = (
  offset: number,
  isDst: boolean,
  dstSavings: number
) => {
  const currentOffset = offset + (isDst ? dstSavings : 0);

  if (currentOffset === 0) {
    return "00:00";
  }

  const fractionalMinutes = currentOffset % 1;
  const minutes = Math.floor(fractionalMinutes * 60);
  const formattedMinutes = zeroPadIfNeeded(minutes);
  const formattedHours = zeroPadIfNeeded(Math.floor(Math.abs(currentOffset)));

  const formattedOffset =
    (currentOffset < 0 ? "-" : "") + formattedHours + ":" + formattedMinutes;

  return formattedOffset;

  function zeroPadIfNeeded(value: number): string {
    return (value < 10 ? "0" : "").concat(Math.floor(value).toString());
  }
};

export interface IpTrackerResponse {
  searchKey: IpifySearchKey;
  searchValue: string;
  ipAddress: string;
  location: string;
  timeZone: string;
  isp: string;
  lat: number;
  lng: number;
}
