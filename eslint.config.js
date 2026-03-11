import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  // 1. Ignorar pastas de build (Isso remove os erros na pasta dist)
  { ignores: ["dist/**", "node_modules/**"] },

  // 2. Regras base
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["src/**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: {
        '@stylistic': stylistic
    },
    languageOptions: {
        // Aqui garantimos que o ESLint conheça console, process, etc.
        globals: {
            ...globals.node,
            ...globals.es2021 // Adiciona globais modernas de JS
        }
    },
    rules: {
        '@stylistic/indent': ['error', 2],
        '@stylistic/quotes': ['error', 'double'],
        '@stylistic/semi': ['error', 'never'],

        // Se você quiser permitir console.log mesmo com as regras recomendadas:
        "no-console": "warn"
    }
  },
]);
