const logo = document.querySelector("#logo") // 로고 버튼

logo.addEventListener("click", lobby) // 로고 버튼 누르면 메인 페이지로 이동함

function lobby() { // 메인페이지로 이동하는 함수
    window.location.href = 'file:///C:/Users/hi/OneDrive/%EB%B0%94%ED%83%95%20%ED%99%94%EB%A9%B4/%EC%86%8C%EC%9B%A8%EA%B3%B5%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/index.html'
}

const plusButton = document.querySelector("#plus") // 확대 버튼
const minusButton = document.querySelector("#minus") // 축소 버튼

let nowZoom = 100 // 현재 화면 비율

function zoomOut() { // 화면크기 축소
    nowZoom = nowZoom - 10;

    // 화면크기 최대 축소율 70%
    if (nowZoom <= 70) {
        nowZoom = 70;
    }
    zooms();
}

function zoomIn() { // 화면크기 확대
    nowZoom = nowZoom + 10;

    // 화면크기 최대 확대율 130%
    if (nowZoom >= 130) {
        nowZoom = 130;
    }
    zooms();
}

function zooms() {
    document.body.style.zoom = nowZoom + "%";
    if (nowZoom == 70) {
        alert("더 이상 축소할 수 없습니다."); // 화면 축소율이 70% 이하일 경우 
    }
    if (nowZoom == 130) {
        alert("더 이상 확대할 수 없습니다."); // 화면 확대율이 130% 이상일 경우 
    }
}

plusButton.addEventListener('click', zoomIn)
minusButton.addEventListener('click', zoomOut)