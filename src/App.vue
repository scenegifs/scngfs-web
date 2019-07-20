<template>
  <div id="app" :class="screenClass">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      screenClass: window.innerWidth < 656 ? 'small' : window.innerWidth < 984 ? 'medium' : 'large'
    }
  },
  methods: {
    doResize () {
      this.screenClass = window.innerWidth < 656 ? 'small' : window.innerWidth < 984 ? 'medium' : 'large'
    }
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.doResize)
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.doResize)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin: 20px auto;
  max-width: 984px;
}

#app.medium { max-width: 656px; }
#app.small { max-width: 328px; }

</style>
