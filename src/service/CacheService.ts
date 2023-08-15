import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import wrapper from "axios-cache-plugin"
import { IP_API_BASE_URL, IP_API_API_KEY } from "../types/Types";

 const http = axios.create({
  baseURL: IP_API_BASE_URL,
  withCredentials: false,
})

const httpProxy = wrapper(http, {
  maxCacheSize: 15
})
httpProxy.__addFilter(/check/)

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