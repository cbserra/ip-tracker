import { useState } from 'react'
import { IpifyResponse } from '../../types/IpifyType'

const SearchResults = (props: { data: IpifyResponse; loading: boolean }) => {
  const data = props.data
  const [loading, toggleLoading] = useState(props.loading)

  return (
    <div className="relative z-[1000] flex h-[30rem]  w-[32.7rem] flex-col justify-between rounded-2xl  bg-white p-[2.4rem] text-center shadow-2xl lg:min-h-[16rem] lg:min-w-[1110px] lg:flex-row  lg:gap-x-[3.2rem] lg:py-[3.7rem] lg:px-[3.2rem] lg:text-left">
      <div className="response-datum-container ip-address-resp">
        <div className="response-key">ip address</div>
        <div className="response-value">{data?.ip}</div>
      </div>

      <div className="hor-line" />

      <div className="response-datum-container location-resp">
        <div className="response-key">location</div>
        <div className="response-value">
          {data?.location.city}, {data?.location.region} {data?.location.postalCode}
        </div>
      </div>

      <div className="hor-line"></div>

      <div className="response-datum-container timezone-resp">
        <div className="response-key">time zone</div>
        <div className="response-value">UTC {data?.location.timezone}</div>
      </div>

      <div className="hor-line" />

      <div className="response-datum-container isp-resp">
        <div className="response-key">isp</div>
        <div className="response-value">{data?.isp}</div>
      </div>
    </div>
  )
}

export default SearchResults
