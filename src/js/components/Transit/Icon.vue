<template>
  <div
    class="icon"
    :style="styles">
    {{ name }}
    <div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
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
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.icon {
  padding: 10px;
}
</style>
