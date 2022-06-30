module.exports = {
  name: 'bar-application',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/bar-application/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
