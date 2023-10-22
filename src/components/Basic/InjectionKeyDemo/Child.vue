<template>
  <h4>{{ value }}</h4>
</template>
<script setup lang="ts">
import { inject } from "vue";
import { ProvideKey } from "./type";
const value = inject(ProvideKey);
</script>
