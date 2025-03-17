import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import scss from "rollup-plugin-scss";

const packageJson = require("./package.json");

const preserveUseClient = () => {
  return {
    name: "preserve-use-client",
    renderChunk(code) {
      if (code.includes('"use client";')) {
        return `"use client";\n${code.replace(/"use client";\s*/g, "")}`;
      }
      return code;
    },
  };
};

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      scss({
        output: "./dist/jeremiemeunier.style.css",
        failOnError: false,
      }),
      preserveUseClient(),
    ],
    external: ["react", "react-dom", "framer-motion"],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/types.d.ts", format: "es" }],
    plugins: [dts.default()],
    external: [/\.css$/, /\.scss$/, /\.sass$/],
  },
];
