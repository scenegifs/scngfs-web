<template>
  <div class="scngfs">
    <div class="results">
      <h2>
        <router-link :to="$props.catalog + '/' + $attrs.query">#{{$attrs.rank}}. {{$attrs.query}}</router-link><span>({{results.length}} results)</span></h2>
      <router-link
        v-for="result in paged()"
        :key="sceneKey(result)"
        :to="$attrs.query"
      >
      <Scene :scene="result"/>
    </router-link>
      <div class="loader" v-show="searching"><img src="@/assets/ajax-loader.gif"></div>
      <div class="empty"  v-show="results.length <= 0 && !searching"> No results </div>
    </div>
  </div>
</template>

<script>

import Scene from './Scene'
import {GifID} from './Utils'
import SETTINGS from './Settings'

export default {
  name: 'TopSearch',
  props: ['onSelect', 'catalog'],
  data () {
    return {
      searching: false,
      results: []
    }
  },
  mounted () {
    var self = this
    self.searching = true
    var q = self.$attrs.query
    fetch(SETTINGS.service_url + '/search/' + q + '?c=' + this.$props.catalog,
      {
        headers: {'Authorization': SETTINGS.auth_token}
      })
      .then(res => {
        return res.json()
      })
      .then(results => {
        self.results = results[this.$props.catalog].map(result => { return {...result, nstart: result.n, nend: result.n} })
        self.searching = false
      })
      .catch(exeption => { this.results = [] })
  },
  methods: {
    edit (result) {
      this.$props.onSelect(result)
    },
    paged () {
      return this.results.slice(0, 3)
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

/*
'No soup for you',
'Serenity now',
'Festivus',
'Yada yada yada',
'George',
'Jerry',
'These pretzels are making me thirsty',
'Newman',
'Giddy',
'The sea was angry',
'I was in the pool'
*/
