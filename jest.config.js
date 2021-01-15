module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: [
    '<rootDir>/tests/setup.js',
    'jest-canvas-mock',
  ],
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/dist/**',
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!vue-pdf/|vue-resize-sensor/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
    '\\.worker.js': '<rootDir>/tests/__mocks__/workerMock.js',
  },
};
