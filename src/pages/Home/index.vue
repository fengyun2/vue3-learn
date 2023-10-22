<script setup lang="ts">
import { useRouter } from "vue-router";
import dayjs from "dayjs";

const router = useRouter();
const toAbout = () => {
  router.push({
    name: "about",
    query: {
      from: "home",
      created_time: dayjs().format("YYYY/MM/DD HH:mm:ss"),
    },
  });
};
</script>
<template>
  <div class="page">
    <h3>Home Page</h3>
    <el-button @click="toAbout">跳转到关于我页面</el-button>
  </div>
</template>
