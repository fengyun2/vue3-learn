<template>
  <!-- vue3埋坑案例 -->
  <h3>欢迎来到踩坑环节</h3>
  <p>{{ errCount }}</p>
  <div>Counter: {{ count }}</div>
  <button @click="add">Increase</button>
  <div>foo: {{ objectRef.foo + 1 }}</div>
</template>
<script lang="ts">
import { ref, reactive, toRefs } from "vue";

export default {
  setup() {
    // 案例1：使用reactive封装基础数据类型
    const errCount = reactive(0);

    // 案例2：reactive变量结构失去响应性, 可以结合 toRefs 解决
    const state = reactive({ count: 0 });
    const add = () => {
      state.count++;
      objectRef.value.foo++;
    };

    // 案例3：ref.value的坑
    const objectRef = ref({
      foo: ref(1),
    });

    return {
      errCount,
      //   state,
      //   解构后失去响应式
      // ...state,
      ...toRefs(state),
      add,
      objectRef,
    };
  },
};
</script>
