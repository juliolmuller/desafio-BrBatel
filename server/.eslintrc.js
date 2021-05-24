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
    'camelcase': ['error', {
      allow: [
        'annual_income',
        'created_at',
        'updated_at',
        'deleted_at',
      ],
    }],
    'no-console': 'off',
  },
}
