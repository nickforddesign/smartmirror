<template>
  <div>
    <h2>
      {{ long_date }}
    </h2>
    <div class="time">
      {{ time }}
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'

export default {
  name: 'clock',
  data () {
    return {
      date: null
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    update () {
      this.date = moment()
    },
    start () {
      this.$options.interval = setInterval(() => this.update(), 1000)
    },
    stop () {
      clearInterval(this.$options.interval)
    }
  },
  computed: {
    time() {
      if (this.date) {
        return this.date.format('H:MMa')
      }
    },
    long_date() {
      if (this.date) {
        return this.date.format('LL')
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.time {
  font-size: 3em;
}
</style>
