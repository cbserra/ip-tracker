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
      <div className="relative z-[1000] gap-y-6  shadow-2xl flex  flex-col text-center min-w-[327px] max-h-[376px]  justify-between bg-white rounded-2xl px-6 py-7  lg:flex-row  lg:gap-x-16 lg:py-9 lg:px-8 lg:text-left lg:max-w-[1110px] lg:max-h-[161px]">
        <div className="response-datum-container ip-address-resp">
          <div className="response-key">ip address</div>
          <div className="response-value">{apiResponse.current?.ip}</div>
        </div>

        <div className="response-datum-container location-resp">
          <div className="response-key">location</div>
          <div className="response-value">
            {apiResponse.current?.city},{" "}
            {apiResponse.current?.state_prov}{" "}
            {apiResponse.current?.zipcode}
          </div>
        </div>

        <div className="response-datum-container timezone-resp">
          <div className="response-key">time zone</div>
          <div className="response-value">
            UTC {apiResponse.current?.time_zone.offset}
          </div>
        </div>

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