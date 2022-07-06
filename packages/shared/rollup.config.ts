import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default defineConfig([
  {
    input: "./src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
      },
      {
        file: "dist/index.mjs",
        format: "es",
      },
    ],
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
  },
  {
    input: "./src/entities/index.ts",
    output: [
      {
        file: "dist/entities/index.js",
        format: "cjs",
      },
      {
        file: "dist/entities/index.mjs",
        format: "es",
      },
    ],
    plugins: [typescript()],
  },
]);
