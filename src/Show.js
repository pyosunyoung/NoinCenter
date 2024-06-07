import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import MypageMap from './MyPageMap';
import Header from './Header';
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Til from "./pages/Til";
import Diary from "./pages/Diary";
import { FaMapMarkerAlt } from "react-icons/fa";
import PlacesList from "./PlacesList";

import HeaderR from "./HeaderR";
const Mypage = () => {
  return (
    <>
    <BrowserRouter>
      <div className="App">
        <HeaderR/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/Til" element={<Til />} />
          <Route path="/diary" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
      <Main>
        <div className="kakaoMap middle2">
          <div className="topic common"> <FaMapMarkerAlt /> 내 주변 경로당 찾기
          <span className="marker_position"><img className="marker_position" src="http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png"/>내위치:</span>
          </div>
          <div className="common">
            <MypageMap />
          </div>
          <div>
            <PlacesList />
          </div>
        </div>
      </Main>
    </>
  );
};

// const Header = styled.div`
//   height: 50px;
// `;
const Main = styled.div`
  background-size: 100%;
  background-image:
  ${(props) => `url(${props.imgUrl})`};
  // min-height: 100vh;
   padding: 1% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .marker_position {
    float:right;
  }
  .middle2 {
    width: 90%;
    // margin-bottom: 80px;
    text-align: basis;
    // width: 80%;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 8px 32px #6869d0;
    backdrop-filter: blur(2.5px);
    border-radius: 10px;

    text-transform: uppercase;
    letter-spacing: 0.4rem;
    padding: 30px;
  }
`;

export default Mypage;