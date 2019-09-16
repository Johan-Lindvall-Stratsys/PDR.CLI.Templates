module.exports = {
  reporters: ['default', ['jest-junit', { outputDirectory: 'reports' }]],
  coverageDirectory: 'reports',
  coverageReporters: ['text', 'cobertura'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '<rootDir>/src/**/*.jsx',
    '<rootDir>/src/**/*.ts',
    '<rootDir>/src/**/*.tsx',
    '<rootDir>/src/**/*.vue'
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^#/(.*)$': '<rootDir>/tests/$1',
    '^.+.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['**/tests/**/*.spec.(js|jsx|ts|tsx)'],
  testURL: 'http://localhost/',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  }
}
