import { IpifyResponse } from '../../types/IpifyType'
import cx from 'classnames'

const SearchResults = (props: { data: IpifyResponse }) => {
  const data = props.data

  return (
    <div
      className={cx(
        'z-[1000] w-[32.7rem] gap-y-[2.4rem] relative  flex h-fit flex-col justify-between',
        'p-[2.4rem] rounded-2xl bg-white text-center shadow-2xl',
        'lg:min-h-[16rem] lg:min-w-[1110px] lg:gap-x-[3.2rem] lg:px-[3.2rem] lg:py-[3.7rem] lg:flex-row lg:text-left'
      )}
    >
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
