<template>
  <div class="transit">
    <h3>Transit schedule</h3>
    <div v-if="fetched">
      <route
        v-for="(route, key, index) in routes"
        :data="route"
        :predictions="predictions_sorted[key]"
        :key="index" />
    </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import { request, sleep } from '@/utils'
import Route from './Route'

const api_root = 'https://api-v3.mbta.com'
const api_key = process.env.MBTA_KEY

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
  computed: {
    ...mapGetters([
      'coords'
    ])
  },
  methods: {
    init () {
      this.subscribe()
    },
    async subscribe() {
      this.fetch()
      await sleep(60000)
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
      this.predictions = await request(`${api_root}/predictions?filter%5Blatitude%5D=${this.coords.latitude}&filter%5Blongitude%5D=${this.coords.longitude}&include=stop,route,trip,schedule&api_key=${api_key}`)
      this.mapRoutes(this.predictions)
    },
    async fetchRoutes() {
      for (const route in this.routes) {
        this.routes[route] = (await request(`${api_root}/routes/${route}?api_key=${api_key}`)).data
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
