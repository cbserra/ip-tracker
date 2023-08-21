import { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios'
import { RefetchOptions } from 'axios-hooks'
import { BaseSyntheticEvent, ChangeEvent, useCallback, useRef, useState } from 'react'
import { ReactComponent as Arrow } from '../../images/icon-arrow.svg'
import { getSearchParam, FormValues, SearchKeyType } from '../../types/FormValidationTypes'
import cx from 'classnames'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { FieldErrors } from 'react-hook-form/dist/types/errors'
import { IpifyResponse } from '../../types/IpifyType'

const SearchForm = (props: {
  axiosError: AxiosError<any, any> | null
  data: IpifyResponse
  refetch: (config?: AxiosRequestConfig<any>, options?: RefetchOptions) => AxiosPromise<any>
  loading: boolean
  inputSearchValue: SearchKeyType
  setInputSearchValue: React.Dispatch<React.SetStateAction<SearchKeyType>>
}) => {
  const axiosError = props.axiosError
  const refetch = props.refetch
  const [inputSearchValue, setInputSearchValue] = [
    props.inputSearchValue,
    props.setInputSearchValue,
  ]
  const [invalidSearchInput, toggleInvalidSearchInput] = useState(false)
  const [invalidInputMsg, setInvalidInputMsg] = useState<string>('')
  const searchInputRef = useRef<HTMLInputElement>()

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
      }).catch((err) => {
        console.error(`🚀 ~ err:`, err)
        setInputErrorMessage(true, `Error caught during refetch: ${JSON.stringify(err.message)}`)
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
            'ip-address h-[58px] relative flex w-full appearance-none justify-between rounded-2xl text-input',
            'bg-white pl-6 text-black',
            invalidSearchInput ? 'border-[1px] border-solid border-red-600 text-red-600' : ''
          )}
        >
          <div className="items-align flex h-full w-full flex-col justify-end">
            <input
              {...register('inputSearchValue')}
              type="text"
              id="ip-address"
              className={cx(
                'ip-address h-[2.1rem] w-full appearance-none bg-transparent text-input text-black',
                'focus:outline-none focus-visible:outline-none',
                invalidSearchInput ? 'text-red-600' : ''
              )}
              onChange={handleInputChange}
              placeholder="Search for any IP address or domain"
              ref={searchInputRef}
            />
            <div className="input-error relative flex h-1/3 w-full">
              {invalidInputMsg && (
                <p className="flex items-center justify-center text-right text-error text-red-500 lg:text-error-lg">
                  <span className="inline-block">{invalidInputMsg}</span>
                  {isFormError() && formErrors.inputSearchValue?.message?.length && (
                    <span className="inline-block">{formErrors.inputSearchValue.message}</span>
                  )}
                  {/* {isApiError() && <span className="inline-block">No Results</span>} */}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            aria-label="Search"
            className="h-[58px] w-[58px] flex items-center justify-center rounded-r-2xl bg-black text-white hover:bg-buttonHoverGray"
          >
            <Arrow />
          </button>
        </div>
      </form>
    </>
  )
}

export default SearchForm
