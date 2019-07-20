<template>
  <div class="head">
    <div class="search">
      <router-link to="/"><img class="appicon" src="@/assets/appicon.png"/></router-link>
      <input
        type="search"
        class="search-field"
        autocomplete="off"
        v-model="query"
        placeholder="Search for your favorite phrase ... (eg. festivus)"
      />
    </div>
    <div class="contact">
      <span class="right">&copy;Scenegifs</span>
      <span class="left"><a href="mailto:info@scenegifs.com">info@scenegifs.com</a></span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Header',
  props: ['initial_query', 'min_chars'],
  data () {
    return {
      query: ''
    }
  },
  created () {
    //this.query = this.$props.initial_query || ''
  },
  watch: {
    '$route' (to, from) {
      this.query = to.params.query || ''
    },
    query: function () {
      if (this.query.length > this.$props.min_chars || 3) {
        this.$emit('input', this.query)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a { color: #42b983; }
  .contact {
      font-size: 10px;
      text-align: center;
      height: 16px;

      padding-bottom: 8px;
      margin-bottom: 8px;
      border-bottom: solid 1px #f1f1f1;
  }

  .loader { text-align: center; }
  .empty { text-align: left; }
  .left { float: left; }
  .right { float: right; }
  .search-field {
    width: 100%;
    border: solid 1px lightgray;
    padding: 8px;
    font-size: 16px;
    border-radius: 2px;
    margin: 8px 0px;
    -webkit-appearance: none;
  }

  .appicon {
    width: 64px;
    position: absolute;
    top: 0px; left: 0px;
  }
</style>
