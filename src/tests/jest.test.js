const greeting = (name) => `Hey ${name}, good job integrating tests`;

describe('Testing the tests setup', () => {
  it('Should return my name in the greeting', () => {
    const result = 'Hey James, good job integrating tests';
    expect(greeting('James')).toBe(result);
  });
});
