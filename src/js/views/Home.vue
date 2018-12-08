<template>
  <div class="app">
    <clock />
    <weather />
    <transit />
  </div>
</template>

<script>
import Clock from '@/components/Clock'
import Weather from '@/components/Weather'
import Transit from '@/components/Transit'

export default {
  name: 'home',
  components: {
    Clock,
    Weather,
    Transit
  }
}
</script>

<style scoped lang="scss">
.app {
  width: 500px;
  text-align: left;
}
</style>
