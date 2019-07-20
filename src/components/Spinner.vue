<template>
      <div class="spinner" :title="$props.title">
        <span :class="['less', canSpin(-1)?'disabled':'']" @click="spin(-1)">&vltri;</span>
        <span class="value">{{((value) * 0.2).toFixed(1)}} s</span>
        <span :class="['less', canSpin(1)?'disabled':'']" @click="spin(1)">&vrtri;</span>
      </div>
</template>

<script>

export default {
  name: 'Spinner',
  props: ['value', 'max', 'min', 'reverse', 'title'],
  data () {
    return { }
  },
  methods: {
    canSpin (val) {
      var newval = this.value + val * (this.$props.reverse !== undefined ? -1 : 1)
      return !(newval <= this.$props.max && newval >= this.$props.min)
    },
    spin (val) {
      var newval = this.value + val * (this.$props.reverse !== undefined ? -1 : 1)
      if (newval <= this.$props.max && newval >= this.$props.min) {
        this.$emit('input', newval)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .spinner {
    user-select: none;
    display: inline-block;
  }
  .spinner span.disabled {
    color: #888;
  }
</style>
