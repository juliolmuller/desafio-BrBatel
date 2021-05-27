module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'lacussoft',
    'lacussoft/react',
    'lacussoft/typescript',
  ],
  rules: {
    'camelcase': ['error', {
      allow: [
        'annual_income',
        'created_at',
        'updated_at',
        'deleted_at',
        'current_page',
        'items_per_page',
        'total_items',
        'total_pages',
        'first_page',
        'previous_page',
        'next_page',
        'last_page',
      ],
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debug': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}
