// jest.config.js
export default {
  transform: {
    '^.+.ts$': 'ts-jest',
    '^.+.svelte$': [
      'svelte-jester',
      {
        preprocess: true,
      },
    ],
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  moduleNameMapper: {
    '^\\$lib(.*)$': '<rootDir>/src/lib$1',
    '^\\$app(.*)$': '<rootDir>/.svelte-kit/dev/runtime/app$1',
  },
}
