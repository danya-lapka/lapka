import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
};

const isProd = process.env.NODE_ENV === 'production';

  module.exports = {
    basePath: isProd ? '/lapka' : '', // Замените 'project' на название вашего репозитория
    assetPrefix: isProd ? '/lapka/' : '', // Для статических ресурсов
    trailingSlash: true, // Опционально: добавляет слеши к URL
  };

export default nextConfig;
