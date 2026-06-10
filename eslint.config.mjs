import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    // Engenharia de Exclusão: Ignorar artefatos de build e pastas do sistema
    {
        ignores: [
            "**/dist/**",
            "**/node_modules/**",
            "**/.supabase/**",
            "**/artifacts/**/dist/**",
            "**/.vite/**",
            "**/artifacts/mockup-sandbox/src/.generated/**"
        ]
    },
    // Configuração Base (Dennis Ritchie / Grace Hopper)
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        // Aplica para arquivos JS e TS por padrão
        files: ["**/*.{js,mjs,cjs,ts,tsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
                ...globals.es2021
            }
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error",
            "no-console": "off" // Stark pragmatism: logs são necessários em scripts e servidores
        }
    },
    // Contexto de Frontend (Jobs/Wozniak): Browser Globals
    {
        files: ["artifacts/sst-consultoria/src/**/*.{js,jsx,ts,tsx}", "artifacts/mockup-sandbox/**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            globals: {
                ...globals.browser
            }
        }
    }
);