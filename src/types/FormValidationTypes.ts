import { IpifySearchKey } from './IpifyType'

export type SearchKeyType = { [key in IpifySearchKey]?: string }

export type FormValues = {
  inputSearchValue?: string
}

const ipv4RegExPattern =
  '^[0-2]{,1}[0-9]{,2}.[0-2]{,1}[0-9]{,2}.[0-2]{,1}[0-9]{,2}.[0-2]{,1}[0-9]{,2}$'
const ipV6RegExPattern =
  '^[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}:[a-f0-9]{0,4}$'
const hostnameRegExPattern =
  '^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$'
const emailRegExPattern =
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"

const IPV4_REGEX = new RegExp(ipv4RegExPattern)
const IPV6_REGEX = new RegExp(ipV6RegExPattern)
const HOSTNAME_REGEX = new RegExp(hostnameRegExPattern)
const EMAIL_REGEX = new RegExp(emailRegExPattern)

export const getSearchParam = (inputSearchValue: string): SearchKeyType => {
  // Just look-up the client's Geo IP location.
  if (inputSearchValue === '') {
    return {}
  }

  let searchParam: SearchKeyType = {}
  if (IPV4_REGEX.test(inputSearchValue) || IPV6_REGEX.test(inputSearchValue)) {
    console.debug(
      '🚀 ~ file: FormValidationTypes.ts ~ line 31 ~ getSearchParam ~ inputSearchValue matches IP',
      inputSearchValue
    )
    searchParam = { ipAddress: inputSearchValue }
  } else if (EMAIL_REGEX.test(inputSearchValue)) {
    console.debug(
      '🚀 ~ file: FormValidationTypes.ts ~ line 37 ~ getSearchParam ~ inputSearchValue matches Email',
      inputSearchValue
    )
    searchParam = { email: inputSearchValue }
  } else if (HOSTNAME_REGEX.test(inputSearchValue)) {
    console.debug(
      '🚀 ~ file: FormValidationTypes.ts ~ line 43 ~ getSearchParam ~ inputSearchValue matches Hostname',
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
