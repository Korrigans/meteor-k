/**
 * Empties a given registry
 * @param  {String} name name of registry to empty
 * @return {undefined}
 */
K.ErrorLog.clear = function KErrorLogClear(name) {
  if (!_.includes(_.keys(K.ErrorLog), name)) {
    throw new Error(`Could not find registry ${name}`);
  }

  const registry = K.ErrorLog[name];

  while (registry.length > 0) {
    registry.shift();
  }
};

Object.defineProperty(K.ErrorLog, 'clear', {
  enumerable: false
});
