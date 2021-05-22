module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'lacussoft',
    'lacussoft/typescript',
  ],
  ignorePatterns: [
    'build/',
  ],
  rules: {
    'no-console': 'off',
  },
}
