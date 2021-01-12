module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: [
    '<rootDir>/tests/setup.js',
  ],
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/dist/**',
  ],
};
