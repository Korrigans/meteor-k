testKErrorLogClear = function testKErrorLogClear() {
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
};
