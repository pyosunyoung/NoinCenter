let map;
        let marker;
        let markers = [];

        async function fetchData() {
            try {
                const response = await fetch('노인복지센터.json');
                const json = await response.json();
                const data = json.data;

                const seobukguList = document.querySelector('.seobukgu-list ul');
                const dongnamguList = document.querySelector('.dongnamgu-list ul');

                const seobukguData = [];
                const dongnamguData = [];

                data.forEach(element => {
                    const 기관명 = element.기관명 || '정보 없음';
                    const 주소 = element.주소 || '정보 없음';
                    const 전화번호 = element.전화번호 || '정보 없음';

                    const institution = { 기관명, 주소, 전화번호 };
                    const listItem = `<li onclick="showDetails('${기관명}', '${주소}')">${기관명}</li>`;

                    if (주소.includes('서북구')) {
                        seobukguList.innerHTML += listItem;
                        seobukguData.push(institution);
                    } else if (주소.includes('동남구')) {
                        dongnamguList.innerHTML += listItem;
                        dongnamguData.push(institution);
                    }
                });

                window.institutionData = { seobukgu: seobukguData, dongnamgu: dongnamguData };
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        function toggleList(region) {
            const list = document.querySelector(`.${region}-list`);
            const otherList = document.querySelector(region === 'seobukgu' ? '.dongnamgu-list' : '.seobukgu-list');

            if (list.style.display === 'block') {
                list.style.display = 'none';
            } else {
                list.style.display = 'block';
                otherList.style.display = 'none';
            }
        }

        function showDetails(name, address) {
            const details = window.institutionData.seobukgu.find(inst => inst.기관명 === name) ||
                window.institutionData.dongnamgu.find(inst => inst.기관명 === name);
            if (details) {
                document.querySelector('.기관명').innerText = `기관명: ${details.기관명}`;
                document.querySelector('.주소').innerText = `주소: ${details.주소}`;
                document.querySelector('.전화번호').innerText = `전화번호: ${details.전화번호}`;
                document.querySelector('.details').style.display = 'block';
                document.querySelector('.seobukgu-list').style.display = 'none';
                document.querySelector('.dongnamgu-list').style.display = 'none';
                document.querySelector('.search-list').style.display = 'none';

                document.getElementById('map').style.display = 'block';

                const geocoder = new kakao.maps.services.Geocoder();
                geocoder.addressSearch(address, function (result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                        map.setCenter(coords);

                        if (marker) {
                            marker.setMap(null);
                        }

                        marker = new kakao.maps.Marker({
                            map: map,
                            position: coords
                        });
                    }
                });
            }
        }

        function search() {
            const searchInput = document.getElementById('searchInput').value.trim();
            const searchResult = [];

            Object.keys(window.institutionData).forEach(region => {
                window.institutionData[region].forEach(institution => {
                    if (institution.기관명.includes(searchInput)) {
                        searchResult.push(institution);
                    }
                });
            });

            const searchList = document.querySelector('.search-list ul');
            searchList.innerHTML = '';
            searchResult.forEach(result => {
                const listItem = `<li onclick="showDetails('${result.기관명}', '${result.주소}')">${result.기관명}</li>`;
                searchList.innerHTML += listItem;
            });

            document.querySelector('.search-list').style.display = 'block';
            document.querySelector('.details').style.display = 'none';
            document.querySelector('.seobukgu-list').style.display = 'none';
            document.querySelector('.dongnamgu-list').style.display = 'none';
            document.getElementById('map').style.display = 'none';
        }

        function hideDetails() {
            document.querySelector('.details').style.display = 'none';
            document.querySelector('.seobukgu-list').style.display = 'none';
            document.querySelector('.dongnamgu-list').style.display = 'none';
            document.querySelector('.search-list').style.display = 'none';
            document.getElementById('map').style.display = 'none';
        }

        function initMap() {
            const mapContainer = document.getElementById('map');
            const mapOption = {
                center: new kakao.maps.LatLng(37.5665, 126.9780),
                level: 3
            };
            map = new kakao.maps.Map(mapContainer, mapOption);
        }

        window.onload = function () {
            initMap();
            fetchData();
        };

        function getCurrentPosition(callback) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    callback(lat, lng);
                });
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        }

        function initMapWithCurrentLocation(lat, lng) {
            const mapContainer = document.getElementById('map');
            const mapOption = {
                center: new kakao.maps.LatLng(lat, lng),
                level: 3
            };
            map = new kakao.maps.Map(mapContainer, mapOption);
            const markerPosition = new kakao.maps.LatLng(lat, lng);
            marker = new kakao.maps.Marker({
                position: markerPosition,
                map: map
            });
        }

        function showInstitutionsInBounds() {
            const bounds = map.getBounds();
            const swLatLng = bounds.getSouthWest();
            const neLatLng = bounds.getNorthEast();

            const institutionsInBounds = [];

            Object.keys(window.institutionData).forEach(region => {
                window.institutionData[region].forEach(institution => {
                    const address = institution.주소;
                    const geocoder = new kakao.maps.services.Geocoder();
                    geocoder.addressSearch(address, function(result, status) {
                        if (status === kakao.maps.services.Status.OK) {
                            const lat = result[0].y;
                            const lng = result[0].x;
                            if (lat >= swLatLng.getLat() && lat <= neLatLng.getLat() &&
                                lng >= swLatLng.getLng() && lng <= neLatLng.getLng()) {
                                institutionsInBounds.push(institution);

                                const coords = new kakao.maps.LatLng(lat, lng);
                                const marker = new kakao.maps.Marker({
                                    map: map,
                                    position: coords
                                });
                                markers.push(marker);

                                const infowindow = new kakao.maps.InfoWindow({
                                    content: `<div style="padding:5px;">${institution.기관명}</div>`
                                });
                                kakao.maps.event.addListener(marker, 'mouseover', function() {
                                    infowindow.open(map, marker);
                                });
                                kakao.maps.event.addListener(marker, 'mouseout', function() {
                                    infowindow.close();
                                });
                                kakao.maps.event.addListener(marker, 'click', function() {
                                    showDetails(institution.기관명, institution.주소);
                                });
                            }
                        }
                    });
                });
            });
        }

        document.getElementById('showMapButton').addEventListener('click', function () {
            document.querySelector('.details').style.display = 'none';
            document.querySelector('.seobukgu-list').style.display = 'none';
            document.querySelector('.dongnamgu-list').style.display = 'none';
            document.querySelector('.search-list').style.display = 'none';
            document.getElementById('map').style.display = 'block';

            getCurrentPosition(function (lat, lng) {
                initMapWithCurrentLocation(lat, lng);
                showInstitutionsInBounds();
            });
        });