<script setup lang="ts">
import {preventShake,throttling} from "./utils/debounce"
import { ref } from 'vue'
const count = ref<number>(0)
const throttlingDebunce = throttling(() => {
  count.value++
}, 2000)
const onThrottlingClick = () => {
  throttlingDebunce()
}
const preventShakeDebunce = preventShake(() => {
  count.value++
}, 2000)
const onShakeClick = () => {
  preventShakeDebunce()
}

</script>

<template>
  <div class="content">
    <div class="throttling-operator">
      <div class="view">{{ count }}</div>
      <Button @click="onThrottlingClick">节流按钮</Button>
    </div>
    <div class="shake-operator">
      <div class="view">{{ count }}</div>
      <Button @click="onShakeClick">防抖按钮</Button>
    </div>
  </div>
</template>

<style scoped lang="less">
.content {
  background-color: #f5f5f5;
  height: 100vh;
  width: 100vw;
  .shake-operator {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100px;
    width: 100%;
    margin-top : 100px;
    .view {
      width: 100px;
      height: 100px;
      background-color: rgb(33, 133, 176);
      color: #bfa;
      font-size: 50px;
      text-align: center;
      line-height: 100px;
    }
  }
  .throttling-operator {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100px;
    width: 100%;
    .view {
      width: 100px;
      height: 100px;
      background-color: pink;
      color: #bfa;
      font-size: 50px;
      text-align: center;
      line-height: 100px;
    }
  }
}
</style>
