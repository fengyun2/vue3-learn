<template>
  <!-- ts结构 -->
  <h3>Child3 组件</h3>
  <p>{{ name }}</p>
  <p>{{ count }}</p>
  <button @click="increaseCount">修改count2</button>
  <p>{{ double }}</p>
  <input type="text" ref="el" @change="handleChange" />
</template>
<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import type { Ref } from "vue";
interface Props {
  name: string;
  count?: number;
}

withDefaults(defineProps<Props>(), {
  count: 101,
});

const year: Ref<string | number> = ref("2023");
year.value = "2021";

interface Book {
  title: string;
  year?: number;
}

const book: Book = reactive({
  title: "牛X",
});
const count2: Ref<number> = ref(0);
const double = computed<number>(() => count2.value * 2);
const increaseCount = () => {
  count2.value++;
};

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  console.log(target.value);
}

// 为模板引用标注类型
const el = ref<HTMLInputElement | null>(null);
onMounted(() => {
  el.value?.focus();
});
</script>
