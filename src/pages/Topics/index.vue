<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import data from './data.json'

interface User {
  loginname: string;
  avatar_url: string;
}

interface Topic {
  id: string;
  title: string;
  author_id: string;
  author?: User;
  tab?: string;
  content: string;
  visit_count: number;
  create_at: string;
  last_reply_at?: string;
  good?: boolean;
  top?: boolean;
}

type Mode = "edit" | "view";

const router = useRouter();
const loading = ref(false);
const multipleSelection = ref<Topic[]>([]);

const tableColumn = ref([
  { prop: "selection", type: "selection", width: 55 },
  { prop: "title", label: "标题", width: 180 },
  {
    prop: "author",
    label: "作者",
    formatter: ({ author  }: Topic) => author?.loginname || "",
  },
  {
    prop: "create_at",
    label: "创建日期",
    formatter: ({ create_at }: Topic) =>
      create_at ? dayjs(create_at).format("YYYY/MM/DD HH:mm:ss") : create_at,
  },
  {
    prop: "visit_count",
    label: "阅读数",
  },
]);
const tableData = ref<Topic[]>([]);
const handleSelectionChange = (val: Topic[]) => {
  multipleSelection.value = val;
};
const getTopics = () => {
  loading.value = true;
  // 由于接口请求很慢，这里取本地缓存数据
  if(data.success) {
    tableData.value = data.data || [];
    multipleSelection.value = [];
    loading.value = false;
  }
  // fetch("https://cnodejs.org/api/v1/topics")
  //   .then((res) => res.json())
  //   .then((res) => {
  //     console.warn(res);
  //     if (res.success) {
  //       tableData.value = res.data || [];
  //       multipleSelection.value = [];
  //     }
  //   })
  //   .finally(() => {
  //     loading.value = false;
  //   });
};

getTopics();

const toDetail = (row: Topic, mode: Mode) => {
  router.push({
    name: "topicDetail",
    query: {
      from: "topics",
      mode,
      ids: row.id,
    },
  });
};

const batchToDetail = () => {
  const ids = multipleSelection.value?.map((row) => row.id)?.join(",");
  const mode = "edit";
  router.push({
    name: "topicDetail",
    query: {
      from: "topics",
      mode,
      ids,
    },
  });
};
</script>
<template>
  <div class="page">
    <el-button
      type="primary"
      @click="batchToDetail"
      :disabled="!multipleSelection.length"
      >批量携带ids</el-button
    >
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-for="item in tableColumn"
        :key="item.prop"
        v-bind="item"
      ></el-table-column>
      <el-table-column fixed="right" prop="operator" label="操作" width="120">
        <template #default="scope">
          <el-space>
            <el-button
              link
              type="primary"
              size="small"
              @click="toDetail(scope.row, 'edit')"
              >编辑</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              @click="toDetail(scope.row, 'view')"
              >详情</el-button
            >
          </el-space>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
