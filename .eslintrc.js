module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  ignorePatterns: ['vite.config.ts'],
  globals: {
    REACT_APP_ENV: true,
  },
  rules: {
    'radix': [0, 'as-needed'],
    'no-restricted-syntax': [0],
    'consistent-return': [0],
    'no-continue': [0],
    'no-lonely-if': [0],
    '@typescript-eslint/no-unused-expressions': [0],
    'indent': [2, 2, {
      'SwitchCase': 1,
      'outerIIFEBody': 0,
      'MemberExpression': 1,
      'ignoredNodes': ['JSXElement *', 'JSXElement'],
    }],
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    'jsx-quotes': [2, 'prefer-double'],
    'one-var': [2, {
      'initialized': 'never',
    }],
    'padded-blocks': [1, 'never'],
    'operator-linebreak': [2, 'after'],
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', {
      'allowSingleLine': true,
    }],
    'curly': [1, 'multi-line'],
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true,
    }],
    'camelcase': [0, {
      'properties': 'always',
    }],
    'semi': [1, 'always', {
      'omitLastInOneLineBlock': true,
    }],
    'semi-spacing': [2, {
      'before': false,
      'after': true,
    }],
    'comma-dangle': [1, 'always-multiline'],
    'comma-spacing': [1, {
      'before': false,
      'after': true,
    }],
    'comma-style': [1, 'last'],
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true,
    }],
    'keyword-spacing': [2, {
      'before': true,
      'after': true,
    }],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, 'never'],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false,
    }],
    'spaced-comment': [2, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','],
    }],
    'template-curly-spacing': [2, 'never'],
    'object-curly-spacing': [2, 'always'],
    'array-bracket-spacing': [2, 'never'],
    'dot-location': [1, 'property'],
    'new-cap': [2, {
      'newIsCap': true,
      'capIsNew': true,
    }],
    'new-parens': 2,
    'wrap-iife': [2, 'inside'],
    'yoda': [2, 'never'],
    'eol-last': 1,
    'no-param-reassign': [2, {
      'props': false,
    }],
  },
};
