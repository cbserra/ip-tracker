import { AxiosError, AxiosPromise, AxiosRequestConfig } from "axios";
import { RefetchOptions } from "axios-hooks";
import {
  BaseSyntheticEvent,
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ReactComponent as Arrow } from "../../images/icon-arrow.svg";
import {
  emailRegExPattern,
  IpGeoConfigRequestParams,
  SearchKeyType,
} from "../../types/Types";
import {
  ipV6RegExPattern,
  ipv4RegExPattern,
  hostnameRegExPattern,
} from "../../types/Types";
import cx from "classnames";
import { getIpGeoAddressInfo } from "../../service/GeoIpService";
import { IpGeoResponse } from "../../types/IpGeoType";
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { FieldErrors } from 'react-hook-form/dist/types/errors'

type FormValues = {
  ipAddress: string
}

const IPV4_REGEX = new RegExp(ipv4RegExPattern);
const IPV6_REGEX = new RegExp(ipV6RegExPattern);
const HOSTNAME_REGEX = new RegExp(hostnameRegExPattern);
const EMAIL_REGEX = new RegExp(emailRegExPattern);

const getSearchParam = (inputIpAddress: string): SearchKeyType => {
  // Just look-up the client's Geo IP location.
  if (inputIpAddress === "") {
    return {};
  }

  let searchParam: SearchKeyType = {};
  if (IPV4_REGEX.test(inputIpAddress) || IPV6_REGEX.test(inputIpAddress)) {
    console.debug(
      "🚀 ~ file: Header.tsx ~ line 88 ~ getSearchParam ~ inputIpAddress matches IP",
      inputIpAddress
    );
    searchParam = { ipAddress: inputIpAddress };
  } else if (EMAIL_REGEX.test(inputIpAddress)) {
    console.debug(
      "🚀 ~ file: Header.tsx ~ line 94 ~ getSearchParam ~ inputIpAddress matches Email",
      inputIpAddress
    );
    searchParam = { email: inputIpAddress };
  } else if (HOSTNAME_REGEX.test(inputIpAddress)) {
    console.debug(
      "🚀 ~ file: Header.tsx ~ line 100~ getSearchParam ~ inputIpAddress matches Hostname",
      inputIpAddress
    );
    searchParam = { domain: inputIpAddress };
  } else {
    const testError = `inputIpAddress contains an invalid value: ${inputIpAddress}`
    searchParam = { error: inputIpAddress}
    console.error(testError);
  }
  return searchParam;
};

const SearchForm = (props: {
  // data: IpifyResponse;
  axiosError: AxiosError<any, any> | null
  data: IpGeoResponse;
  refetch: (
    config?: AxiosRequestConfig<any>,
    options?: RefetchOptions
  ) => AxiosPromise<any>;
  // refetchParams: IpifyConfigRequestParams;
  refetchParams: IpGeoConfigRequestParams;
  loading: boolean;
}) => {
  const axiosError = props.axiosError;
  const refetch = props.refetch;
  const refetchParams = props.refetchParams;
  // const localIpifyResponse = useRef<IpifyResponse>(props.data);
  // const localIpifyResponse = useRef<IpGeoResponse>(props.data);
  const apiResponse = useRef<IpGeoResponse>(props.data);
  const [inputIpAddress, setInputIpAddress] = useState<string>("");
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
    apiResponse.current = props.data;
  }, [props.data]);

    const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isValid, isSubmitted }
  } = useForm<FormValues>({
    // mode: 'onSubmit',
    // reValidateMode: 'onChange'
  })

  const onSubmit: SubmitHandler<FormValues> = async (
    data: FormValues,
    evt?: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    evt?.preventDefault()

    console.log(`🚀 ~ searchInputRef.current?.value`, searchInputRef.current?.value)

    console.log(data)
    console.log(evt)

    
    searchInputRef.current.setCustomValidity("");
    console.debug("🚀 ~ file: Header.tsx ~ line 78 ~ event", evt);
    console.debug(
      "🚀 ~ file: Header.tsx ~ line 81 ~ handleClick ~ inputIpAddress",
      inputIpAddress
    );

    let searchParam: SearchKeyType = getSearchParam(inputIpAddress);
    console.debug(
      "🚀 ~ file: Header.tsx ~ line 112 ~ handleClick ~ searchParam",
      searchParam
    );


    if (searchParam.error) {
      console.error(`🚀 ~ searchParam:`, searchParam)
      setInputErrorMessage(true, `Search input contains an invalid value: ${searchParam.error}`)
    } else {
      // const res = getIpGeoAddressInfo(searchParam)
      getIpGeoAddressInfo(searchParam)
      .then(function(response) {
        console.info(response);
        apiResponse.current = response.data
      })
      .catch(function(err) {
        console.error(err);
        setInputErrorMessage(true, [invalidInputMsg, err].join(','));
      });
    }
  
  }

  const onError: SubmitErrorHandler<FormValues> = async (
    errors: FieldErrors<FormValues>,
    evt?: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    evt?.preventDefault()

    console.log(`🚀 ~ searchInputRef.current?.value`, searchInputRef.current?.value)

    console.log(errors)
    console.log(evt)
  }

  const isApiError = useCallback(() => {
    const isAxiosError = axiosError?.isAxiosError ?? false

    console.log(`🚀 ~ isApiError ~ ?`, isAxiosError)

    return isAxiosError
  }, [axiosError])

  const isFormError = useCallback(() => {
    const isFormError = isSubmitted && !isValid && Object.keys(formErrors).length > 0

    console.log(`🚀 ~ isFormError ~ ?`, isFormError)

    return isFormError
  }, [formErrors, isSubmitted, isValid])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (searchInputRef.current.validationMessage !== "") {
      clearInputErrorMessage();
    }
    setInputIpAddress(event.target.value);
  };

  return (
      <>
        <form
          className="relative flex w-full shadow-2xl "
          id="search-bar"
          noValidate={true}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <input
            {...register('ipAddress', { required: 'IP or Domain Address is Required' })}
            type="text"
            id="ip-address"
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
            aria-label="Search"
            className="flex h-[58px] w-[58px] items-center justify-center rounded-r-2xl bg-black hover:bg-buttonHoverGray text-white"
            // onClick={handleSubmit}
          >
            <Arrow />
          </button>
        </form>
        <div className="input-error relative flex w-[327px] max-h-fit">
          {invalidInputMsg && (
            <div className="flex w-full h-12 max-w-sm mx-auto overflow-hidden bg-red-50 rounded-2xl shadow-2xl">
              <div className="py-2 w-fit">
                <p className="text-xs text-black text-center">
                  {invalidInputMsg}
                  {isFormError() && formErrors.ipAddress?.message?.length && (
                    <span className="inline-block">{formErrors.ipAddress.message}</span>
                  )}
                  {isApiError() && <span className="inline-block">No Results</span>}
                </p>
              </div>
              <div className="flex items-center justify-between w-[58px] rounded-r-2xl bg-red-500 border-[1px] border-red-700">
                <svg
                  className="w-6 h-6 text-white fill-current"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                </svg>
              </div>
            </div>)}
          </div>
        </>
        );
}

export default SearchForm;