/** @type {import('next').NextConfig} */
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const withTM = require("next-transpile-modules")(["monaco-editor"]);

const nextConfig = withTM({
  reactStrictMode: true,
  webpack: (config, options) => {
    const { isServer } = options;

    if (!isServer) {
      const rule = config.module.rules
        .find((rule) => rule.oneOf)
        .oneOf.find(
          (r) =>
            // Find the global CSS loader
            r.issuer && r.issuer.include && r.issuer.include.includes("_app")
        );
      if (rule) {
        rule.issuer.include = [
          rule.issuer.include,
          // Allow `monaco-editor` to import global CSS:
          /[\\/]node_modules[\\/]monaco-editor[\\/]/,
        ];
      }
      config.plugins.push(
        new MonacoWebpackPlugin({
          publicPath: "/_next/",
          filename: "static/[name].worker.[contenthash].js",
          languages: ["html", "css", "javascript", "typescript", "json"],
        })
      );
    }

    return config;
  },
});

module.exports = nextConfig;
