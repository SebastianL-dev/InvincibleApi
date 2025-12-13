import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import jsdocPlugin from "eslint-plugin-jsdoc";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["src/**/*"] },
  {
    languageOptions: {
      globals: globals.browser,
      parser: "@typescript-eslint/parser",
    },
    plugins: {
      jsdoc: jsdocPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
    settings: {
      jsdoc: {
        mode: "typescript",
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["dist/**/*"],
  },
];
