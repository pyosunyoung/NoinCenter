import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsHoldingChild, faMagnifyingGlassPlus, faMagnifyingGlassMinus } from "@fortawesome/free-solid-svg-icons";
import './header.css'
function HeaderR() {
    const [nowZoom, setNowZoom] = useState(100);

    const zoomOut = () => {
        setNowZoom(prevZoom => {
            let newZoom = prevZoom - 10;
            if (newZoom <= 70) {
                newZoom = 70;
                alert("더 이상 축소할 수 없습니다.");
            }
            document.body.style.zoom = newZoom + "%";
            return newZoom;
        });
    };

    const zoomIn = () => {
        setNowZoom(prevZoom => {
            let newZoom = prevZoom + 10;
            if (newZoom >= 130) {
                newZoom = 130;
                alert("더 이상 확대할 수 없습니다.");
            }
            document.body.style.zoom = newZoom + "%";
            return newZoom;
        });
    };

    return (
        <section className="container">
            <section>
                <div className="menus">
                    <div id="logo">
                        <button style={{ fontSize: "40px" }}>
                            <FontAwesomeIcon icon={faHandsHoldingChild} />
                        </button>
                    </div>

                    <div className="main-menu">
                        <button style={{ fontSize: "40px" }}>소식통</button>
                        <button style={{ fontSize: "40px" }}>안내사항</button>
                        <button style={{ fontSize: "40px" }}>편의시설</button>
                        <button style={{ fontSize: "40px" }}>경로당</button>
                        <button style={{ fontSize: "40px" }}>후원</button>
                        <button style={{ fontSize: "40px" }}>놀거리</button>
                    </div>

                    <div id="magnifying">
                        <button id="plus" style={{ fontSize: "40px" }} onClick={zoomIn}>
                            <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
                        </button>
                        <button id="minus" style={{ fontSize: "40px" }} onClick={zoomOut}>
                            <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
                        </button>
                    </div>
                </div>
            </section>
        </section>
    );
}

export default HeaderR;