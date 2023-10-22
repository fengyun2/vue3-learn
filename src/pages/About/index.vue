<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const from = ref(route.query.from);
const created_time = ref(route.query.created_time);
</script>
<template>
  <div class="page">
    <h3>About page</h3>
    <p>来源参数：{{ from }} - {{ created_time }}</p>
  </div>
</template>
