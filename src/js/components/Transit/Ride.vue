<template>
  <div>
    {{ message }}
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'ride',
  props: {
    data: Object
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

</style>
