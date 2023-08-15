import {
  useEffect,
  useRef,
  useState,
} from "react";
import { IpGeoResponse } from "../../types/IpGeoType";

const SearchResults = (props: {
  data: IpGeoResponse;
  loading: boolean;
}) => {

  const apiResponse = useRef<IpGeoResponse>(props.data);
  const [loading, toggleLoading] = useState(props.loading);


  useEffect(() => {
    toggleLoading(props.loading);
  }, [props.loading]);

  useEffect(() => {
    apiResponse.current = props.data;
  }, [props.data]);

   
  return (
      <div className="relative z-[1000] shadow-2xl flex  flex-col text-center w-[32.7rem] h-[30rem]  justify-between bg-white rounded-2xl p-[2.4rem] lg:py-[3.7rem] lg:px-[3.2rem] lg:flex-row  lg:gap-x-[3.2rem] lg:text-left lg:min-w-[1110px] lg:min-h-[16rem]">
        <div className="response-datum-container ip-address-resp">
          <div className="response-key">ip address</div>
          <div className="response-value">{apiResponse.current?.ip}</div>
        </div>

        <div className="hor-line" />

        <div className="response-datum-container location-resp">
          <div className="response-key">location</div>
          <div className="response-value">
            {apiResponse.current?.city},{" "}
            {apiResponse.current?.state_prov}{" "}
            {apiResponse.current?.zipcode}
          </div>
        </div>

        <div className="hor-line"></div>

        <div className="response-datum-container timezone-resp">
          <div className="response-key">time zone</div>
          <div className="response-value">
            UTC {apiResponse.current?.time_zone.offset}:00
          </div>
        </div>

        <div className="hor-line" />

        <div className="response-datum-container isp-resp">
          <div className="response-key">isp</div>
          <div className="response-value">
            {apiResponse.current?.isp}
          </div>
        </div>
      </div>
    );
}

export default SearchResults;