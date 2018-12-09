<template>
  <div class="weather">
    <h3>Weather</h3>
    <div v-if="data">
      <div class="location">
        {{ data.name }}
      </div>
      <div class="temp current">
        <div class="weather-icon">
          <weather-icon :icon="weather_icon_name" />
          <!-- {{ weather_icon_name }} -->
        </div>
        {{ data.main.temp | round }}˚ F
      </div>
      <div class="temp min">
        Low: {{ data.main.temp_min | round }}˚ F
      </div>
      <div class="temp max">
        High: {{ data.main.temp_max | round }}˚ F
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import WeatherIcon from 'vue-weathericons'
import { request } from '@/utils'

const api_root = 'https://api.openweathermap.org'
const api_key = process.env.OPENWEATHERMAP_KEY
const units = 'imperial'

export default {
  name: 'weather',
  data() {
    return {
      data: null
    }
  },
  computed: {
    weather_icon_name() {
      const code = this.data.weather[0].id
      if (200 <= code && code < 300) {
        return 'day-thunderstorm'
      } else if (300 <= code && code < 400) {
        return 'day-sprinkle'
      } else if (500 <= code && code < 600) {
        return 'day-rain'
      } else if (600 <= code && code < 700) {
        return 'day-snow'
      } else if (700 <= code && code < 800) {
        return 'dust'
      } else if (code === 800) {
        return 'day-sunny'
      } else {
        return 'day-cloudy'
      }
    },
    ...mapGetters([
      'coords'
    ])
  },
  mounted() {
    this.fetchCurrentWeather()
  },
  methods: {
    async fetchCurrentWeather() {
      this.data = await request(`${api_root}/data/2.5/weather?lat=${this.coords.latitude}&lon=${this.coords.longitude}&appid=${api_key}&units=${units}`)
    }
  },
  components: {
    WeatherIcon
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.weather-icon {
  display: inline-block;
}
.temp {
  &.current {
    font-size: 1.7em;
    font-weight: bold;
  }
}
</style>
