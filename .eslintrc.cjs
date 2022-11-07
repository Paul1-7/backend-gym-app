module.exports = {
    env: {
      es2021: true,
      node: true
    },
    extends: ['eslint:recommended', 'google', 'prettier'],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'require-jsdoc': 0,
      'new-cap': false,
      'no-console': 'warn'
    }
  }
  