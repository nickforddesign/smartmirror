<template>
  <div class="info">
    <component :is="type" />
    <div
      class="name"
      :style="styles">
      {{ name }}
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Bus from '@/components/icons/Bus'
import Train from '@/components/icons/Train'
export default {
  name: 'icon',
  props: {
    data: Object
  },
  computed: {
    styles() {
      return {
        ...this.colors
      }
    },
    type() {
      return this.data.description === 'Rapid Transit'
        ? 'train'
        : 'bus'
    },
    colors() {
      return this.type === 'train'
        ? {
          backgroundColor: `#${this.data.color}`,
          color: `#${this.data.text_color}`
        }
        : {
          backgroundColor: '#333',
          color: '#fff'
        }
    },
    name() {
      return this.type === 'train'
        ? this.data.long_name
        : `${this.data.short_name} Bus`
    }
  },
  components: {
    Bus,
    Train
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.info {
  display: flex;
  align-items: center;
  // justify-content: center;
}
.icon {
  display: inline-block;
}
.name {
  display: inline-block;
  padding: 6px 8px;
  border-radius: 4px;
}
</style>
