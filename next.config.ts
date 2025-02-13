import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        type: "asset/resource",
      },
    )
    return config
  },
};

export default nextConfig;
