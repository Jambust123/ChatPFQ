module.exports = {
    // Run tests sequentially
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    maxConcurrency: 1,
    verbose: true
  };