module.exports = {
    moduleNameMapper: {
      '\\.css$': '<rootDir>/test/styleMock.js',
    },
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
  };
  