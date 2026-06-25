# webpack-template

A webpack dev template for projects in vanilla JS. ES modules throughout, split config with `webpack-merge`, CSS handling, and ESLint setup.

**Includes**: `webpack` + `webpack-cli` (bundler), `webpack-dev-server` (live reload), `webpack-merge` (split config), `html-webpack-plugin` (generate HTML), `style-loader` + `css-loader` (CSS imports), and `eslint` (linting)


## Scripts

```bash
npm install        # install dependencies first (using the template)

npm run dev        # start dev server with live reload (localhost:8080)
npm run build      # bundle into dist/ for production
npm run lint       # run ESLint over src/
```

Work in `src/`, use `npm run dev` while developing, `npm run build` to bundle source codes . `dist/` is generated and gitignored (never commit this)



## Recreate template from scratch

1. In order, from an empty folder:

```bash
npm init -y --init-type=module          # or npm init then add "type": "module" in package.json

npm install -D webpack webpack-cli      # bundler + its CLI
npm install -D webpack-dev-server       # local server with live reload (npm run dev)
npm install -D webpack-merge            # merges common config into dev/prod
npm install -D html-webpack-plugin      # generates dist/index.html, auto=injects the bundle
npm install -D style-loader css-loader  # let JS imports css
npm init @eslint/config@latest          # sets up ESLint, choose: ESM, vanilla, browser (no react, typescript)
```

2. Replace this inside scripts of `package.json`:

```json
"scripts": {
  "dev": "webpack serve --config webpack.dev.js",
  "build": "webpack --config webpack.prod.js",
  "lint": "eslint src"
}
```

3. Create `.gitignore`:

```bash
# if push to gh-pages branch to deploy, remove dist/ in .gitignore
node_modules/
dist/
```

4. Create these 3 config files in the root

`webpack.common.js` - shared by dev and prod:

```js
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
 
export default {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

`webpack.dev.js`:

```js
import { merge } from "webpack-merge";
import common from "./webpack.common.js";
 
export default merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
});
```

`webpack.prod.js`:

```js
import { merge } from "webpack-merge";
import common from "./webpack.common.js";
 
export default merge(common, {
  mode: "production",
});
```

5. Create the `src/` files:

`src/index.js`:

```js
import "./styles.css"; //must have as boilerplate
```

`src/styles.css`: empty

`src/template.html`:

```html
<!-- boilerplate (init using Emmet) -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

6. Test with `npm run dev` and `npm run build`, then push to github and change repo settings to **Template repository** to make it reusable
