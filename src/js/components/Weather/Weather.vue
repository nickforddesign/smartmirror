<template>
  <div class="weather">
    <h3>Weather</h3>
    here
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import { request } from '@/utils'

const api_root = 'https://api.openweathermap.org'
const api_key = process.env.OPENWEATHERMAP_KEY

export default {
  name: 'weather',
  data() {
    return {
      data: null
    }
  },
  computed: {
    ...mapGetters([
      'coords'
    ])
  },
  mounted() {
    this.fetchCurrentWeather()
  },
  methods: {
    async fetchCurrentWeather() {
      this.data = await request(`${api_root}/data/2.5/weather?lat=${this.coords.latitude}&lon=${this.coords.longitude}&appid=${api_key}`)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>
