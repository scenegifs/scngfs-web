<template>
  <div class="scngfs">
    <div class="instructions" v-show="instructions">
      <img src="@/assets/instructions.jpg" @click="instructions=false"/>
    </div>
    <div class="head">
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
      <span class="center" v-show="results.length > 0">Searching in {{catalogName()}} {{results.length}} results</span>
      <span class="left"><a href="mailto:info@scenegifs.com">info@scenegifs.com</a></span>
    </div>
    <div class="upper-banner">
      <a @click="showInstructions()">
        Need help?
      </a>
    </div>
    <!--
    <div class="mid-banner">
      <router-link to="/dearjerry"> An appeal to Jerry Seinfeld </router-link>
    </div>
    -->
    <div class="results">
      <Scene
        v-for="result in paged()"
        @click.native="edit(result)"
        :key="sceneKey(result)"
        :scene="result"
      />
      <a
        class="more-btn"
        v-show="isMore()"
        @click="doMore()"
      >More</a>
      <div class="loader" v-show="searching"><img src="@/assets/ajax-loader.gif"></div>
      <div class="empty"  v-show="results.length <= 0 && !searching">
        <h2> No results </h2>
      </div>
    </div>
    <Editor ref="editor" :instructions="showInstructions"/>
  </div>
</template>

<script>

import Scene from './Scene'
import Editor from './Editor'
import TopSearch from './TopSearch'
import SETTINGS from './Settings'
import {GifID, Fetcher} from './Utils'
import {event} from 'vue-analytics'

const PER_PAGE = 12

export default {
  name: 'Search',
  metaInfo: {
    title: 'Scenegifs',
    titleTemplate: null,
    meta: [ ]
  },
  data () {
    return {
      searching: true,
      instructions: false,
      query: '',
      results: [],
      fetch: new Fetcher(),
      pages: 1
    }
  },
  created () {
    this.query = this.$route.params.query || ''
    this.catalog = this.$route.params.catalog || SETTINGS.catalog
    this.searching = this.query.length > 3
  },
  watch: {
    '$route' (to, from) {
      this.query = to.params.query || ''
    },
    query: function () {
      if (this.query.length > 3) {
        var self = this
        var url = SETTINGS.service_url + '/search/' + self.query + '?c=' + this.catalog
        self.searching = true
        self.fetch.fetchJSON(url)
          .then(results => {
            self.pages = 1
            self.results = results[this.catalog].map(result => { return {...result, nstart: result.n, nend: result.n} })
            self.$router.replace({path: self.query})
            self.searching = false
            event('search', this.catalog, self.query)
          })
          .catch(exeption => {})
      } else {
        this.$router.replace({path: this.query})
        this.results = []
        this.pages = 1
      }
    }
  },
  methods: {
    showInstructions () {
      this.instructions = true
      event('instructions', 'open', '')
    },
    paged () {
      return this.results.slice(0, PER_PAGE * this.pages)
    },
    isMore () {
      return this.pages * PER_PAGE < this.results.length
    },
    doMore () {
      this.pages++
      event('link', 'more', this.query)
    },
    edit (scene) {
      this.$refs.editor.scene = scene
      this.$refs.editor.open = true
      event('editor', 'open', scene.catalog + scene.index + ' / ' + this.query)
    },
    sceneKey (scene) {
      var key = GifID(scene.catalog, scene.index, scene.n, scene.n)
      return key
    },
    catalogName () {
      return SETTINGS.catalogs[this.catalog]
    }
  },
  components: {Scene, Editor, TopSearch}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
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

  .head {
    position: relative;
    padding-left: 68px;
    padding-top: 6px;
    height: 64px;
  }
  .appicon {
    width: 64px;
    position: absolute;
    top: 0px; left: 0px;
  }

  .more-btn {
    border: solid 1px #f1f1f1;
    padding: 8px;
    margin: 16px auto;
    display: block;
    width: 128px;
    text-align: center;
  }

  .upper-banner {
    text-align: center;
    background-color: #42b983;
  }

  .upper-banner a {
    font-size: 16px;
    color: white;
    cursor: pointer;
  }
  .mid-banner {
    background-color: orange;
    text-align: center;
    padding: 8px 0px;
    margin: 8px 0px;
  }
  .mid-banner a {
    color: white;
    font-weight: bold;
    cursor: pointer;
  }

  .instructions {
    height: 100vh;
    width: 100vw;
    text-align: center;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 10;
  }

  .instructions img {
    height: inherit;
    width: auto;
  }

  .small .instructions img {
    height: inherit;
    width: inherit;
  }

  .scngfs {
    position: relative;
    z-index: 0;
    box-sizing: border-box;
  }
</style>
<style>
  .small .empty a:nth-child(2n) .scene,
  .medium .empty  a:nth-child(2n+1) .scene {
    display: none;
  }
</style>
