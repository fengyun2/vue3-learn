<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

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

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = defineModel<Topic>();
const rules = reactive<FormRules<Topic>>({
  title: [{ required: true, message: "请输入标题" }],
});
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.warn("submit!");
    } else {
      console.error("error submit!", fields);
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model="ruleForm.title" />
    </el-form-item>
    <el-form-item label="是否置顶" prop="top">
      <el-switch v-model="ruleForm.top" />
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-input v-model="ruleForm.content" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        保存
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>
