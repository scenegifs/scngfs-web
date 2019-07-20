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
      <span class="center">Searching in everything</span>
      <span class="left"><a href="mailto:info@scenegifs.com">info@scenegifs.com</a></span>
    </div>
    <div class="upper-banner">
      <a @click="showInstructions()"> Need help? </a>
    </div>
    <CatalogSearch :query="query" />
  </div>
</template>

<script>

import Scene from './Scene'
import Editor from './Editor'
import TopSearch from './TopSearch'
import CatalogSearch from './CatalogSearch'
import SETTINGS from './Settings'
import {GifID} from './Utils'
import {event} from 'vue-analytics'

export default {
  name: 'Index',
  metaInfo: {
    title: 'Scenegifs',
    titleTemplate: null
  },
  data () {
    return {
      instructions: false,
      query: ''
    }
  },
  created () {
    this.query = this.$route.params.query || ''
    this.catalog = this.$route.params.catalog || SETTINGS.catalog
  },
  watch: {
    '$route' (to, from) {
      this.query = to.params.query || ''
    }
  },
  methods: {
    showInstructions () {
      this.instructions = true
      event('instructions', 'open', '')
    },
    sceneKey (scene) {
      return GifID(scene.catalog, scene.index, scene.n, scene.n)
    }
  },
  components: {Scene, Editor, TopSearch, CatalogSearch}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  h2 span {
    font-size: 12px;
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
  .small .quick-results a:nth-child(2n) .scene,
  .medium .quick-results a:nth-child(2n+1) .scene {
    display: none;
  }
</style>
