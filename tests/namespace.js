describe('[k][Unit] Namespaces', () => {

  describe('K', () => {

    it('should exist and be an object', () => {
      expect(K).toBeDefined();
      expect(typeof K).toEqual('object');
    });

    describe('K.Internals', () => {

      it('should exist and be an object', () => {
        expect(K.Internals).toBeDefined();
        expect(typeof K.Internals).toEqual('object');
      });

    });
  });
});
