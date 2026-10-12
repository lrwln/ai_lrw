<script setup>
import { ref } from 'vue'
const count = ref(0)
console.log(count,count.value)

</script>

<template>
  <div class="container">
    <div>
      <label>输入：</label><input class="input" v-model="question" />
      <button @click="update">提交</button>
    </div>
    <div class="output">
      <div><label>Streaming</label><input type="checkbox" v-model="stream"/></div>
      <div>{{ content }}</div>
    </div>
  </div>
</template>

<style>


</style>

