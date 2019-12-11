const {defaults} = require('jest-config');
module.exports = {
    // An array of file extensions your modules use
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx', 'js', 'map'],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(scss|sass|css)$": "identity-obj-proxy"
    },
    setupFilesAfterEnv: ["<rootDir>/src/setUpTests.js"],
    roots: ["src"]
};