import axios from "axios";

export default {
  nemaspaced: true,
  // state : 실제로 취급 할 데이터
  // 초기값 세팅 - vue에서 data() / setup() 부분
  state: {
    // default 값으로 서울 좌표를 넣어둠
    position : {
      lat : 37.5683,
      lon : 126.9778,
    },
    cityName: "Seoul",
    currentWeather: {
      // MainView.vue 에서 사용
      currentTemp: 0,
      currentHumidity: 0,
      currentWindSpeed: 0,
      currentFeelsLike: 0,
      // SubView.vue 에서 사용
      currentSunrise: 0,
      currentSunset: 0,
      currentVisibility: 0,
    },
  },
  // getters : 계산 된 상태의 데이터를 만들어내는 속성
  getters: {},
  // mutations : 변이 메서드, 우리가 관리하는 state 데이터를 변경시켜줄 수 있음
  mutations: {
    // state의 값을 vue에서 전달받은 데이터로 값 변경해주기 위해 사용 / vue에서 methods 비슷
    SET_LATLON(state, payload) {
      state.position.lat = payload.Ma;
      state.position.lon = payload.La;
    },
    SET_CITYNAME(state, payload) {
      state.cityName = payload.name;
    },
    SET_CURRENT_WEATHER(state, payload) {
      console.log( payload)
      state.currentWeather.currentTemp = payload.main.temp;
      state.currentWeather.currentHumidity = payload.main.humidity;
      state.currentWeather.currentWindSpeed = payload.wind.speed;
      state.currentWeather.currentFeelsLike = payload.main.feels_like;
      state.currentWeather.currentSunrise = payload.sys.sunrise;
      state.currentWeather.currentSunset = payload.sys.sunset;
      state.currentWeather.currentVisibility = payload.visibility;
    },
  },
  // actions : 특정한 데이터를 직접적으로 수정하는 것이 허용되지 않음 , 비동기로 동작함
  actions: {
    async FETCH_OPENWEATHER_API(context) {
      const apiKey = "0ec6391236b6cddb6eb1d40c5118922e";
      let initiaiLat = context.state.position.lat;
      let initiaiLon = context.state.position.lon;
      console.log(initiaiLat)

      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${initiaiLat}&lon=${initiaiLon}&appid=${apiKey}`
        );
        console.log(res);
        context.commit("SET_CURRENT_WEATHER", res.data);
        context.commit("SET_CITYNAME", res.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
