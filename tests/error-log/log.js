testKErrorLogLog = function testKErrorLogLog() {
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
};
