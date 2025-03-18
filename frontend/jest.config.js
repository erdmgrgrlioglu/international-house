
module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest",
      "^.+\\.scss$": "jest-css-modules-transform"
    },
    moduleNameMapper: {
      "\\.(css|scss)$": "identity-obj-proxy",
      '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
      '\\.(css|scss)$': 'identity-obj-proxy',
      "^@database/(.*)$": "<rootDir>/src/database/$1",
      "^@i18n$": "<rootDir>/src/i18n",
    },
  };