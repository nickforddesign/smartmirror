<template>
  <div>
    <div class="time">
      {{ hh }}:{{ mm }}:{{ ss }}
    </div>
    <div class="info">
      {{ long_date }}
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]
export default {
  name: 'clock',
  data () {
    return {
      year: null,
      month: null,
      day: null,
      date: null,
      hh: 0,
      mm: 0,
      ss: 0,
      ms: 0
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    update () {
      const now = new Date()
      this.year = now.getFullYear()
      this.month = months[now.getMonth()]
      this.day = days[now.getDay()]
      this.date = now.getDate()
      this.hh = `${now.getHours()}`.padStart(2, 0)
      this.mm = `${now.getMinutes()}`.padStart(2, 0)
      this.ss = `${now.getSeconds()}`.padStart(2, 0)
    },
    start () {
      this.$options.interval = setInterval(() => this.update(), 1000)
    },
    stop () {
      clearInterval(this.$options.interval)
    }
  },
  computed: {
    long_date() {
      if (this.date) {
        return `${this.day}, ${this.month} ${this.date}, ${this.year}`
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
