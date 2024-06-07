import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './PlacesList.css';

const { kakao } = window;

const getCurrentCoordinate = async () => {
  return new Promise((res, rej) => {
    try {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const coordinate = new kakao.maps.LatLng(lat, lon);
        res(coordinate);
      });
    } catch {
      rej(new Error('현재 위치를 불러올 수 없습니다.'));
    }
  });
};

const PlacesList = () => {
  const [places, setPlaces] = useState([]);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const ps = new kakao.maps.services.Places();
        const currentCoordinate = await getCurrentCoordinate();
        const options = {
          location: currentCoordinate,
          radius: 10000,
          sort: kakao.maps.services.SortBy.DISTANCE,
        };

        ps.keywordSearch('경로당', (data, status, pagination) => {
          if (status === kakao.maps.services.Status.OK) {
            setPlaces(data);
            setPagination(pagination);
          } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            Swal.fire('검색 결과가 존재하지 않습니다.');
          } else if (status === kakao.maps.services.Status.ERROR) {
            Swal.fire('검색 결과 중 오류가 발생했습니다.');
          }
        }, options);
      } catch (error) {
        Swal.fire('위치 정보를 가져올 수 없습니다.');
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div id="placesListBottomContainer">
      <ul id="placesListBottom">
        {places.map((place, index) => (
            
          <li key={index} className="item">
            <hr/>
            <span className={`markerbg marker_${index + 1}`}></span>
            <div className="info">
              <h5>{index + 1}. {place.place_name}</h5>
              {place.road_address_name ? (
                <>
                  <div>도로명 주소 : {place.road_address_name}</div>
                  <span className="jibun gray">지번 : {place.address_name}</span>
                </>
              ) : (
                <span>{place.address_name}</span> 
              )} 
              {place.phone ? (<div className="tel">전화번호 : {place.phone}</div>) : null }
            </div>
            <div>
            
            </div>
          </li>
        ))}
      </ul>
      <div id="paginationBottom">
        {Array.from({ length: pagination?.last || 0 }, (_, i) => (
          <a
            href="#"
            key={i + 1}
            className={pagination?.current === i + 1 ? 'on' : ''}
            onClick={() => pagination?.gotoPage(i + 1)}
          >
            {i + 1}
          </a>
        ))}
      </div>
    </div>
  );
};

export default PlacesList;