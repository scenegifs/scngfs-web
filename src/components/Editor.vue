<template>
      <div class="editor" v-show="open">
        <div class="overlay" @click="open=false"></div>
        <div class="modal">
          <img :src="getUrl()" v-on:load="loaded=true">
          <div class="tool-bar">
            <Spinner v-model="offset.end" max="10" min="0" class="right" title="Offset end by"/>
            <a
              class="copy-btn"
              v-clipboard="copyURL"
            >{{btnText}}</a>
            <Spinner v-model="offset.start" max="10" min="0" reverse class="left" title="Offset start by"/>
            <a :href="getUrl('mp4')" download class="copy-btn mp4">Download mp4</a>
          </div>
          <Lines ref="lines" v-model="scene"/>
          <img class="loader" v-show="!loaded" src="@/assets/ajax-loader.gif">
          <span class="episode">{{scene.index}}</span>
          <div class="footer-bar">
            <a @click="showInstructions()"> Need help? </a>
          </div>
        </div>
      </div>
</template>

<script>

import Lines from './Lines'
import Spinner from './Spinner'
import SETTINGS from './Settings'
import {sceneID} from './Utils'
import {event} from 'vue-analytics'

export default {
  name: 'Editor',
  props: ['instructions'],
  data () {
    return {
      open: false,
      scene: {catalog: 'seinfeld', index: '101', n: 0, nstart: 0, nend: 0},
      nindex: '1010',
      loaded: false,
      url: '',
      btnText: 'Copy link',
      offset: {
        start: 0,
        end: 0
      }
    }
  },
  watch: {
    'offset.start' () {
      this.updateURL()
    },
    'offset.end' () {
      this.updateURL()
    },
    scene () {
      var self = this
      this.updateURL()

      if (this.scene.index + this.scene.n !== this.nindex) {
        this.offset = { start: 0, end: 0 }
        this.nindex = this.scene.index + this.scene.n
        fetch(SETTINGS.service_url + '/lines/' + sceneID(this.scene) + '?json=true',
          {
            headers: {'Authorization': SETTINGS.auth_token}
          })
          .then(response => response.json())
          .then(lines => {
            self.$refs.lines.lines = lines
          })
      }
    }
  },
  methods: {
    showInstructions () {
      this.$props.instructions()
    },
    updateURL () {
      this.url = this.getUrl()
    },
    getUrl (format) {
      format = (format === undefined) ? '' : '.' + format
      var scnid = sceneID(this.scene)
      var options = ((this.offset.start << 4) | this.offset.end) << 1 | 0
      options = options > 0 ? String(options).padStart(2, '0') : ''
      return SETTINGS.service_url + '/' + scnid + options + format
    },
    copyURL () {
      var self = this
      var url = this.getUrl('gif')
      var otext = this.btnText
      this.btnText = 'Link copied! :)'
      setTimeout(function () { self.btnText = otext }, 3000)
      event('link', 'copy', url)
      return url
    },
    canShare () {
      return navigator.share !== undefined
    }
  },
  mounted () {
    var scene = this.$attrs.scene
    if (typeof scene !== 'undefined') this.scene = scene
  },
  components: { Lines, Spinner }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .scene {
    width: 320px;
    height: 240px;
    margin: 4px;

    display: inline-block;
    border: solid 1px #f1f1f1;
    box-sizing: border-box;
    position: relative;
  }

  .overlay {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100vw;
      height: 100vh;
      background: rgba(255,255,255,0.8)
  }

  .modal {
    width: 320px;
    height: 572px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -160px;
    border: solid 1px #f1f1f1;
    margin-top: -258px;
  }

  .modal img { margin-bottom: -6px; }

  .spinner.left { float: left; }
  .spinner.right { float: right; }

  .tool-bar {
    background-color: #42b983;
    color: white;
    display: block;
    text-align: center;
    padding: 4px 8px;
    cursor: pointer;
    text-align: center;
  }

  .tool-bar a {
    font-size: 14px;
    color: white;
    text-decoration: none;
  }

  .copy-btn {
    background-color: #42b983;
    color: white;
    text-align: center;
    padding: 6px 8px;
    cursor: pointer;
    display: inline-block;
  }

  .copy-btn.mp4 {
    display: block;
    border-top: dashed 1px #f1f1f1;
  }
  .episode {
    position: absolute;
    top: 0px; left: 0px;
    padding: 8px 8px;
    color: #f1f1f1;
  }
  .loader {
    position: absolute;
    left: 50%; top: 50%;
    opacity: .2;
    margin-left: -64px;
  }

  .footer-bar {
    text-align: center;
    background-color: #42b983;
    position: absolute;
    width: 100%;
    bottom: 0px;
    left: 0px;
  }

  .footer-bar a {
    font-size: 16px;
    color: white;
    cursor: pointer;
  }

</style>
