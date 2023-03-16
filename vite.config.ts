/** @format */

import { defineConfig, loadEnv } from "vite";
import React from "@vitejs/plugin-react";
import WindiCSS from "vite-plugin-windicss";
import TsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [React(), WindiCSS(), TsconfigPaths()],
  };
});
