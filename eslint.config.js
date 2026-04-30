import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    files: ["./src/**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.node
    },
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      // Sem ponto e vírgula
      "semi": ["error", "never"],
      
      // Consistência de aspas (simples)
      "quotes": ["error", "double", { "avoidEscape": true, "allowTemplateLiterals": true }],
      
      // Vírgulas no final
      "comma-dangle": ["error", "always-multiline"],
      
      // Espaços e indentação (2 espaços)
      "indent": ["error", 2],
      "no-multi-spaces": "error",
      "space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }],
      
      // Consistência de operadores
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      
      // Evitar console.log em produção (mas pode manter)
      "no-console": "off"
    }
  },
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ["./src/**/*.{ts,mts,cts}"]
  }))
])