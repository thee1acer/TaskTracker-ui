import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import pluginImport from "eslint-plugin-import";
import pluginSort from "eslint-plugin-simple-import-sort";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  { languageOptions: { globals: globals.browser } },

  // Recommended base configurations
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],

  // TypeScript parser for Vue files
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } }
  },

  // 🔹 Import rules for better structure and preventing errors
  {
    plugins: { import: pluginImport, "simple-import-sort": pluginSort },
    rules: {
      // ✅ Prevent invalid or unresolved imports
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/default": "error",
      "import/namespace": "error",
      "import/no-absolute-path": "error",

      // ✅ Ensure sorted and grouped imports
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error"
    }
  }
];
