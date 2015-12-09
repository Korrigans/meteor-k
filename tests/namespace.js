describe('[k][Unit] Namespaces', () => {
  describe('K', () => {
    it('should exist and be an object', () => {
      const
        expected = 'object',
        actual = typeof K;

      expect(actual).toEqual(expected);
    });

    describe('Internals', () => {
      it('should exist and be an object', () => {
        const
          expected = 'object',
          actual = typeof K.Internals;

        expect(actual).toEqual(expected);
      });
    });

    describe('ErrorLog', () => {
      it('should exist and be an object', () => {
        const
          expected = 'object',
          actual = typeof K.ErrorLog;

        expect(actual).toEqual(expected);
      });
    });
  });
});
