<template>
  <input v-model="text" />
  <Child />
</template>
<script setup lang="ts">
import { provide, ref } from "vue";
import { ProvideKey } from "./type";
import Child from "./Child.vue";

const text = ref<string>("123");
provide(ProvideKey, text);
</script>
