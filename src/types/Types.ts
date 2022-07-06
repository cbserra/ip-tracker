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

export type IpifySearchKey = "ipAddress" | "domain" | "email";

export const ipv4RegExPattern =
  "^[0-2]{,1}[0-9]{,2}.[0-2]{,1}[0-9]{,2}.[0-2]{,1}[0-9]{,2}.[0-2]{,1}[0-9]{,2}$";
export const ipV6RegExPattern =
  "^[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}$";
export const hostnameRegExPattern =
  "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$";
export const emailRegExPattern =
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
