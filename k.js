/**
 * Main namespace for Korrigans packages and applications
 * @namespace K
 */
K = {};

/**
 * Namespace for internals functions
 * Those functions are not tested and shoud not be used in production
 * @namespace Internals
 * @memberof K
 */
K.Internals = {};

let defaultRegistrySize = 10;

/**
 * Storage for errors thrown by avrious Korrigans packages
 * @namespace ErrorLog
 * @memberof K
 */
K.ErrorLog = {};

Object.defineProperty(K.ErrorLog, 'defaultMaxSize', {
  get() { return defaultRegistrySize; },
  set(newValue) {
    if (
      !_.isNumber(newValue)
      || newValue < 1
    ) {
      throw new Error(
        'K.ErrorLog.defaultMaxSize must be strictly positive number'
      );
    }
    defaultRegistrySize = newValue;
    return defaultRegistrySize;
  }
});
