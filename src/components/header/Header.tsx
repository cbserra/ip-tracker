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
  const data = props.data
  const refetch = props.refetch;
  const refetchParams = props.refetchParams;
  // const localIpifyResponse = useRef<IpifyResponse>(props.data);
  // const localIpifyResponse = useRef<IpGeoResponse>(props.data);
  const apiResponse = useRef<IpGeoResponse>(props.data);
  const [inputIpAddress, setInputIpAddress] = useState<string>("");
  const [invalidSearchInput, toggleInvalidSearchInput] = useState(false);
  const [invalidInputMsg, setInvalidInputMsg] = useState<string>("");
  const [loading, toggleLoading] = useState(props.loading);


  // const setInputErrorMessage = (invalid: boolean, message: string) => {
  //   toggleInvalidSearchInput(invalid);
  //   setInvalidInputMsg(message);
  //   searchInputRef.current.setCustomValidity(message);
  // };

  // const clearInputErrorMessage = () => {
  //   setInputErrorMessage(false, "");
  // };

  useEffect(() => {
    toggleLoading(props.loading);
  }, [props.loading]);

  useEffect(() => {
    apiResponse.current = props.data;
  }, [props.data]);

  //   const {
  //   register,
  //   handleSubmit,
  //   formState: { errors: formErrors, isValid, isSubmitted }
  // } = useForm<FormValues>({
  //   // mode: 'onSubmit',
  //   // reValidateMode: 'onChange'
  // })

  // const onSubmit: SubmitHandler<FormValues> = async (
  //   data: FormValues,
  //   evt?: BaseSyntheticEvent<object, any, any> | undefined
  // ) => {
  //   evt?.preventDefault()

  //   console.log(`🚀 ~ searchInputRef.current?.value`, searchInputRef.current?.value)

  //   console.log(data)
  //   console.log(evt)

     
  //     searchInputRef.current.setCustomValidity("");
  //     console.debug("🚀 ~ file: Header.tsx ~ line 78 ~ event", evt);
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
       

  //     }
  
  // }

  // const onError: SubmitErrorHandler<FormValues> = async (
  //   errors: FieldErrors<FormValues>,
  //   evt?: BaseSyntheticEvent<object, any, any> | undefined
  // ) => {
  //   evt?.preventDefault()

  //   console.log(`🚀 ~ searchInputRef.current?.value`, searchInputRef.current?.value)

  //   console.log(errors)
  //   console.log(evt)
  // }

  // const isApiError = useCallback(() => {
  //   const isAxiosError = axiosError?.isAxiosError ?? false

  //   console.log(`🚀 ~ isApiError ~ ?`, isAxiosError)

  //   return isAxiosError
  // }, [axiosError])

  // const isFormError = useCallback(() => {
  //   const isFormError = isSubmitted && !isValid && Object.keys(formErrors).length > 0

  //   console.log(`🚀 ~ isFormError ~ ?`, isFormError)

  //   return isFormError
  // }, [formErrors, isSubmitted, isValid])

  // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (searchInputRef.current.validationMessage !== "") {
  //     clearInputErrorMessage();
  //   }
  //   setInputIpAddress(event.target.value);
  // };

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
    <header className="relative flex flex-col gap-y-6 lg:gap-y-8 items-center justify-between h-[280px] w-full text-white pt-6 transition-all duration-200">
      <h1 className="relative text-heading lg:text-heading-lg font-medium">
        IP Address Tracker
      </h1>
      <div className="relative flex items-center flex-col w-[327px] gap-6 lg:w-[555px]">
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
