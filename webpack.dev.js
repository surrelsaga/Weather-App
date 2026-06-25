// Dev-only settings. merge() combines common + the object below into one final config.
import { merge } from "webpack-merge";
import common from "./webpack.common.js";

export default merge(common, {
  mode: "development", // Unminified, faster builds, helpful warnings.
  devtool: "eval-source-map", // Source maps so errors point to your real source, not the bundle.
  devServer: {
    // Live-reload also triggers when the HTML template changes (not just JS/CSS).
    watchFiles: ["./src/template.html"],
  },
});
