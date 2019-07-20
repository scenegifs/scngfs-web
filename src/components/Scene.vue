<template>
      <div class="scene">
        <img :src="url" v-on:load="loaded=true">
        <img class="loader" v-show="!loaded" src="@/assets/ajax-loader.gif">
        <span class="episode">{{scene.index}}</span>
        <span class="phrase" v-show="!loaded">{{scene.content}}</span>
      </div>
</template>

<script>

import Lines from './Lines'
import {sceneID} from './Utils'
import SETTINGS from './Settings'

export default {
  name: 'Scene',
  data () {
    return {
      scene: { },
      loaded: false,
      url: ''
    }
  },
  watch: {
    scene () {
      this.url = SETTINGS.service_url + '/' + sceneID(this.scene)
    }
  },
  mounted () {
    var scene = this.$attrs.scene
    this.scene = scene
  },
  components: { Lines }
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

  .scene .btn {display: none;}
  .scene:hover .btn {display: block;}

  .phrase {
    color: #f1f1f1;
    position: absolute;
    bottom: 4px;
    left: 0px;
    width: 100%;
    text-align: center;
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
</style>
