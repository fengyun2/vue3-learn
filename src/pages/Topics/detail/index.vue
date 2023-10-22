<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import BasicInfo from "./components/basic-info.vue";

interface Topic {
  id: string;
  title: string;
  author_id: string;
  author?: {
    loginname: string;
    avatar_url: string;
  };
  tab?: string;
  content: string;
  visit_count: number;
  create_at: string;
  last_reply_at?: string;
  good?: boolean;
  top?: boolean;
}

interface Topics {
  [key: string]: Topic;
}

interface IFormData {
  basicInfo: Topic;
  sheet1: Topic;
  sheet2: Topic;
  sheet3: Topic;
}

defineOptions({
  name: 'TopicDetail',
  inheritAttrs: false,
})

const route = useRoute();
const activeNames = ref(["1"]);
const idsStr = route.query.ids || "";
const ids = idsStr ? (idsStr as string).split(",") : [];
const details = ref<Topics>({} as Topics);
// const topDetail = ref<Topic>({} as Topic);
// const sheet1Detail = ref<Topic>({} as Topic);
const formData = ref<IFormData>({
  basicInfo: {} as Topic,
  sheet1: {} as Topic,
  sheet2: {} as Topic,
  sheet3: {} as Topic,
});
const getDetail = (id: string, index: number) => {
  if (!id) return;
  fetch(`https://cnodejs.org/api/v1/topic/${id}`)
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        // console.warn(index, id, res.data, " res.data ======>");
        details.value[id] = structuredClone(res.data);
        switch (index) {
          case 0: {
            formData.value.basicInfo = structuredClone(res.data);
            break;
          }
          case 1: {
            formData.value.sheet1 = structuredClone(res.data);
            break;
          }
          case 2: {
            formData.value.sheet2 = structuredClone(res.data);
            break;
          }
          case 3: {
            formData.value.sheet3 = structuredClone(res.data);
            break;
          }
          default: {
            break;
          }
        }
      }
    });
};
if (ids.length) {
  for (const [index, id] of ids.entries()) {
    getDetail(id, index);
  }
}

watch(() => formData, (value) => {
  console.warn('监听 formData 变化：', value.value)
},{deep: true})
</script>
<template>
  <div class="page">
    <h3>{{ formData.basicInfo?.title || "未知标题" }}</h3>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="基础信息" name="1">
        <BasicInfo v-model="formData.basicInfo" />
      </el-collapse-item>
      <el-collapse-item title="明细信息" name="2"> </el-collapse-item>
    </el-collapse>
  </div>
</template>
