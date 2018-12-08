<template>
  <div class="app">
    <clock />
    <transit />
  </div>
</template>

<script>
import Clock from '@/components/Clock'
import Transit from '@/components/Transit'

export default {
  name: 'home',
  components: {
    Clock,
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
