// .eslintrc.js
module.exports = {
    extends: ['next', 'next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',   // Disable unused vars warnings
      '@typescript-eslint/no-explicit-any': 'off',  // Allow usage of 'any'
      '@typescript-eslint/ban-ts-comment': 'off',  // Allow ts-ignore comments
    },
  }
  