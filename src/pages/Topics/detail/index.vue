<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import BasicInfo from "./components/basic-info.vue";
import Sheet1 from './components/sheet1.vue';
import Sheet2 from './components/sheet2.vue';
import Sheet3 from './components/sheet3.vue';

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
const activeNames = ref(["1","2"]);
const tabActiveNames = ref("sheet1");
const idsStr = route.query.ids || "";
const ids = idsStr ? (idsStr as string).split(",") : [];
// const details = ref<Topics>({} as Topics);
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
        console.warn(index, id, " getDetail ======>");
        // details.value[id] = structuredClone(res.data);
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

const submit = () => {
  console.warn('提交表单：', formData.value)
}
</script>
<template>
  <div class="page">
    <h3>{{ formData.basicInfo?.title || "未知标题" }}</h3>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="基础信息" name="1">
        <BasicInfo v-model="formData.basicInfo" />
      </el-collapse-item>
      <el-collapse-item title="明细信息" name="2">
        <el-tabs v-model="tabActiveNames" class="demo-tabs">
          <el-tab-pane label="Sheet1" name="sheet1">
            <Sheet1 v-model="formData.sheet1" />
          </el-tab-pane>
          <el-tab-pane label="Sheet2" name="sheet2">
            <Sheet2 v-model="formData.sheet2" />
          </el-tab-pane>
          <el-tab-pane label="Sheet3" name="sheet3">
            <Sheet3 v-model="formData.sheet3" />
          </el-tab-pane>
        </el-tabs>
      </el-collapse-item>
    </el-collapse>
    <div class="btn">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<style scoped>
.demo-tabs >>> .el-tabs__content {
  padding: 32px;
}
</style>
