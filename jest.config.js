module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": ["ts-jest", {}],
    },
    // setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
