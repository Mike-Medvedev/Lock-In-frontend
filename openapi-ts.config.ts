import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:3000/docs/openapi.json",
  output: "src/client",
  plugins: [
    "zod",
    "@tanstack/react-query",
    {
      name: "@hey-api/sdk",
      auth: true,
      validator: true,
    },
  ],
});
