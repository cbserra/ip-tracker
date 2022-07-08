import { AxiosPromise, AxiosRequestConfig } from "axios";
import { RefetchOptions } from "axios-hooks";
import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ReactComponent as Arrow } from "../../images/icon-arrow.svg";
import {
  emailRegExPattern,
  IpGeoConfigRequestParams,
  IpifyConfigRequestParams,
  IpifyResponse,
  IpifySearchKey,
} from "../../types/Types";
import {
  ipV6RegExPattern,
  ipv4RegExPattern,
  hostnameRegExPattern,
} from "../../types/Types";

const IPV4_REGEX = new RegExp(ipv4RegExPattern);
const IPV6_REGEX = new RegExp(ipV6RegExPattern);
const HOSTNAME_REGEX = new RegExp(hostnameRegExPattern);
const EMAIL_REGEX = new RegExp(emailRegExPattern);

const Header = (props: {
  data: IpifyResponse;
  refetch: (
    config?: AxiosRequestConfig<any>,
    options?: RefetchOptions
  ) => AxiosPromise<any>;
  refetchParams: IpifyConfigRequestParams;
  requestIpAddress: string;
  setRequestIpAddress: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const refetch = props.refetch;
  const refetchParams = props.refetchParams;
  const localIpifyResponse = useRef<IpifyResponse>(props.data);
  const requestIpAddress = props.requestIpAddress;
  const setRequestIpAddress = props.setRequestIpAddress;
  const [inputIpAddress, setInputIpAddress] =
    useState<string>(requestIpAddress);
  const [validSearchInput, toggleValidSearchInput] = useState(false);

  useEffect(() => {
    localIpifyResponse.current = props.data;
    if (localIpifyResponse.current?.ip) {
      setRequestIpAddress(localIpifyResponse.current.ip);
      setInputIpAddress(localIpifyResponse.current.ip);
    }
  }, [props.data, setRequestIpAddress]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputIpAddress(event.target.value);
  };

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("🚀 ~ file: Header.tsx ~ line 78 ~ event", event);
      // setRequestIpAddress(inputIpAddress);
      console.log(
        "🚀 ~ file: Header.tsx ~ line 81 ~ handleClick ~ inputIpAddress",
        inputIpAddress
      );
      type SearchKeyType = { [key in IpifySearchKey]?: string };
      let searchParam: SearchKeyType = {};
      if (IPV4_REGEX.test(inputIpAddress) || IPV6_REGEX.test(inputIpAddress)) {
        console.log(
          "🚀 ~ file: Header.tsx ~ line 88 ~ handleClick ~ inputIpAddress matches IP",
          inputIpAddress
        );
        searchParam = { ipAddress: inputIpAddress };
      } else if (EMAIL_REGEX.test(inputIpAddress)) {
        console.log(
          "🚀 ~ file: Header.tsx ~ line 94 ~ handleClick ~ inputIpAddress matches Email",
          inputIpAddress
        );
        searchParam = { email: inputIpAddress };
      } else if (HOSTNAME_REGEX.test(inputIpAddress)) {
        console.log(
          "🚀 ~ file: Header.tsx ~ line 100~ handleClick ~ inputIpAddress matches Hostname",
          inputIpAddress
        );
        searchParam = { domain: inputIpAddress };
      } else {
        console.error(
          "inputIpAddress contains an invalid value:",
          inputIpAddress
        );
      }

      console.log(
        "🚀 ~ file: Header.tsx ~ line 112 ~ handleClick ~ searchParam",
        searchParam
      );

      refetch({
        params: { ...refetchParams, ...searchParam },
      });
    },
    [refetch, refetchParams, inputIpAddress]
  );

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

  return (
    <header className="relative flex flex-col gap-y-6 lg:gap-y-8 items-center justify-between h-[280px] w-full text-white pt-6">
      <h1 className="relative text-heading font-medium">IP Address Tracker</h1>
      <div className="relative flex w-[327px] lg:w-[555px]">
        <form className="relative flex w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            id="ipAddress"
            className="text-input ip-address h-[58px] rounded-l-2xl w-full text-black pl-6 focus-visible:outline-none"
            onChange={handleInputChange}
            value={inputIpAddress}
            placeholder="Search for any IP address or domain"
          />
          <button
            type="submit"
            className="flex h-[58px] w-[58px] items-center justify-center rounded-r-2xl bg-black hover:bg-buttonHoverGray text-white"
            // onClick={handleSubmit}
          >
            <Arrow />
          </button>
        </form>
      </div>
      <div className="relative z-[1000] sm:gap-y-6 lg:mt-6 shadow-2xl flex lg:flex-row sm:flex-col lg:gap-x-16  lg:py-9 lg:px-8 lg:text-left sm:text-center min-w-[327px] max-w-[1110px] justify-between bg-white rounded-2xl px-6 py-7">
        <div className="ip-address-resp">
          <div className="response-key">ip address</div>
          <div className="response-value">{localIpifyResponse.current?.ip}</div>
        </div>

        <div className="location-resp">
          <div className="response-key">location</div>
          <div className="response-value">
            {localIpifyResponse.current?.location.city},{" "}
            {localIpifyResponse.current?.location.region}{" "}
            {localIpifyResponse.current?.location.postalCode}
          </div>
        </div>

        <div className="timezone-resp">
          <div className="response-key">time zone</div>
          <div className="response-value">
            UTC {localIpifyResponse.current?.location.timezone}
            {/* {determineDstOffset(
              ipifyResponse.current?.time_zone.offset,
              ipifyResponse.current?.time_zone.is_dst,
              ipifyResponse.current?.time_zone.dst_savings
            )} */}
          </div>
        </div>

        <div className="isp-resp">
          <div className="response-key">isp</div>
          <div className="response-value">
            {localIpifyResponse.current?.isp}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
