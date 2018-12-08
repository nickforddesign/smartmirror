<template>
  <div class="flex">
    <div class="grow direction">
      {{ direction_name }}
    </div>
    <div class="time">
      {{ message }}
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'ride',
  props: {
    data: Object,
    direction_name: String
  },
  computed: {
    departure() {
      const departure_time = new Date(this.data.departure_time)
      const now = new Date()
      const diff_ms = departure_time - now
      return Math.round((diff_ms / 1000) / 60)
    },
    message() {
      return this.data
        ? `${this.departure} minutes away`
        : '–'
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.flex {
  width: 100%;
}

.direction {
  text-transform: uppercase;
}

.time {
  font-weight: bold;
}
</style>
