describe('[k][Unit] Namespaces', () => {

  describe('K', () => {

    it('should exist and be an object', () => {
      expect(K).toBeDefined();
      expect(typeof K).toEqual('object');
    });

    describe('K.internals', () => {

      it('should exist and be an object', () => {
        expect(K.internals).toBeDefined();
        expect(typeof K.internals).toEqual('object');
      });

    });
  });
});
