module.exports = {
  name: 'bar-chart',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/bar-chart/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
