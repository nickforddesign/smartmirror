<template>
  <div class="route">
    <icon
      :data="data.attributes"
    />
    <div v-for="(prediction, direction_id) in predictions" :key="direction_id">
      {{ data.attributes.direction_names[direction_id] }}
      <ride :data="prediction[0]" />
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Ride from './Ride'
import Icon from './Icon'
export default {
  name: 'route',
  props: {
    data: Object,
    predictions: Object
  },
  components: {
    Icon,
    Ride
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>
