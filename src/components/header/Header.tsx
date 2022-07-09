import { AxiosPromise, AxiosRequestConfig } from "axios";
import { RefetchOptions } from "axios-hooks";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ReactComponent as Arrow } from "../../images/icon-arrow.svg";
import {
  emailRegExPattern,
  IpifyConfigRequestParams,
  IpifyResponse,
  IpifySearchKey,
} from "../../types/Types";
import {
  ipV6RegExPattern,
  ipv4RegExPattern,
  hostnameRegExPattern,
} from "../../types/Types";
import cx from "classnames";

const IPV4_REGEX = new RegExp(ipv4RegExPattern);
const IPV6_REGEX = new RegExp(ipV6RegExPattern);
const HOSTNAME_REGEX = new RegExp(hostnameRegExPattern);
const EMAIL_REGEX = new RegExp(emailRegExPattern);

type SearchKeyType = { [key in IpifySearchKey]?: string };

const getSearchParam = (inputIpAddress: string) => {
  let searchParam: SearchKeyType = {};
  if (IPV4_REGEX.test(inputIpAddress) || IPV6_REGEX.test(inputIpAddress)) {
    console.debug(
      "🚀 ~ file: Header.tsx ~ line 88 ~ handleClick ~ inputIpAddress matches IP",
      inputIpAddress
    );
    searchParam = { ipAddress: inputIpAddress };
  } else if (EMAIL_REGEX.test(inputIpAddress)) {
    console.debug(
      "🚀 ~ file: Header.tsx ~ line 94 ~ handleClick ~ inputIpAddress matches Email",
      inputIpAddress
    );
    searchParam = { email: inputIpAddress };
  } else if (HOSTNAME_REGEX.test(inputIpAddress)) {
    console.debug(
      "🚀 ~ file: Header.tsx ~ line 100~ handleClick ~ inputIpAddress matches Hostname",
      inputIpAddress
    );
    searchParam = { domain: inputIpAddress };
  } else {
    console.error("inputIpAddress contains an invalid value:", inputIpAddress);
  }
  return searchParam;
};

const Header = (props: {
  data: IpifyResponse;
  refetch: (
    config?: AxiosRequestConfig<any>,
    options?: RefetchOptions
  ) => AxiosPromise<any>;
  refetchParams: IpifyConfigRequestParams;
  requestIpAddress: string;
  setRequestIpAddress: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}) => {
  const refetch = props.refetch;
  const refetchParams = props.refetchParams;
  const localIpifyResponse = useRef<IpifyResponse>(props.data);
  const requestIpAddress = props.requestIpAddress;
  const [inputIpAddress, setInputIpAddress] =
    useState<string>(requestIpAddress);
  const [invalidSearchInput, toggleInvalidSearchInput] = useState(false);
  const [invalidInputMsg, setInvalidInputMsg] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>();
  const [loading, toggleLoading] = useState(props.loading);

  const setInputErrorMessage = (invalid: boolean, message: string) => {
    toggleInvalidSearchInput(invalid);
    setInvalidInputMsg(message);
    searchInputRef.current.setCustomValidity(message);
  };

  const clearInputErrorMessage = () => {
    setInputErrorMessage(false, "");
  };

  useEffect(() => {
    toggleLoading(props.loading);
  }, [props.loading]);

  useEffect(() => {
    localIpifyResponse.current = props.data;
  }, [props.data]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (searchInputRef.current.validationMessage !== "") {
      clearInputErrorMessage();
    }
    setInputIpAddress(event.target.value);
  };

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      searchInputRef.current.setCustomValidity("");
      console.debug("🚀 ~ file: Header.tsx ~ line 78 ~ event", event);
      console.debug(
        "🚀 ~ file: Header.tsx ~ line 81 ~ handleClick ~ inputIpAddress",
        inputIpAddress
      );

      let searchParam: SearchKeyType = getSearchParam(inputIpAddress);

      console.debug(
        "🚀 ~ file: Header.tsx ~ line 112 ~ handleClick ~ searchParam",
        searchParam
      );

      refetch({
        params: { ...refetchParams, ...searchParam },
      }).catch((error) => {
        setInputErrorMessage(
          true,
          `${error.message}: ${error.response.data.messages}`
        );
        console.error(
          "🚀 ~ file: Header.tsx ~ line 118 ~ handleClick ~ error",
          error
        );
      });
    },
    [refetch, refetchParams, inputIpAddress]
  );

  return (
    <header className="relative flex flex-col gap-y-6 lg:gap-y-8 items-center justify-between h-[280px] w-full text-white pt-6 transition-all duration-200">
      <h1 className="relative text-heading lg:text-heading-lg font-medium">
        IP Address Tracker
      </h1>
      <div className="relative flex items-center flex-col w-[327px] gap-6 lg:w-[555px]">
        <form
          className="relative flex w-full shadow-2xl "
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            id="ipAddress"
            className={cx(
              "appearance-none text-input ip-address h-[58px] rounded-l-2xl w-full text-black pl-6 focus:outline-none focus-visible:outline-none",
              invalidSearchInput
                ? "border-solid border-[1px] border-red-600 text-red-600"
                : ""
            )}
            onChange={handleInputChange}
            value={inputIpAddress}
            placeholder="Search for any IP address or domain"
            ref={searchInputRef}
          />
          <button
            type="submit"
            className="flex h-[58px] w-[58px] items-center justify-center rounded-r-2xl bg-black hover:bg-buttonHoverGray text-white"
            // onClick={handleSubmit}
          >
            <Arrow />
          </button>
        </form>
        <div className="input-error relative flex w-[327px] h-12">
          {invalidInputMsg && (
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-red-50 rounded-2xl shadow-2xl">
              <div className="py-2">
                <p className="text-xs text-black text-center">
                  {invalidInputMsg}
                </p>
              </div>

              <div className="flex items-center justify-center w-[58px] rounded-r-2xl bg-red-500 border-[1px] border-red-700">
                <svg
                  className="w-6 h-6 text-white fill-current"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-[1000] gap-y-6  shadow-2xl flex  flex-col text-center min-w-[327px] max-w-[1110px] justify-between bg-white rounded-2xl px-6 py-7  lg:flex-row  lg:gap-x-16 lg:py-9 lg:px-8 lg:text-left">
        <div className="response-datum-container ip-address-resp">
          <div className="response-key">ip address</div>
          <div className="response-value">{localIpifyResponse.current?.ip}</div>
        </div>

        <div className="response-datum-container location-resp">
          <div className="response-key">location</div>
          <div className="response-value">
            {localIpifyResponse.current?.location.city},{" "}
            {localIpifyResponse.current?.location.region}{" "}
            {localIpifyResponse.current?.location.postalCode}
          </div>
        </div>

        <div className="response-datum-container timezone-resp">
          <div className="response-key">time zone</div>
          <div className="response-value">
            UTC {localIpifyResponse.current?.location.timezone}
          </div>
        </div>

        <div className="response-datum-container isp-resp">
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
