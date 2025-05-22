import { config } from "dotenv";
import type { NextConfig } from "next";
import { resolve } from "path";

config({ path: resolve(__dirname, "../.env") });

const nextConfig: NextConfig = {
  env: {
    BACKEND_HOST: process.env.BACKEND_HOST,
  },
  output: "standalone",
};

export default nextConfig;
