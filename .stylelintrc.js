module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    //   'stylelint-config-sass-guidelines',
    'stylelint-prettier/recommended',
  ],
  rules: {
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ['attribute', 'class'],
      },
    ],
    'selector-max-id': [2],
    'alpha-value-notation': 'percentage',

    'max-nesting-depth': 2,
    'selector-class-pattern': '^[a-zA-Z][a-zA-Z0-9-_]*$',
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'mixin',
          'function',
        ],
      },
    ],
  },
}
