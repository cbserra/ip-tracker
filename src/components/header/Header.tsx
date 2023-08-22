import { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios'
import { RefetchOptions } from 'axios-hooks'
import { useState } from 'react'
import SearchForm from './SearchForm'
import SearchResults from './SearchResults'
import cx from 'classnames'
import { IpifyResponse } from '../../types/IpifyType'
import { SearchKeyType } from '../../types/FormValidationTypes'

const Header = (props: {
  axiosError: AxiosError<any, any> | null
  data: IpifyResponse
  refetch: (config?: AxiosRequestConfig<any>, options?: RefetchOptions) => AxiosPromise<any>
  loading: boolean
  inputSearchValue: SearchKeyType
  setInputSearchValue: React.Dispatch<React.SetStateAction<SearchKeyType>>
}) => {
  const axiosError = props.axiosError
  const data = props.data
  const refetch = props.refetch
  // const refetchParams = props.refetchParams
  const [inputSearchValue, setInputSearchValue] = [
    props.inputSearchValue,
    props.setInputSearchValue,
  ]
  const [loading] = useState(props.loading)

  return (
    <header
      className={cx(
        'relative flex h-[28rem] w-full flex-col items-center justify-between pt-6',
        'text-white transition-all duration-200',
        'gap-y-[2.4rem] lg:gap-y-[4.8rem]'
      )}
    >
      <h1 className="relative text-heading font-medium lg:text-heading-lg">IP Address Tracker</h1>
      <div
        className={cx(
          'relative flex w-[32.7rem] flex-col items-center  lg:w-[55.5rem]',
          'gap-y-[2.4rem]'
        )}
      >
        <SearchForm
          axiosError={axiosError}
          data={data}
          refetch={refetch}
          loading={loading}
          inputSearchValue={inputSearchValue}
          setInputSearchValue={setInputSearchValue}
        />
      </div>

      {!loading && data && <SearchResults data={data} />}
    </header>
  )
}

export default Header
