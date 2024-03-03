# Webpack working

Use this project as a sample to work on,

- Webpack
- TS Loader to convert ts files to js
- HTMLWebpackPlugin

> **NOTE**: At the time of wirting this HMR(Hot module reload) is not supported in [ts loader](https://www.npmjs.com/package/ts-loader#hot-module-replacement)

## Local running

```
npm i
```

```
npm run start
```

## Deploy to github pages

- Push the code to the repo, [node.js.yml](https://github.com/suriyaprakhash/kaleido/tree/feature/getting-started/.github/workflows) kicks in
    - Runs the **npm run build** which creats **the dist** folder with all the required files
    - The deploy step creates **gh-pages** branch and pushes the **dist** folder contents
- Project -> Setttings -> Pages is set to point to load the webpage from **gh-pages** branch
