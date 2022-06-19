module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    parserOptions: {
        ecmaVersion: "latest", // Allows the use of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
        project: './tsconfig.json'
    },
    extends: ["airbnb", "airbnb-typescript/base", "plugin:@typescript-eslint/recommended"], // Uses the linting rules from @typescript-eslint/eslint-plugin
    env: {
        node: true, // Enable Node.js global variables
    },
    rules: {
        'max-len': ['error', {"code": 120}],
        'no-console': 'warn',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"]
    },
    // overrides: [
    //     {
    //         files: ['*.ts', '*.tsx'], // Your TypeScript files extension
    //
    //         // As mentioned in the comments, you should extend TypeScript plugins here,
    //         // instead of extending them outside the `overrides`.
    //         // If you don't want to extend any rules, you don't need an `extends` attribute.
    //         extends: [
    //             'plugin:@typescript-eslint/recommended',
    //             'plugin:@typescript-eslint/recommended-requiring-type-checking',
    //         ],
    //
    //         parserOptions: {
    //             project: ['./tsconfig.json'], // Specify it only for TypeScript files
    //         },
    //     },
    // ],
};
