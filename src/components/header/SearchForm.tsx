import { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios'
import { RefetchOptions } from 'axios-hooks'
import { BaseSyntheticEvent, ChangeEvent, useCallback, useRef, useState } from 'react'
import { ReactComponent as Arrow } from '../../images/icon-arrow.svg'
import { emailRegExPattern, SearchKeyType } from '../../types/Types'
import { ipV6RegExPattern, ipv4RegExPattern, hostnameRegExPattern } from '../../types/Types'
import cx from 'classnames'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { FieldErrors } from 'react-hook-form/dist/types/errors'
import { IpifyResponse } from '../../types/IpifyType'

type FormValues = {
  inputSearchValue?: string
}

const IPV4_REGEX = new RegExp(ipv4RegExPattern)
const IPV6_REGEX = new RegExp(ipV6RegExPattern)
const HOSTNAME_REGEX = new RegExp(hostnameRegExPattern)
const EMAIL_REGEX = new RegExp(emailRegExPattern)

const getSearchParam = (inputSearchValue: string): SearchKeyType => {
  // Just look-up the client's Geo IP location.
  if (inputSearchValue === '') {
    return {}
  }

  let searchParam: SearchKeyType = {}
  if (IPV4_REGEX.test(inputSearchValue) || IPV6_REGEX.test(inputSearchValue)) {
    console.debug(
      '🚀 ~ file: Header.tsx ~ line 88 ~ getSearchParam ~ inputSearchValue matches IP',
      inputSearchValue
    )
    searchParam = { ipAddress: inputSearchValue }
  } else if (EMAIL_REGEX.test(inputSearchValue)) {
    console.debug(
      '🚀 ~ file: Header.tsx ~ line 94 ~ getSearchParam ~ inputSearchValue matches Email',
      inputSearchValue
    )
    searchParam = { email: inputSearchValue }
  } else if (HOSTNAME_REGEX.test(inputSearchValue)) {
    console.debug(
      '🚀 ~ file: Header.tsx ~ line 100~ getSearchParam ~ inputSearchValue matches Hostname',
      inputSearchValue
    )
    searchParam = { domain: inputSearchValue }
  } else {
    const testError = `inputSearchValue contains an invalid value: ${inputSearchValue}`
    searchParam = { error: inputSearchValue }
    console.error(testError)
  }
  return searchParam
}

const SearchForm = (props: {
  axiosError: AxiosError<any, any> | null
  data: IpifyResponse
  refetch: (config?: AxiosRequestConfig<any>, options?: RefetchOptions) => AxiosPromise<any>
  // refetchParams: IpifyRequestConfigParams
  loading: boolean
  inputSearchValue: SearchKeyType
  setInputSearchValue: React.Dispatch<React.SetStateAction<SearchKeyType>>
}) => {
  // const apiParams = IPIFY_DEFAULT_PARAMS
  const axiosError = props.axiosError
  const refetch = props.refetch
  const [inputSearchValue, setInputSearchValue] = [
    props.inputSearchValue,
    props.setInputSearchValue,
  ]
  const [invalidSearchInput, toggleInvalidSearchInput] = useState(false)
  const [invalidInputMsg, setInvalidInputMsg] = useState<string>('')
  const searchInputRef = useRef<HTMLInputElement>()
  const [loading, toggleLoading] = useState(props.loading)

  const setInputErrorMessage = (invalid: boolean, message: string) => {
    toggleInvalidSearchInput(invalid)
    setInvalidInputMsg(message)
    searchInputRef.current.setCustomValidity(message)
  }

  const clearInputErrorMessage = () => {
    setInputErrorMessage(false, '')
  }

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isValid, isSubmitted },
  } = useForm<FormValues>({
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
  })

  const onSubmit: SubmitHandler<FormValues> = async (
    formValues: FormValues,
    evt?: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    evt?.preventDefault()

    searchInputRef.current.setCustomValidity('')
    console.log(`🚀 ~ searchInputRef:`, searchInputRef)

    const searchObj: SearchKeyType = getSearchParam(evt.target[0].value)
    const searchKey = Object.keys(searchObj)[0]
    const searchVal = searchObj[searchKey]

    if (searchKey === 'error') {
      console.error(`🚀 ~ searchVal:`, searchVal)
      setInputErrorMessage(true, `Search input contains an invalid value: ${searchVal}`)
    } else {
      refetch({
        params: searchObj,
      })
    }
  }

  const onError: SubmitErrorHandler<FormValues> = async (
    errors: FieldErrors<FormValues>,
    evt?: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    evt?.preventDefault()

    console.log(`🚀 ~ errors:`, errors)
    console.log(`🚀 ~ evt:`, evt)
    console.log(`🚀 ~ formErrors:`, formErrors)
    console.log(`🚀 ~ isSubmitted:`, isSubmitted)
    console.log(`🚀 ~ isValid:`, isValid)
  }

  const isApiError = useCallback(() => axiosError?.isAxiosError ?? false, [axiosError])

  const isFormError = useCallback(
    () => isSubmitted && !isValid && Object.keys(formErrors).length > 0,
    [formErrors, isSubmitted, isValid]
  )

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    searchInputRef.current.value = event.target.value

    if (searchInputRef.current.validationMessage !== '') {
      console.log(`🚀 ~ handleInputChange ~ searchInputRef:`, searchInputRef)
      clearInputErrorMessage()
    }
  }

  return (
    <>
      <form
        className="relative flex w-full shadow-2xl "
        id="search-bar"
        noValidate={true}
        onSubmit={handleSubmit(onSubmit, onError)}
        inputMode="text"
      >
        <div
          className={cx(
            'ip-address relative flex h-[58px] w-full appearance-none rounded-2xl text-input',
            'bg-white pl-6 text-black',
            invalidSearchInput ? 'border-[1px] border-solid border-red-600 text-red-600' : ''
          )}
        >
          <input
            {...register('inputSearchValue')}
            type="text"
            id="ip-address"
            className={cx(
              'ip-address h-full w-full appearance-none bg-transparent pl-6 text-input text-black',
              'focus:outline-none focus-visible:outline-none',
              invalidSearchInput ? 'text-red-600' : ''
            )}
            onChange={handleInputChange}
            placeholder="Search for any IP address or domain"
            ref={searchInputRef}
          />
          <div className="input-error  relative flex h-[5.8rem] w-fit">
            {invalidInputMsg && (
              <p className="flex items-center justify-center text-center text-error text-red-500">
                <span className="inline-block">{invalidInputMsg}</span>
                {isFormError() && formErrors.inputSearchValue?.message?.length && (
                  <span className="inline-block">{formErrors.inputSearchValue.message}</span>
                )}
                {isApiError() && <span className="inline-block">No Results</span>}
              </p>
            )}
          </div>
          <button
            type="submit"
            aria-label="Search"
            className="flex h-[58px] w-[58px] items-center justify-center rounded-r-2xl bg-black text-white hover:bg-buttonHoverGray"
          >
            <Arrow />
          </button>
        </div>
      </form>
    </>
  )
}

export default SearchForm
