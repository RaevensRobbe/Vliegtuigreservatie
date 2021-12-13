// // jest.config.js
// export default {
//   transform: {
//     '^.+\\.ts$': 'ts-jest',
//     '^.+\\.svelte$': [
//       'svelte-jester',
//       {
//         preprocess: true,
//       },
//     ],
//   },
//   moduleFileExtensions: ['js', 'ts', 'svelte'],
//   setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
// }
export default {
  transform: {
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        preprocess: true,
      },
    ],
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  moduleNameMapper: {
    '\\$lib/(.+)$': '<rootDir>/src/lib/$1',
  },
}
