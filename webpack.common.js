// Config shared by BOTH dev and prod. The other two files merge this in.
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  // The single entry point Webpack starts bundling from.
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    // Absolute path to the output folder. import.meta.dirname = this file's dir (ESM way; replaces __dirname).
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true, // Wipe dist/ before each build so old files don't linger.
  },
  plugins: [
    // Generates dist/index.html from the template and auto-injects <script main.js>.
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        // Lets us `import "./styles.css"` from JS.
        // css-loader resolves the import; style-loader injects it as a <style> tag at runtime.
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
