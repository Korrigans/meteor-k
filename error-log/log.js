K.ErrorLog.log = function KErrorLogLog(name, entry) {
  if (!_.includes(_.keys(K.ErrorLog), name)) {
    throw new Error(`Unknown error registry ${name}`);
  }

  const registry = K.ErrorLog[name];

  while (registry.length >= registry.maxSize) {
    registry.shift();
  }

  K.ErrorLog[name].push(entry);
};

Object.defineProperty(K.ErrorLog, 'log', {
  enumerable: false
});
