<template>
  <div id="mapContainer">
    <div id="map"></div>
  </div>
</template>

<script>
import MapPositons from "../assets/map-positions.json";

export default {
  name: "TheMap",
  data() {
    return {};
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=401538398fe54067727305ab7a361a7e";
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      var mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(37.564343, 126.947613), // 지도의 중심좌표
          level: 13, // 지도의 확대 레벨
        };

        const map = new kakao.maps.Map(mapContainer, mapOption);
        const positions = MapPositons.map((pos)=>({
          latlng : new kakao.maps.LatLng(...pos.latlng),
          cityName : pos.cityName
        }));

      // 마커를 생성
      positions.forEach((pos) => {
        const marker = new kakao.maps.Marker({
          position: pos.latlng, // 마커의 위치
        });
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
        // 마커를 클릭했을 때, 클릭 된 마커의 좌표를 vuex store에 전달
        kakao.maps.event.addListener(marker, "click", () => {
        // console.log(marker.getPosition());
          this.$store.commit("SET_LATLON", marker.getPosition());
          this.$store.commit("SET_CITYNAME", pos.cityName);
          // commit : vuex store의 mutations에 선언한 메서드의 payload라는 파라미터 값을 전달할 때 사용
          this.$store.dispatch("FETCH_OPENWEATHER_API");
            // dispatch : vuex store의 actions 에 선언한 메서드를 호출하기 위해 사용
        })
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";

#mapContainer {
  @include center;
  width: 100%;
  height: 35%;

  #map {
    width: 80%;
    height: 90%;
    border-radius: 10px;
  }
}
</style>
