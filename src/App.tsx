import { useEffect, useState } from 'react'
import Header from './components/header/Header'
import MapComponent from './components/map/Map'
import { getIpifyUseAxios } from './service/GeoIpService'
import { IpifyResponse } from './types/IpifyType'
import { SearchKeyType } from './types/FormValidationTypes'

function App() {
  const [inputSearchValue, setInputSearchValue] = useState<SearchKeyType>()
  const [latLng, setLatLng] = useState<number[]>([])
  const useAxios = getIpifyUseAxios()
  const [{ data, loading, error }, refetch] = useAxios<IpifyResponse>({})

  useEffect(() => {
    if (data) {
      console.debug('🚀 ~ file: App.tsx ~ line 63 ~ useEffect ~ data', data)
      setLatLng([data.location.lat, data.location.lng])
    }
  }, [data, setLatLng])

  return (
    <>
      {data && (
        <Header
          axiosError={error}
          data={data}
          refetch={refetch}
          // refetchParams={apiParams}
          loading={loading}
          inputSearchValue={inputSearchValue}
          setInputSearchValue={setInputSearchValue}
        />
      )}

      {latLng.length === 2 && <MapComponent latLng={latLng} />}
    </>
  )
}

export default App
