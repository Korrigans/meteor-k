describe('[k][Unit] K.ErrorLog', () => {
  afterEach(() => {
    // Remove added fields
    for (let key in K.ErrorLog) {
      if (K.ErrorLog.hasOwnProperty(key)) {
        delete K.ErrorLog[key];
      }
    }
  });

  describe('defaultMaxSize', () => {
    it('should be a number', () => {
      const
        expected = 'number',
        actual = typeof K.ErrorLog.defaultMaxSize;

      expect(actual).toEqual(expected);
    });
    it('should be writable', () => {
      const newSize = K.ErrorLog.defaultMaxSize + 1;

      K.ErrorLog.defaultMaxSize = newSize;

      expect(K.ErrorLog.defaultMaxSize).toEqual(newSize);

      K.ErrorLog.defaultMaxSize -= 1;
    });
    it('should throw if new value is not strictly positive number', () => {
      const
        failingType = 'foo',
        failingValue = -1;

      expect(() => K.ErrorLog.defaultMaxSize = failingType).toThrowError(
        Error, 'K.ErrorLog.defaultMaxSize must be strictly positive number'
      );
      expect(() => K.ErrorLog.defaultMaxSize = failingValue).toThrowError(
        Error, 'K.ErrorLog.defaultMaxSize must be strictly positive number'
      );
    });
  });

  testKErrorLogAdd();
  testKErrorLogLog();
  testKErrorLogClear();
});
