<template>
  <h3>child</h3>
  <button @click="increase">+1</button>
  <p>count: {{ objectRef.count }}</p>
  <p>foo: {{ foo }}</p>
  <p>bar: {{ bar }}</p>
</template>
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ a: string; b: string }>();

const objectRef = ref({ count: 0 });
objectRef.value = { count: 2 };
const increase = () => {
  objectRef.value.count++;
};
const obj = {
  foo: ref(1),
  bar: ref(2),
};
const { foo, bar } = obj;
foo.value = 101;
bar.value = 102;
</script>
