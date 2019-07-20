<template>
  <div class="quick-results">
    <h2>
      <router-link :to="{name:'Search', params:{catalog:$props.catalog, query:$props.query}}">
        {{count || fullResults.length}} results in {{catalogName}}
      </router-link>
    </h2>
    <router-link
      v-for="result in results"
      :key="sceneKey(result)"
      :to="{name:'Search', params:{catalog:$props.catalog, query:$props.query}}"
    >
      <Scene :scene="result"/>
    </router-link>
    <div class="loader" v-show="searching"><img src="@/assets/ajax-loader.gif"></div>
    <div class="empty"  v-show="results.length <= 0 && !searching"> No results </div>
  </div>
</template>

<script>
import Scene from './Scene'
import {GifID, Fetcher} from './Utils'
import SETTINGS from './Settings'

export default {
  name: 'QuickSearch',
  props: ['query', 'catalog', 'count'],
  data () {
    return {
      searching: false,
      results: [],
      fullResults: [],
      fetch: new Fetcher(),
      catalogName: SETTINGS.catalogs[this.catalog]
    }
  },
  watch: {
    '$props.query' () {
      this.search()
    }
  },
  mounted () {
    this.search()
  },
  methods: {
    search () {
      var self = this
      self.results = []
      self.fullResults = []
      if (this.$props.query.length <= 3) return

      var url = SETTINGS.service_url + '/search/' + this.$props.query + '?c=' + this.$props.catalog
      self.searching = true
      this.fetch.fetchJSON(url)
        .then(results => {
          var newResults = results[this.$props.catalog].map(result => { return {...result, nstart: result.n, nend: result.n} })
          self.fullResults = newResults
          self.results = newResults.slice(0, 3)
          self.searching = false
        })
        .catch(exeption => { this.results = [] })
    },
    sceneKey (scene) {
      return GifID(scene.catalog, scene.index, scene.n, scene.n)
    }
  },
  components: {Scene}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  h2 {
    background-color: #f1f1f1;
    padding: 8px;
    margin: 4px 0px;
  }
  h2 span {
    font-size: 12px;
    float: right;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .loader, .empty { text-align: center; }
  .left { float: left; }
  .right { float: right; }
</style>
