// next.config.js
const withAntdLess = require("next-plugin-antd-less");

const __DEV__ = true;

module.exports = withAntdLess({
    // modifyVars: { "@primary-color": "#04f" }, // optional
    lessVarsFilePath: "./styles/variables.less", // optional
    lessVarsFilePathAppendToEndOfContent: true, // optional
    // optional https://github.com/webpack-contrib/css-loader#object
    cssLoaderOptions: {
        // ...
        mode: "local",
        localIdentName: __DEV__
            ? "[local]--[hash:base64:4]"
            : "[hash:base64:8]", // invalid! for Unify getLocalIdent (Next.js / CRA), Cannot set it, but you can rewritten getLocalIdentFn
        exportLocalsConvention: "camelCase",
        exportOnlyLocals: false,
        // ...
        getLocalIdent: (context, localIdentName, localName, options) => {
            return "whatever_random_class_name";
        },
    },

    // for Next.js ONLY
    nextjs: {
        localIdentNameFollowDev: true, // default false, for easy to debug on PROD mode
    },

    // Other Config Here...

    webpack(config) {
        return config;
    },
});
