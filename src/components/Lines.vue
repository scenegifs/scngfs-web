<template>
      <div :class="['lines']">
        <div
          :class="lineClass(line.n)"
          :key="line.n"
          v-for="line in lines"
          v-on:click="handleLinePress(line.n)"
        >
          {{line.content}}
        </div>
      </div>
</template>

<script>

export default {
  name: 'Lines',
  props: ['value'],
  data () {
    return {
      scene: {},
      lines: []
    }
  },

  methods: {
    lineClass (n) {
      if (n === this.value.nstart || n === this.value.nend) return 'line selected'
      if (n > this.value.nstart && n < this.value.nend) return 'line middle'
    },
    handleLinePress (line) {
      var start = typeof this.value.nstart !== 'undefined' ? this.value.nstart : this.value.n
      var end = typeof this.value.nend !== 'undefined' ? this.value.nend : this.value.n

      if (line < start) start = line
      else if (line > end) end = line
      else if (line - start < end - line) start = line
      else end = line
      this.$emit('input', {
        ...this.value,
        nstart: start,
        nend: end
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .lines {
    position: absolute;
    left: 0px;
    height: 240px;
    width: 96%;
    padding: 0% 2%;
    overflow-y: scroll;
    color: #999;
    font-size: 12px;
    background-color: rgba(255,255,255,0.8)
  }

  .selected {
    background-color: rgba(255,255,255, 0.9);
    font-weight: bold;
    color: #666;
  }
  .middle {
    background-color: rgba(255,255,255, 0.8);
    font-weight: bold;
    color: #888;
  }

  .btn {
    background-color: rgba(255,255,255,0.5);
    padding: 8px 16px;
    color: white;
    border-radius: 18px;
    position: absolute;
    border: solid 1px #888;
  }

  .btn.edit, .btn.copy {
    left: 50%;
    top: 50%;
    min-width: 32px;
    margin-top: -16px;
    text-align: center;
    cursor: pointer;
  }

  .btn.edit { margin-left: 4px; }
  .btn.copy { margin-left: -68px; }

  .btn.done {
    color: #666;
    left: 50%;
    margin-left: -32px;
    margin-bottom: 8px;
    margin-top: 4px;
  }
</style>
