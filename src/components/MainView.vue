<template>
  <div class="leftContainer">
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
        <div class="weatherDegree">
          <p>{{ Math.round(currentTemp) }}&deg;</p>
        </div>
        <div class="weatherIcon">
          <img src="../assets/images/10d.png" />
        </div>
        <div class="weatherData">
          <div class="detailData" v-for="i in temporaryData" :key="i">
            <p>{{ i.title }}</p>
            <p>{{ i.value }}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="todayWeather">
      <div class="textBox">
        <p>시간대별 날씨 정보</p>
        <p>이번주 날씨 보기</p>
      </div>
      <div class="timelyWeatherBox">
        <div class="timelyWeather">
          <div class="icon">
            <img src="../assets/images/03d.png" />
          </div>
          <div class="data">
            <p class="time">2pm</p>
            <p class="currentDegree">32&deg;</p>
            <div>
              <img src="../assets/images/drop.png" alt="" />
              <p class="fall">15%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import "dayjs/locale/ko";
dayjs.locale("ko");

export default {
  name: "TheMainView",
  data() {
    return {
      // 현재 시간을 나타내기 위한 dayjs 플러그인 사용
      currentTime: dayjs().format("YYYY. MM .DD. ddd"), // 상세 날씨 데이터를 받아주는 데이터 할당
    };
  },

  async created() {
    // created : 초기 데이터 선언하는 코드
    await this.$store.dispatch("FETCH_OPENWEATHER_API");
    const { currentTemp, currentHumidity, currentWindSpeed, currentFeelsLike } =
      this.$store.state.openWeatherApi.currentWeather;
    this.currentTemp = currentTemp;
    this.temporaryData[0].value = currentHumidity;
    this.temporaryData[1].value = currentWindSpeed;
    this.temporaryData[2].value = currentFeelsLike;
  },
  computed: {
    cityName() {
        return this.$store.state.openWeatherApi.cityName;
    },
    currentTemp() {
        const {currentTemp } = this.$store.state.openWeatherApi.currentWeather;
        return currentTemp;
    },
    temporaryData() {
        const { currentHumidity , currentWindSpeed, currentFeelsLike}
        = this.$store.state.openWeatherApi.currentWeather;
        return [
        {
          title: "습도",
          value: currentHumidity + "%",
        },
        {
          title: "풍속",
          value: currentWindSpeed + "m/s",
        },
        {
          title: "체감온도",
          value: Math.round(currentFeelsLike) + "도",
        },
      ]
    }



  },
};
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";

.leftContainer {
  width: 324px;
  min-width: 324px;
  height: 700px;
  border-radius: 50px;
  background: linear-gradient(#16455f, #0e1239);
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
    height: 62.5%;

    .buttonBox {
      @include center;
      width: 100%;
      height: 20%;

      .buttonBackground {
        width: 224px;
        height: 35px;
        background-color: #052137;
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
            background-color: #0889ff;
            color: white;
          }
          &.airquality {
            background: transparent;
            color: #467599;
          }
        }
      }
    }

    .weatherBox {
      width: 100%;
      height: 80%;

      .weatherDegree {
        @include center;
        width: 100%;
        height: 15%;

        p {
          font-size: 3.5rem;
          font-weight: 500;
          font-family: "Be Vietnam Pro", sans-serif;
          color: white;
        }
      }
      .weatherIcon {
        @include center;
        width: 100%;
        height: 60%;

        img {
          height: 160px;
        }
      }
      .weatherData {
        display: flex;
        width: 100%;
        height: 25%;

        .detailData {
          @include c-center;
          width: 33.33%;
          height: 100%;
          // 레이아웃이 3개이기 때문에 동일한 레이아웃을 반복시킴을 알 수 있다.
          &:nth-child(1) {
            margin-left: 10px;
          }
          &:nth-child(2) {
            margin-left: 0 -10px;
          }
          &:nth-child(3) {
            margin-right: 10px;
          }

          p {
            line-height: 1.5;
            color: white;

            &:first-child {
              font-size: 1rem;
              font-weight: 300;
              font-family: "Noto Sans KR", sans-serif;
              color: #799ed0;
            }
            &:last-child {
              font-size: 1rem;
              font-weight: 200;
              font-family: "Poppins", sans-serif;
            }
          }
        }
      }
    }
  }

  #todayWeather {
    width: 100%;
    height: 17.5%;

    .textBox {
      @include center-sb;
      width: calc(100% - 70px);
      height: 35%;
      padding: 0 35px;
      font-family: "Noto Sans KR", sans-serif;

      p {
        font-weight: 400;
        font-size: 0.8rem;
        color: white;
        text-align: center;

        &:last-child {
          font-weight: 400;
          font-size: 0.8rem;
          color: #0085ff;
          cursor: pointer;
          margin-bottom: 2px;
        }
      }
    }
    .timelyWeatherBox {
      display: flex;
      align-items: center;
      width: calc(100% - 70px);
      height: 65%;
      padding: 0 30px;
      overflow: scroll;

      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }

      .timelyWeather {
        display: flex;
        width: 126px;
        min-width: 126px;
        height: 70px;
        background-color: #0989ff;
        border-radius: 20px;
        margin-left: 15px;

        &:first-child {
          margin-left: 0;
        }

        .icon {
          @include center;
          width: 45%;
          height: 100%;

          img {
            width: 100%;
          }
        }
        .data {
          @include c-center-se;
          width: 55%;
          height: 100%;
          margin-top: 8px;

          p {
            color: whitesmoke;
            font-family: "Poppins", sans-serif;
            text-align: center;

            &.time {
              font-size: 0.8rem;
              font-weight: 200;
              margin-bottom: -10px;
            }

            &.currentDegree {
              font-size: 1.2rem;
              margin-top: 7.5px;
            }
          }

          div {
            @include center;
            width: 100%;
            height: 33.33%;

            img {
              height: 55%;
            }
            .fall {
              font-size: 0.9rem;
              margin-top: -38.5px;
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
