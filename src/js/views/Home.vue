<template>
  <div class="app" v-if="coords">
    <clock />
    <weather />
    <transit />
  </div>
  <loading v-else />
</template>

<script>
import { mapGetters } from 'vuex'
import Clock from '@/components/Clock'
import Weather from '@/components/Weather'
import Transit from '@/components/Transit'

export default {
  name: 'home',
  components: {
    Clock,
    Weather,
    Transit
  },
  computed: {
    ...mapGetters([
      'coords'
    ])
  },
  async mounted() {
    await this.$store.dispatch('get_position')
  }
}
</script>

<style scoped lang="scss">
.app {
  width: 500px;
  text-align: left;
}
</style>
