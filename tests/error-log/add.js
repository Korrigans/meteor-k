testKErrorLogAdd = function testKErrorLogAdd() {
  describe('add', () => {
    it('should be a function', () => {
      const
        actual = typeof K.ErrorLog.add,
        expected = 'function';

      expect(actual).toEqual(expected);
    });
    it('should not be enumerable', () => {
      const
        actual = Object.getOwnPropertyDescriptor(K.ErrorLog, 'add').enumerable,
        expected = false;

      expect(actual).toEqual(expected);
    });
    it('should define a new array field on K.ErrorLog', () => {
      K.ErrorLog.add(testFieldName);

      const
        actual = _.isArray(K.ErrorLog[testFieldName]),
        expected = true;

      expect(actual).toEqual(expected);
    });
    it('should use default value to set max registry size if no parameter is provided', () => {
      K.ErrorLog.add(testFieldName);

      const
        actual = K.ErrorLog[testFieldName].maxSize,
        expected = K.ErrorLog.defaultMaxSize;

      expect(actual).toEqual(expected);
    });
    it('should use default value tenfold if K.debug is present', () => {
      K.debug = true;
      K.ErrorLog.add(testFieldName);

      const
        multiplier = 10,
        actual = K.ErrorLog[testFieldName].maxSize,
        expected = K.ErrorLog.defaultMaxSize * multiplier;

      expect(actual).toEqual(expected);

      delete K.debug;
    });
    it('should use optional parameter to set max registry size', () => {
      const
        testValue = K.ErrorLog.defaultMaxSize + 1;

      K.ErrorLog.add(testFieldName, testValue);

      const
        actual = K.ErrorLog[testFieldName].maxSize,
        expected = testValue;

      expect(actual).toEqual(expected);
    });

    it('should define max registry size as non enumerable', () => {
      K.ErrorLog.add(testFieldName);

      const
        actual = Object.getOwnPropertyDescriptor(
          K.ErrorLog[testFieldName], 'maxSize'
        ).enumerable,
        expected = false;

      expect(actual).toEqual(expected);
    });

    describe('errors', () => {
      it('should throw error when passed name is not string', () => {
        const testCase = 42;

        expect(() => K.ErrorLog.add(testCase)).toThrowError(
          Error, 'Name of ErrorLog must be string'
        );
      });
      it('should throw error when passed name already exists', () => {
        K.ErrorLog.add(testFieldName);
        expect(() => K.ErrorLog.add(testFieldName)).toThrowError(
          Error, `${testFieldName} already exists on K.ErrorLog`
        );
      });
      it('should throw when passed size is not strick positive number', () => {
        const
          failingType = 'foo',
          failingValue = -1;

        expect(
          () => K.ErrorLog.add('some registry', failingType)
        ).toThrowError(Error,
          'Max error registry size must be strictly positive number'
        );
        expect(
          () => K.ErrorLog.add('some registry', failingValue)
        ).toThrowError(Error,
          'Max error registry size must be strictly positive number'
        );
      });
    });
  });
};
