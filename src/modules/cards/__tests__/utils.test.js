import { generateCardPairs } from '../utils';

describe('helper methods', () => {
  test('generateCardPairs', () => {
    const cardPairs = generateCardPairs(1);

    expect(cardPairs.length).toEqual(2);
    expect(cardPairs).toMatchObject([
      expect.arrayContaining([expect.any(Number), expect.any(String)]),
      expect.arrayContaining([expect.any(Number), expect.any(String)]),
    ]);
  });
});
