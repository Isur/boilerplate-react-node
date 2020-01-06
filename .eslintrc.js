module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'import'
  ],
  parserOptions:{
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  rules: {
    "@typescript-eslint/adjacent-overload-signatures": "warn",
    "@typescript-eslint/array-type": "warn",
    "@typescript-eslint/await-thenable": "warn",
    // "@typescript-eslint/camelcase": "warn",
    "@typescript-eslint/class-name-casing": "warn",
    "@typescript-eslint/func-call-spacing": "error",
    "@typescript-eslint/indent": ["warn", 2, {
      "ignoredNodes": [
        "JSXElement",
        "JSXElement *",
        "JSXAttribute",
        "ConditionalExpression",
        "TSUnionType"
      ],
      "VariableDeclarator": {
        "let": 2,
        "var": 2,
        "const": 3,
      },
      "SwitchCase": 1,
      "MemberExpression": 1,
      "FunctionDeclaration": {
        "parameters": "first"
      },
      "FunctionExpression": {
        "parameters": "first"
      },
      "CallExpression": {
        "arguments": "first"
      },
      "ArrayExpression": "first",
      "ObjectExpression": "first",
      "ImportDeclaration": "first",
      "flatTernaryExpressions": true
    }],
    "@typescript-eslint/interface-name-prefix": ["warn", "always"],
    "@typescript-eslint/member-delimiter-style": [
      "warn",
      {
        "multiline":{
          "delimiter": "comma",
          "requireLast": true
        },
        "singleline":{
          "delimiter": "comma",
          "requireLast": false
        }
      }
    ],
    "@typescript-eslint/member-naming": ["error", {
      "private": "^_",
      "protected": "^(?!_)",
      "public": "^(?!_)",
    }],
    "@typescript-eslint/no-array-constructor": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-extra-parens": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-require-imports": "warn",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/prefer-namespace-keyword": "warn",
    "@typescript-eslint/type-annotation-spacing": "warn",
    "no-console": ["warn",{
      "allow": ["warn", "error", "table", "time", "timeEnd"]
    }],
    "no-dupe-args": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-empty": "warn",
    "no-extra-boolean-cast": "error",
    "no-extra-semi": "warn",
    "no-invalid-regexp": "error",
    "no-irregular-whitespace": ["warn", {
      "skipStrings": true,
      "skipComments": true,
      "skipRegExps": true,
      "skipTemplates": true
    }],
    "no-obj-calls": "error",
    "no-sparse-arrays": "error",
    "no-unexpected-multiline": "warn",
    "no-unreachable": "error",
    "use-isnan": "error",
    "no-label-var": "warn",
    "array-bracket-spacing": ["warn", "never"],
    "block-spacing": ["warn", "always"],
    "brace-style": ["warn", "1tbs", { "allowSingleLine": true }],
    "comma-dangle": ["warn", "always-multiline"],
    "comma-spacing": "warn",
    "comma-style": "warn",
    "computed-property-spacing": "warn",
    "eol-last": "warn",
    "func-call-spacing": "warn",
    "jsx-quotes": "warn",
    "key-spacing": "warn",
    "keyword-spacing": ["warn", {
      "overrides": {
        "if": {
          "after": false
        },
        "for": {
          "after": false
        },
        "while": {
          "after": false,
        },
        "switch": {
          "after": false
        },
        "catch": {
          "after": false,
        }
      }
    }],
    "linebreak-style": "error",
    "lines-between-class-members": ["warn", "always", { exceptAfterSingleLine: true }],
    "newline-per-chained-call": ["warn", {
      "ignoreChainWithDepth": 2,
    }],
    "no-lonely-if": "warn",
    "no-mixed-spaces-and-tabs": "warn",
    "no-multiple-empty-lines": [
      "warn",
      {
        "max": 1,
        "maxBOF": 1,
        "maxEOF": 1
      }
    ],
    "no-trailing-spaces": ["warn", {
      "skipBlankLines": true,
    }],
    "no-unneeded-ternary": "warn",
    "no-whitespace-before-property": "warn",
    "nonblock-statement-body-position": "warn",
    "object-curly-newline": ["warn", {
      "consistent": true
    }] ,
    "object-curly-spacing": ["warn", "always"],
    "operator-linebreak": ["warn", "before"],
    "padded-blocks": ["warn", "never"],
    "prefer-object-spread": "warn",
    "quotes": ["warn", "double" ,{
      "allowTemplateLiterals": true
    }],
    "semi": "warn",
    "semi-spacing": "warn",
    "semi-style": "warn",
    "space-before-blocks": "warn",
    "space-before-function-paren": ["warn", {
      "named": "never",
      "asyncArrow": "always",
      "anonymous": "never"
    }],
    "space-in-parens": "warn",
    "space-infix-ops": "warn",
    "space-unary-ops": "warn",
    "switch-colon-spacing": "warn",
    "wrap-regex": "warn",
    "arrow-parens": ["warn", "as-needed"],
    "arrow-spacing": "warn",
    "constructor-super": "error",
    "generator-star-spacing": ["error", {
      "before": false,
      "after": true,
      "anonymous": "neither",
      "method": {"before": true, "after": true}
    }],
    "no-class-assign": "error",
    "no-confusing-arrow": ["error", {"allowParens": true}],
    "no-const-assign": "error",
    "no-dupe-class-members": "error",
    "no-duplicate-imports": "warn",
    "no-this-before-super": "error",
    "no-useless-computed-key": "warn",
    "no-useless-constructor": "warn",
    "no-useless-rename": "warn",
    "no-var": "warn",
    "prefer-arrow-callback": "warn",
    "prefer-const": [
      "warn",
      {
        "destructuring": "all"
      }
    ],
    "prefer-rest-params": "warn",
    "prefer-spread": "warn",
    "prefer-template": "warn",
    "rest-spread-spacing": "warn",
    "template-curly-spacing": "warn",
    "react/boolean-prop-naming": ["warn", { "rule": "^(is|has)[A-Z]([A-Za-z0-9]?)+" }],
    "react/no-access-state-in-setstate": "warn",
    "react/no-direct-mutation-state": "error",
    "react/no-multi-comp": ["error", {
      "ignoreStateless": true
    }],
    "react/no-typos": "warn",
    "react/no-this-in-sfc": "error",
    "react/no-unknown-property": "error",
    "react/prefer-es6-class": ["warn", "always"],
    "react/react-in-jsx-scope": "error",
    "react/require-render-return": "error",
    "react/self-closing-comp": "warn",
    "react/sort-comp": ["warn", {
      "order": [
        "type-annotations",
        "static-methods",
        "lifecycle",
        "everything-else",
        "render"
      ]
    }],
    "react/state-in-constructor": ["warn", "always"],
    "react/void-dom-elements-no-children": "warn",
    "react/jsx-boolean-value": "warn",
    "react/jsx-closing-bracket-location": ["warn", "after-props"],
    "react/jsx-curly-spacing": "warn",
    "react/jsx-equals-spacing": "warn",
    "react/jsx-filename-extension": ["warn", {
      "extensions": [".jsx", ".tsx"]
    }],
    "react/jsx-first-prop-new-line": ["warn", "never"],
    "react/jsx-handler-names": ["warn", {
      "eventHandlerPrefix": "handle",
      "eventHandlerPropPrefix": "on"
    }],
    "react/jsx-indent": ["warn", 2],
    "react/jsx-indent-props": ["warn", "first"],
    "react/jsx-key": "warn",
    "react/jsx-no-duplicate-props": "error",
    "react/jsx-curly-brace-presence": ["warn", "never"],
    "react/jsx-fragments": "warn",
    "react/jsx-pascal-case": "warn",
    "react/jsx-props-no-multi-spaces": "warn",
    "react/jsx-tag-spacing": ["warn", {
      "beforeClosing": "never"
    }],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "import/no-unresolved": "error",
    "import/no-absolute-path": "error",
    "import/no-dynamic-require": "error",
    "import/no-self-import": "error",
    "import/no-cycle": "error",
    "import/no-useless-path-segments": ["error", {
      "noUselessIndex": true,
    }],
    "import/export": "warn",
    "import/no-named-as-default": "warn",
    "import/no-named-as-default-member": "warn",
    "import/no-deprecated": "warn",
    "import/no-extraneous-dependencies": "warn",
    "import/no-commonjs": "warn",
    "import/first": "warn",
    "import/order": "warn",
    "import/newline-after-import": "warn"
  }
};
