import { AxiosError, AxiosPromise, AxiosRequestConfig } from "axios";
import { RefetchOptions } from "axios-hooks";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  IpGeoConfigRequestParams,
} from "../../types/Types";
import { IpGeoResponse } from "../../types/IpGeoType";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

const Header = (props: {
  axiosError: AxiosError<any, any> | null
  data: IpGeoResponse;
  refetch: (
    config?: AxiosRequestConfig<any>,
    options?: RefetchOptions
  ) => AxiosPromise<any>;
  refetchParams: IpGeoConfigRequestParams;
  loading: boolean;
}) => {
  const axiosError = props.axiosError;
  const data = props.data
  const refetch = props.refetch;
  const refetchParams = props.refetchParams;
  const apiResponse = useRef<IpGeoResponse>(props.data);
  const [inputIpAddress, setInputIpAddress] = useState<string>("");
  const [invalidSearchInput, toggleInvalidSearchInput] = useState(false);
  const [invalidInputMsg, setInvalidInputMsg] = useState<string>("");
  const [loading, toggleLoading] = useState(props.loading);

  useEffect(() => {
    toggleLoading(props.loading);
  }, [props.loading]);

  useEffect(() => {
    apiResponse.current = props.data;
  }, [props.data]);

  // const handleSubmit = useCallback(
  //   (event: FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     searchInputRef.current.setCustomValidity("");
  //     console.debug("🚀 ~ file: Header.tsx ~ line 78 ~ event", event);
  //     console.debug(
  //       "🚀 ~ file: Header.tsx ~ line 81 ~ handleClick ~ inputIpAddress",
  //       inputIpAddress
  //     );

  //     let searchParam: SearchKeyType = getSearchParam(inputIpAddress);
  //     console.debug(
  //       "🚀 ~ file: Header.tsx ~ line 112 ~ handleClick ~ searchParam",
  //       searchParam
  //     );

  //     if (searchParam.error) {
  //       console.error(`🚀 ~ searchParam:`, searchParam)
  //       setInputErrorMessage(true, `Search input contains an invalid value: ${searchParam.error}`)
  //     } else {
  //       // const res = getIpGeoAddressInfo(searchParam)
  //       getIpGeoAddressInfo(searchParam)
  //       .then(function(response) {
  //         console.info(response);
  //         apiResponse.current = response.data
  //       })
  //       .catch(function(err) {
  //         console.error(err);
  //         setInputErrorMessage(true, [invalidInputMsg, err].join(','));
  //       });
  //       // console.log(`🚀 ~ res:`, res)
        
  //       // refetch({
  //       //   params: { ...refetchParams, ...searchParam },
  //       // }).catch((error) => {
  //       //   setInputErrorMessage(
  //       //   true,
  //       //   `${error.message}: ${error.response.data.messages}`
  //       // );
  //       // console.error(
  //       //   "🚀 ~ file: Header.tsx ~ line 118 ~ handleClick ~ error",
  //       //   error
  //       // );
  //       // });
  //     }
  //   },
  //   [inputIpAddress, invalidInputMsg]
  // );

  return (
    <header className="relative flex flex-col gap-y-[2.4rem] lg:gap-y-[4.8rem] items-center justify-between h-[28rem] w-full text-white pt-6 transition-all duration-200">
      <h1 className="relative text-heading lg:text-heading-lg font-medium">
        IP Address Tracker
      </h1>
      <div className="relative flex items-center flex-col w-[32.7rem] gap-y-[2.4rem] lg:gap-y-[4.8rem] lg:w-[55.5rem]">
        <SearchForm 
          axiosError={axiosError}
          data={data}
          refetch={refetch}
          refetchParams={refetchParams}
          loading={loading}
        />
      </div>

      <SearchResults
        data={apiResponse.current}
        loading={loading}
      />
    </header>
  );
};

export default Header;
