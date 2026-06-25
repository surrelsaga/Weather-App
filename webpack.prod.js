// Prod-only settings. Minimal for now — this is the file that grows later
// (source-map strategy, output hashing)
import { merge } from "webpack-merge";
import common from "./webpack.common.js";

export default merge(common, {
  mode: "production", // Minifies and optimizes the bundle for deployment.
});
