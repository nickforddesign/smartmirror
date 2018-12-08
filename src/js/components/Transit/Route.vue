<template>
  <div class="route">
    <icon
      :data="data.attributes" />
    <div>
      {{ stop_name }}
    </div>
    <ride
      v-for="(prediction, direction_id) in predictions"
      :data="prediction[0]"
      :direction_name="data.attributes.direction_names[direction_id]"
      :key="direction_id" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { request } from '@/utils'
import Ride from './Ride'
import Icon from './Icon'

const api_root = 'https://api-v3.mbta.com'
// const api_key = 'c71571c617d7416e98045492cadc0a03'

export default {
  name: 'route',
  props: {
    data: Object,
    predictions: Object
  },
  components: {
    Icon,
    Ride
  },
  data() {
    return {
      stop: null
    }
  },
  mounted() {
    this.data && this.fetchStop()
  },
  computed: {
    stop_name() {
      if (this.stop) {
        return this.stop.attributes.name
      }
    }
  },
  methods: {
    async fetchStop() {
      const stop_id = this.predictions[0][0].relationships.stop.data.id
      this.stop = (await request(`${api_root}/stops/${stop_id}`)).data
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.route {
  margin-bottom: 12px;
}
</style>
