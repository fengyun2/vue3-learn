<script setup lang="ts">
import { ref } from "vue";
import Child1 from "./child1.vue";
import Child2 from "./child2.vue";
import InjectionKeyDemo from "./InjectionKeyDemo/Parent.vue";
import Child3 from "./child3.vue";
// 错误案例
import Child4 from "./child4.vue";

defineProps<{ msg: string }>();

const count = ref(0);
const a = ref("hello");
const b = ref("world");
const username = "vue";

type Child2Type = InstanceType<typeof Child2>;
const childRef = ref<Child2Type | null>(null);
const increase = () => {
  childRef.value?.increase();
};
</script>

<template>
  <div class="card">
    <!-- <button type="button" @click="count++">count is {{ count }}</button> -->
    <!-- <Child1 v-bind="{ a, b }" /> -->
    <!-- <button type="button" @click="increase">调用子组件方法</button> -->
    <!-- <Child2 :username="username" :age="count" ref="childRef" /> -->
    <!-- <InjectionKeyDemo /> -->
    <!-- <Child3 :name="username" /> -->
    <Child4 />
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
