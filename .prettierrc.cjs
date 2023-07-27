module.exports = {
    trailingComma: "es5",
    tabWidth: 4,
    printWidth: 110,
    overrides: [
        {
            files: ["*.yaml", "*.yml"],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
