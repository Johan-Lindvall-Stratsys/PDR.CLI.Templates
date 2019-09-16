<template>
  <div class="sem-visual sem-indent sem-stretch">
    <h1 class="sem-prio-high-1">{{ vm.message }}</h1>
    <p>This is your newly created PDR application powered by Vue!</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    vm(): any {
      return this
    },
    message(): string {
      return this.$store.state.options.message
    }
  }
})
</script>
