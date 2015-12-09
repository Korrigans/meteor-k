describe('[k][Unit] K.ErrorLog', () => {
  const testFieldName = 'test';

  afterEach(() => {
    // Remove added field
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

  describe('log', () => {
    beforeEach(() => {
      K.ErrorLog.add(testFieldName);
    });
    it('should be a function', () => {
      const
        actual = typeof K.ErrorLog.log,
        expected = 'function';

      expect(actual).toEqual(expected);
    });
    it('should not be enumerable', () => {
      const
        actual = Object.getOwnPropertyDescriptor(K.ErrorLog, 'log').enumerable,
        expected = false;

      expect(actual).toEqual(expected);
    });
    it('should put a new entry in given field', () => {
      const testEntry = 'foo';

      K.ErrorLog.log(testFieldName, testEntry);

      const actual = K.ErrorLog[testFieldName][0];

      expect(actual).toEqual(testEntry);
    });
    describe('size control', () => {
      it('should not let registry size exceed specified max size', () => {
        const maxSize = K.ErrorLog[testFieldName].maxSize;

        // NOT an off-by-one! We are voluntarily inserting one too many entry
        for (let i = 0; i < maxSize + 1; i++) {
          K.ErrorLog.log(testFieldName, null);
        }

        const
          actual = K.ErrorLog[testFieldName].length,
          expected = maxSize;

        expect(actual).toEqual(expected);
      });
      it('should be FIFO', () => {
        const maxSize = K.ErrorLog[testFieldName].maxSize;

        // NOT an off-by-one! We are voluntarily inserting one too many entry
        for (let i = 0; i < maxSize + 1; i++) {
          K.ErrorLog.log(testFieldName, i);
        }

        const
          actual = K.ErrorLog[testFieldName][0],
          expected = 1;

        expect(actual).toEqual(expected);
      });
    });
    describe('errors', () => {
      it('should throw an error if passed name is not registered', () => {
        const testFailing = 'does not exist';

        expect(() => K.ErrorLog.log(testFailing)).toThrowError(
          Error, `Unknown error registry ${testFailing}`
        );
      });
    });
  });

  describe('clear', () => {
    beforeEach(() => {
      const entryNumber = 5;

      K.ErrorLog.add(testFieldName);
      for (let i = 0; i < entryNumber; i++) {
        K.ErrorLog.log(testFieldName, i);
      }
    });
    it('should be a function', () => {
      const
        actual = typeof K.ErrorLog.clear,
        expected = 'function';

      expect(actual).toEqual(expected);
    });
    it('should not be enumerable', () => {
      const
        actual = Object.getOwnPropertyDescriptor(
          K.ErrorLog, 'clear'
        ).enumerable,
        expected = false;

      expect(actual).toEqual(expected);
    });

    it('should empty given error registry', () => {
      K.ErrorLog.clear(testFieldName);

      const
        actual = K.ErrorLog[testFieldName].length,
        expected = 0;

      expect(actual).toEqual(expected);
    });

    describe('errors', () => {
      it('should throw an error if passed name does not exist', () => {
        const nonExisting = 'not existing';

        expect(
          () => K.ErrorLog.clear(nonExisting)
        ).toThrowError(Error, `Could not find registry ${nonExisting}`);
      });
    });
  });
});
