module.exports = {
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    },
    moduleNameMapper :{
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
  };