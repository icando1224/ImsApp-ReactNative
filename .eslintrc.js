module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    '@react-native-community',
    'plugin:react/recommended',
    'standard',
    'standard-react',
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'react-hooks', 'import', 'prettier', 'sort-destructure-keys'],
  rules: {
    'no-use-before-define': 0,
    'no-shadow': 0,
    'no-unused-vars': 2,
    'import/order': 2,
    'react-native/no-unused-styles': 2,
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'react/prop-types': 'off',
        'sort-destructure-keys/sort-destructure-keys': ['error', { caseSensitive: false }],
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    __DEV__: false,
    Request: false,
    fetch: false,
    FormData: false,
  },
}
