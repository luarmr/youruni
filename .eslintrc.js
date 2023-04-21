module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['mobx', 'react', 'prettier', 'simple-import-sort'],
  extends: ['plugin:mobx/recommended', 'react-app', 'react-app/jest', 'prettier', 'plugin:jsx-a11y/recommended'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['warn'],
    'mobx/missing-observer': 'off', // default warn
    'mobx/no-anonymous-observer': 'off' // default warn but looks is being deprecated
  }
};
