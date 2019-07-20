<template>
  <div class="scngfs-clip">
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
      <a
        class="copy-btn"
        v-clipboard="copyURL"
        v-show="!loading"
      >{{btnText}}</a>
      <span v-show="loading">&nbsp;</span>
    </div>

    <div class="loader" v-show="loading"><img src="@/assets/ajax-loader.gif"></div>
    <div class="clip-container" v-show="query.length <= 3 && !loading">
      <video
        ref="video"
        autoplay
        playsinline
        loop
        @click="$refs.video.play()"
        :canPlay="canPlay()"
      >
        <source :src="url('mp4')" type="video/mp4"/>
      </video>

      <div class="mid-banner">
        <!--<router-link to="/dearjerry"> An appeal to Jerry Seinfeld </router-link>-->
        <a :href="url('gif') + '?d=1'" download class="copy-btn mp4">Download GIF</a>
        <a :href="url('mp4')" download class="copy-btn mp4">Download mp4</a>
      </div>
    </div>

    <CatalogSearch :query="query" v-show="query.length > 3" :updateUrl="false"/>

  </div>
</template>

<script>

import SETTINGS from './Settings'
import {GifID} from './Utils'
import {event} from 'vue-analytics'
import CatalogSearch from './CatalogSearch'

export default {
  name: 'Clip',
  metaInfo () {
    return {
      title: 'Scenegifs',
      titleTemplate: null,
      meta: [
        {name: 'description', content: 'Make your own GIFs from TV shows and movies'},
        {name: 'og:title', content: 'Scenegifs'},
        {name: 'og:description', content: 'Make your own GIFs from TV shows and movies'},
        {name: 'og:image', content: this.url('jpg')},
        {name: 'og:url', content: window.location.href},
        {name: 'og:video', content: this.url('mp4')},
        {name: 'og:type', content: 'video.other'}
      ]
    }
  },
  data () {
    return {
      loading: true,
      query: '',
      btnText: 'Copy link'
    }
  },
  methods: {
    canPlay () {
      if (this.$refs.video === undefined || this.$refs.video.readyState < 3) {
        var check = setInterval(() => {
          if (this.$refs.video !== undefined && this.$refs.video.readyState >= 3) {
            clearInterval(check)
            this.loading = false
            this.$refs.video.play()
          }
        }, 100)
      } else {
        this.loading = false
      }
    },
    copyURL () {
      var self = this
      var url = this.url('gif')
      var otext = this.btnText
      this.btnText = 'Link copied! :)'
      setTimeout(function () { self.btnText = otext }, 3000)
      event('link', 'copy', url)
      return url
    },
    url (format) {
      return SETTINGS.service_url + '/' + this.$route.params.scene + '.' + format
    },
    showInstructions () {
      this.instructions = true
      event('instructions', 'open', '')
    },
    sceneKey (scene) {
      return GifID(scene.catalog, scene.index, scene.n, scene.n)
    }
  },
  components: {CatalogSearch}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .clip-container {
    text-align: center;
    width: 100%;
    min-height: 240px;
    padding: 4px;
    box-sizing: border-box;
    position: relative;
  }

  .clip-container .loader {
    position: absolute;
    top: 50%; left: 50%;
    margin-left: -64px;
    z-index: 10;
  }

  video {
    width: 100%;
    max-width: 640px;
  }
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
    margin-bottom: 8px;
    padding: 4px;
  }

  .upper-banner a {
    font-size: 16px;
    color: white;
    cursor: pointer;

  }
  .mid-banner {
    background-color: orange;
    text-align: center;
    padding: 4px 0px;
    margin: 0px 0px;
  }
  .mid-banner a {
    color: white;
    font-weight: bold;
    cursor: pointer;
    font-size: 12px
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
