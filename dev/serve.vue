<script>
import Vue from 'vue';
import ProgressCircle from '@/progress-circle.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    ProgressCircle
  }
});
</script>

<template>
  <div id="app">
    <progress-circle />
  </div>
</template>
