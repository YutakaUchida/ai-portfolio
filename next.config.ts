import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // GitHub Pages用の設定
  // リポジトリ名に合わせて変更してください（例: "/ai-portfolio"）
  basePath: process.env.GITHUB_ACTIONS ? "/ai-portfolio" : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? "/ai-portfolio/" : "",
};

export default nextConfig;
