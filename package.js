Package.describe({
  name: 'korrigans:k',
  version: '0.1.4',
  summary: 'Define namespaces K, K.Internals, and defines K.ErrorLog',
  git: 'https://github.com/Korrigans/meteor-k.git',
  documentation: 'README.md'
});

Package.onUse(function onUse(api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'stevezhu:lodash@3.10.1'
  ]);

  api.export('K');

  api.addFiles([
    'k.js',
    'error-log/add.js',
    'error-log/log.js',
    'error-log/clear.js'
  ]);
});

Package.onTest(function onTest(api) {
  api.use([
    'ecmascript',
    'stevezhu:lodash@3.10.1',
    'sanjo:jasmine@0.20.2'
  ]);

  api.use('korrigans:k');

  api.addFiles([
    'tests/namespace.js',
    'tests/error-log/constants.js',
    'tests/error-log/add.js',
    'tests/error-log/clear.js',
    'tests/error-log/log.js',
    'tests/error-log/main.js'
  ]);

  api.imply('korrigans:k');
});
