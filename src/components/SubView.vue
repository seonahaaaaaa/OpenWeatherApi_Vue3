<template>
  <div class="rightContainer">
    <div id="cityNameBox">
      <div class="cityName">
        <p>{{ cityName }}</p>
        <p>{{ currentTime }}</p>
      </div>
    </div>
    <div id="contentsBox">
      <div class="buttonBox">
        <div class="buttonBackground">
          <button class="forecast">Forecast</button>
          <button class="airquality">Air Quality</button>
        </div>
      </div>
      <div class="weatherBox">
        <div class="airCondition">
          <p>{{feeling}}</p>
        </div>
        <div class="detail">
          <div class="title">
            <p>🌈상세한 날씨 데이터🌞</p>
          </div>
          <div class="data" v-for="(i,idx) in subWeatherData" :key="idx">
            <div class="dataName">
              <p></p>
              <p>{{ i.name }}</p>
            </div>
            <div class="dataValue">
              <p>{{ i.value }}<span></span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheMap />
    <nav>
      <i class="fas fa-home"></i>
      <i class="fas fa-search-location"></i>
      <i class="fas fa-chart-line"></i>
      <i class="fas fa-cog"></i>
    </nav>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { ref, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
import TheMap from "./Map.vue";
import "dayjs/locale/ko";
dayjs.locale("ko");
export default {
  name: "TheSubView",
  components: {
    TheMap,
  },
  setup() {
    let currentTime = dayjs().format("YYYY. MM. DD. ddd");
    let cityName = ref(""); // 도시 이름을 나타내는 데이터
    let feeling = ref(""); // 현재 온도에 대한 체감을 나타내는 데이터
    let subWeatherData = ref([]);

    const store = useStore();
    const fetchOpenWeatherApi = async () => {
      
      try {
          await store.dispatch("FETCH_OPENWEATHER_API");
          const { currentSunrise, currentSunset, currentVisibility, currentFeelsLike} = store.state.openWeatherApi.currentWeather;
           // console.log(response);
            let isInitialCityName = store.state.openWeatherApi.cityName;
            let isFeelLikeTemp = currentFeelsLike;
            let isTimeOfSunrise = currentSunrise;
            let isTimeOfSunset = currentSunset;
            let isLineOfSight = currentVisibility;

            cityName.value = isInitialCityName;

            let isProcessedData = [
                { name : "일출시간" , value: isTimeOfSunrise },
                { name : "일몰시간" , value: isTimeOfSunset },
                { name : "가시거리", value : isLineOfSight }
            ];
            subWeatherData.value = isProcessedData;

            // if(isFeelLikeTemp > 30) feeling.value = "매우더움";
            // if(isFeelLikeTemp < 30) feeling.value = "더움";
            // if(isFeelLikeTemp < 25) feeling.value = "보통";
            // if(isFeelLikeTemp < 20) feeling.value = "선선함";
            // if(isFeelLikeTemp < 15) feeling.value = "쌀쌀함";
            // if(isFeelLikeTemp < 10) feeling.value = "추움";
            // if(isFeelLikeTemp < 0) feeling.value = "매우추움";

            const tempPoints = [30,25,20,15,10,5,0];
            const lavels = ["매우더움","더움","보통","선선함","쌀쌀함","추움","매우추움"];
            let index = 0;
            for(const i of tempPoints){ 
                if (isFeelLikeTemp > i ) break;
                index++;
            }
            feeling.value = lavels[index];

      } catch (err) {
        console.log(err);
      }
    };
    onMounted(()=>{ // 페이지 로딩 될 때 실행되는 로직
      fetchOpenWeatherApi();
    })
    watchEffect(async()=>{
      await fetchOpenWeatherApi();
    })
    return { currentTime, cityName, subWeatherData, feeling };
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";

.rightContainer {
  // width: 40%;
  // height: 100%;
  width: 324px;
  min-width: 324px;
  height: 700px;
  border-radius: 50px;
  background: linear-gradient(#cb0000, #0e1239);
  box-shadow: 5px 5px 10px gray;

  #cityNameBox {
    width: 100%;
    height: 10%;

    .cityName {
      @include c-center;
      width: 100%;
      height: 100%;

      p {
        color: white;
        font-family: "Poppins", sans-serif;
        line-height: 2.5;
        text-align: center;

        &:first-child {
          width: 241px;
          height: 8px;
          font-size: 1.35rem;
        }
        &:last-child {
          width: 160px;
          height: 19px;
          font-size: 0.9rem;
          font-weight: 100;
        }
      }
    }
  }

  #contentsBox {
    width: 100%;
    height: calc(45% - 16px);
    margin-top: 16px;

    .buttonBox {
      @include center;
      width: 100%;
      height: 20%;

      .buttonBackground {
        width: 224px;
        height: 35px;
        background-color: #370505;
        border-radius: 10px;
        display: flex;

        button {
          width: 112px;
          height: 35px;
          border: 0;
          border-radius: 7.5px;
          outline: 0;
          cursor: pointer;
          &.forecast {
            background-color: transparent;
            color: #a52727;
          }
          &.airquality {
            background: #ff0000;
            color: white;
          }
        }
      }
    }
    .weatherBox {
      width: 100%;
      height: 80%;

      .airCondition {
        @include center;
        width: 100%;
        height: 35%;

        p {
          text-align: center;
          font-size: 2.25rem;
          font-weight: 500;
          font-family: "GmarketSansBold";
          color: #fff;
        }
      }
      .detail {
        width: 100%;
        height: 65%;

        .title {
          @include center;
          width: 100%;
          height: 25%;
          color: white;

          p {
            font-family: "LeferiPoint-WhiteObliqueA";
          }
        }
        .data {
          display: flex;
          width: 100%;
          height: 27.5%;
          // background-color: rgb(187, 127, 255);

          .dataName {
            display: flex;
            align-items: center;
            width: 50%;
            height: 100%;
            font-family: "LeferiPoint-WhiteObliqueA";

            p {
              &:first-child {
                display: block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #ffde23;
                margin-left: 50px;
              }
              &:last-child {
                margin-left: 10px;
                color: white;
                font-weight: 300;
                font-size: 0.9rem;
              }
            }
          }
          .dataValue {
            display: flex;
            align-items: center;
            justify-content: right;
            width: 50%;
            height: 100%;
            font-family: "LeferiPoint-WhiteObliqueA";

            p {
              color: white;
              font-weight: 300;
              margin-right: 50px;

              span {
                font-weight: 600;
              }
            }
          }
        }
      }
    }
  }

  nav {
    @include center-sb;
    width: calc(100% - 100px);
    height: 10%;
    padding: 0 50px;

    i {
      color: rgb(255, 255, 255);
      font-size: 1.15rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        color: #799ed0;
      }
    }
  }
}
</style>
