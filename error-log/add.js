/**
 * Creates a new registry with given name and max size (optional)
 * @param {String} name                                Name of new registry
 * @param {Number} [maxSize=K.ErrorLog.defaultMaxSize] Max size of new registry
 * @return {undefined}
 */
K.ErrorLog.add = function KErrorLogAdd(name, maxSize) {
  let registrySize = maxSize;

  if (!_.isString(name)) {
    throw new Error('Name of ErrorLog must be string');
  }
  if (_.has(K.ErrorLog, name)) {
    throw new Error(`${name} already exists on K.ErrorLog`);
  }

  if (_.isUndefined(registrySize)) {
    registrySize = K.ErrorLog.defaultMaxSize;
    if (K.debug) {
      registrySize *= 10;
    }
  }
  else if (!_.isNumber(registrySize) || registrySize < 1) {
    throw new Error('Max error registry size must be strictly positive number');
  }

  K.ErrorLog[name] = [];
  Object.defineProperty(K.ErrorLog[name], 'maxSize', {
    value: registrySize
  });
};

Object.defineProperty(K.ErrorLog, 'add', {
  enumerable: false
});
