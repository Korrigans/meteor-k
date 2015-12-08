Package.describe({
  name: 'korrigans:k',
  version: '0.1.1',
  summary: 'Define a namespace K. By itself this package does nothing.',
  git: 'https://github.com/Korrigans/meteor-k.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.export('K');

  api.addFiles('k.js');
});

Package.onTest(function(api) {
  api.use([
    'ecmascript',
    'sanjo:jasmine@0.20.2'
  ]);

  api.use('korrigans:k');

  api.addFiles('tests/namespace.js');
});
