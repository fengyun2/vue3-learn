import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueMacros from 'unplugin-vue-macros/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [vue({
  //   script: {
  //     defineModel: true, // 开启defineModel功能
  //     propsDestructure: true // 开启props结构响应式
  //   }
  // }), VueDevTools()],
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue({
          script: {
            defineModel: true, // 开启defineModel功能
            propsDestructure: true // 开启props结构响应式
          }
        }),
        vueJsx: VueJsx(),
      },
    }),
    VueDevTools()
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "@pages",
        replacement: fileURLToPath(new URL("./src/assets", import.meta.url)),
      },
      {
        find: "@components",
        replacement: fileURLToPath(
          new URL("./src/components", import.meta.url),
        ),
      },
      {
        find: "@utils",
        replacement: fileURLToPath(new URL("./src/utils", import.meta.url)),
      },
    ],
  },
});
