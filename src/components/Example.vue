<template lang="pug">
  section
    .container
      p {{ message }}
</template>

<script>

export default {
  data () {
    return {
      message: 'Example Vue component',
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
}
img {
  max-width: 200px;
}
</style>