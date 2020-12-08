import { Grammar } from 'prismjs';

export const OPERATORS = ['by', 'group_left', 'group_right', 'ignoring', 'on', 'offset', 'without'];

export const FUNCTIONS = [];

const tokenizer: Grammar = {
  comment: {
    pattern: /#.*/,
  },
  'context-aggregation': {
    pattern: /((by|without)\s*)\([^)]*\)/, // by ()
    lookbehind: true,
    inside: {
      'label-key': {
        pattern: /[^(),\s][^,)]*[^),\s]*/,
        alias: 'attr-name',
      },
      punctuation: /[()]/,
    },
  },
  'context-labels': {
    pattern: /\{[^}]*(?=})/,
    greedy: true,
    inside: {
      comment: {
        pattern: /#.*/,
      },
      'label-key': {
        pattern: /[a-z_]\w*(?=\s*(=|!=|=~|!~))/,
        alias: 'attr-name',
        greedy: true,
      },
      'label-value': {
        pattern: /"(?:\\.|[^\\"])*"/,
        greedy: true,
        alias: 'attr-value',
      },
      punctuation: /[{]/,
    },
  },
  function: new RegExp(`\\b(?:${FUNCTIONS.map(f => f.label).join('|')})(?=\\s*\\()`, 'i'),
  'context-range': [
    {
      pattern: /\[[^\]]*(?=])/, // [1m]
      inside: {
        'range-duration': {
          pattern: /\b\d+[smhdwy]\b/i,
          alias: 'number',
        },
      },
    },
    {
      pattern: /(offset\s+)\w+/, // offset 1m
      lookbehind: true,
      inside: {
        'range-duration': {
          pattern: /\b\d+[smhdwy]\b/i,
          alias: 'number',
        },
      },
    },
  ],
  number: /\b-?\d+((\.\d*)?([eE][+-]?\d+)?)?\b/,
  operator: new RegExp(`/[-+*/=%^~]|&&?|\\|?\\||!=?|<(?:=>?|<|>)?|>[>=]?|\\b(?:${OPERATORS.join('|')})\\b`, 'i'),
  punctuation: /[{};()`,.]/,
};

export default tokenizer;
