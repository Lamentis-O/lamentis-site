import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: [
      "tests/**/*.test.tsx",
      "tests/**/*.test.ts",
      "app/**/*.test.tsx",
      "app/**/*.test.ts",
      "components/**/*.test.tsx",
      "components/**/*.test.ts",
    ],
  },
});
