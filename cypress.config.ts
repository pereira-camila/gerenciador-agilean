import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.BASE_URL;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

if (!baseUrl || !email || !password) {
  throw new Error(
    "As variáveis BASE_URL, EMAIL e PASSWORD devem estar configuradas no arquivo .env.",
  );
}

export default defineConfig({
  reporter: "mochawesome",

  reporterOptions: {
    reportDir: "reports/json",
    overwrite: false,
    html: false,
    json: true,
  },

  video: true,

  videosFolder: "reports/videos",

  screenshotsFolder: "reports/screenshots",

  env: {
    email,
    password,
  },

  e2e: {
    baseUrl,
    viewportWidth: 1920,
    viewportHeight: 1080,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
