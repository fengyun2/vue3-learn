<template>
  <h3>{{ username }}</h3>
  <p>{{ age }}</p>
  <p>child count: {{ count }}</p>
</template>
<script setup lang="ts">
import { ref } from "vue";
defineProps<{ username: string; age: number }>();

const count = ref(0);
const increase = () => {
  count.value++;
};

defineExpose({
  increase,
});
</script>
