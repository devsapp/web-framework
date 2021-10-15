export const DEPLOY = [
  {
    header: 'Deploy',
    content: 'Deploy serverless application.',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'help',
        description: 'Use guide',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
];

export const REMOVE = [
  {
    header: 'Remove',
    content: 'Remove serverless application',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'help',
        description: 'Use guide',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
];

export const CONTEXT_NAME = 'web-framework';

export const GET_IMAGE_URL = 'https://registry.devsapp.cn/registry/image';

export const HTTP_CONFIG = {
  authType: 'anonymous',
  methods: ['GET', 'POST', 'PUT'],
};
