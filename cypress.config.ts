import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  env: {
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  },

  e2e: {
    baseUrl: "https://cadastro-atividades-qa-teste.vercel.app",
    viewportWidth: 1920,
    viewportHeight: 1080,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
