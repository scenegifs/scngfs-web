<template>
    <div class="catalog-results">
      <QuickSearch
        v-for="result in results"
        :key="result.catalog"
        :catalog="result.catalog"
        :count="result.count"
        :query="$props.query"
      />
      <div class="loader" v-show="searching"><img src="@/assets/ajax-loader.gif"></div>
      <div class="no-results"  v-show="results.length <= 0 && !searching">
          <h2> Popular choices <span>(no results)</span> </h2>
          <router-link :to="{name: 'Search', params:{catalog: clip.catalog, query: clip.kw}}" class="scene" v-for="clip in topClips" :key="clip.source">
            <img :src="url(clip.scene)" :title="clip.kw"/>
          </router-link>
      </div>
    </div>
</template>

<script>
import Scene from './Scene'
import QuickSearch from './QuickSearch'
import {GifID, Fetcher} from './Utils'
import SETTINGS from './Settings'
import {event} from 'vue-analytics'

export default {
  name: 'CatalogSearch',
  props: ['query', 'updateUrl'],
  data () {
    return {
      searching: false,
      results: [],
      fetch: new Fetcher(),
      topClips: [
        {scene: 'seinfeld60705770585', kw: 'big salad', catalog: 'seinfeld'},
        {scene: 'seinfeld71004430446', kw: 'it\'s chewy', catalog: 'seinfeld'},
        {scene: 'seinfeld80700800085', kw: 'umbrella', catalog: 'seinfeld'},
        {scene: 'seinfeld41604070408', kw: 'get a good look', catalog: 'seinfeld'},
        {scene: 'seinfeld30303390345', kw: 'you don\'t like the pen', catalog: 'seinfeld'},
        {scene: 'seinfeld60704700472', kw: 'soup and a sandwich', catalog: 'seinfeld'},
        {scene: 'seinfeld91002450246', kw: 'understated stupidity', catalog: 'seinfeld'},
        {scene: 'seinfeld30301890197', kw: 'take the pen', catalog: 'seinfeld'},
        {scene: 'seinfeld10204290433', kw: 'i\'m an architect', catalog: 'seinfeld'},
        {scene: 'seinfeld90202730284', kw: 'ironman', catalog: 'seinfeld'},
        {scene: 'seinfeld41604190423', kw: 'cleavage', catalog: 'seinfeld'},
        {scene: 'seinfeld20604630463', kw: 'the book is great', catalog: 'seinfeld'}
      ]
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
    url (scene) {
      return SETTINGS.service_url + '/' + scene + '.gif'
    },
    search () {
      var self = this
      if (self.$props.query.length > 3) {
        var url = SETTINGS.service_url + '/search/' + this.$props.query
        self.searching = true
        self.fetch.fetchJSON(url)
          .then(results => {
            var newResults = []
            for (var catalog in results) {
              newResults[newResults.length] = {catalog, count: results[catalog]}
            }
            newResults.sort((a, b) => b.count - a.count)
            self.results = newResults
            if (this.$props.updateUrl) self.$router.replace({path: self.$props.query})
            self.searching = false
            event('search', 'index', self.$props.query)
          })
          .catch(exception => { this.results = [] })
      } else {
        if (this.$props.updateUrl) self.$router.replace({path: self.$props.query})
        self.results = []
      }
    },
    sceneKey (scene) {
      return GifID(scene.catalog, scene.index, scene.n, scene.n)
    }
  },
  components: {Scene, QuickSearch}
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
  .scene { display: inline-block; margin: 4px; }
</style>
