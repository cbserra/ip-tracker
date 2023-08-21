// import React from 'react'
// import { IPGeolocationAPI } from 'ip-geolocation-api-sdk-typescript'
// import { GeolocationParams } from 'ip-geolocation-api-sdk-typescript/GeolocationParams'

// const API_KEY = '95dccca1a9844e8db47163fe8b88c554'

// type Props = {
//   ipAddress: string
// }

// function handleResponse(json) {
//     console.log(json);
// }

// export const getIpGeoLocationApiInstance = (props: Props) => {
//   const ipAddress = props.ipAddress

//   let api = new IPGeolocationAPI(API_KEY);
//   api.getGeolocation(handleResponse);

//   let geolocationParams = new GeolocationParams();
//   geolocationParams.setIPAddress('1.1.1.1');

//   api.getGeolocation(handleResponse, geolocationParams);

//   // let geolocationParams = new GeolocationParams();
//   // geolocationParams.setIPAddress('1.1.1.1');
//   geolocationParams.setFields('geo,time_zone,currency');

//   api.getGeolocation(handleResponse, geolocationParams);

// }

export {}
