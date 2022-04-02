module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/function-component-definition': [
      1,
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react/state-in-constructor': 0,
    'no-unused-vars': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'jsx-a11y/label-has-associated-control': 0,
    'react/jsx-no-constructed-context-values': 0,
    'react/jsx-props-no-spreading': 0,
    'no-undef': 0,
    'no-shadow': 0,
    'default-param-last': 0,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
