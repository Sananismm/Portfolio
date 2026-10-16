import type { NextConfig } from "next";
import path from "node:path";

const config: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  devIndicators: false,
  turbopack: { root: path.resolve(__dirname) },
};

export default config;
