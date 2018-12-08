<template>
  <div class="transit">
    <div v-if="fetched">
      <route
        v-for="(route, key, index) in routes"
        :data="route"
        :predictions="predictions_sorted[key]"
        :key="index" />
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import Ride from './Ride'
import Route from './Route'
import { request, sleep } from '@/utils'

const api_root = 'https://api-v3.mbta.com'
const api_key = 'c71571c617d7416e98045492cadc0a03'

export default {
  name: 'transit',
  data() {
    return {
      fetched: false,
      predictions: null,
      predictions_sorted: {},
      routes: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((p) => this.updatePosition(p))
      }
    },
    updatePosition (position) {
      const { latitude, longitude } = position.coords
      this.latitude = latitude
      this.longitude = longitude
      this.subscribe()
    },
    async subscribe() {
      this.fetch()
      await sleep(10000)
      this.subscribe()
    },
    async mapRoutes({ data }) {
      data.map(prediction => {
        const route = prediction.relationships.route.data.id
        const direction = prediction.attributes.direction_id
        if (!(route in this.routes)) {
          this.$set(this.routes, route, null)
          this.$set(this.predictions_sorted, route, { 0: [], 1: [] })
        }
        this.predictions_sorted[route][direction].push(prediction)
      })
      await this.fetchRoutes()
      this.sortPredictions()
    },
    async fetch () {
      this.predictions = await request(`${api_root}/predictions?filter%5Blatitude%5D=${this.latitude}&filter%5Blongitude%5D=${this.longitude}&include=stop,route,trip,schedule&api-key=${api_key}`)
      this.mapRoutes(this.predictions)
    },
    async fetchRoutes() {
      for (const route in this.routes) {
        this.routes[route] = (await request(`${api_root}/routes/${route}`)).data
      }
    },
    sortPredictions() {
      const now = new Date()
      for (const route in this.predictions_sorted) {
        for (const direction_id in this.predictions_sorted[route]) {
          this.predictions_sorted[route][direction_id] = this.predictions_sorted[route][direction_id]
            .map(item => {
              item.departure_time = new Date(item.attributes.departure_time)
              return item
            })
            .filter(item => {
              return now < item.departure_time
            })
            .sort((a, b) => {
              const first = a.departure_time
              const second = b.departure_time
              return first < second ? -1 : 1
            })
        }
      }
      this.fetched = true
    }
  },
  components: {
    Route
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.transit {
  margin-top: 10px;
}
.route-id {
  display: inline-block;
  padding: 2px 4px;
  background: #333;
  color: #fff;
  border-radius: 3px;
}
</style>
