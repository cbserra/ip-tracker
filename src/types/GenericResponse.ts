import { SearchKeyType } from './FormValidationTypes'

// In case I need to use a different API which doesn't format the DST offset.
export const determineDstOffset = (offset: number, isDst: boolean, dstSavings?: number) => {
  const currentOffset = offset + (isDst ? dstSavings || 1 : 0)

  if (currentOffset === 0) {
    return '00:00'
  }

  const fractionalMinutes = currentOffset % 1
  const minutes = Math.floor(fractionalMinutes * 60)
  const formattedMinutes = zeroPadIfNeeded(minutes)
  const formattedHours = zeroPadIfNeeded(Math.floor(Math.abs(currentOffset)))

  const formattedOffset = (currentOffset < 0 ? '-' : '') + formattedHours + ':' + formattedMinutes

  return formattedOffset

  function zeroPadIfNeeded(value: number): string {
    return (value < 10 ? '0' : '').concat(Math.floor(value).toString())
  }
}

export interface IpTrackerResponse {
  searchKey: SearchKeyType
  searchValue: string
  ipAddress: string
  location: string
  timeZone: string
  isp: string
  lat: number
  lng: number
}

export interface GenericResponse {
  ipAddress: string
  location?: string
  timeZone?: string
  isp: string
  latitude?: number
  longitude?: number
}
