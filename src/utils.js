// @flow
import colors from '@workday/canvas-colors-web';

export type CardPair = [string, number];

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export const getRandomInt = (rangeStart: number, rangeEnd: number): number => {
  const min = Math.ceil(rangeStart);
  const max = Math.floor(rangeEnd);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// https://en.wikipedia.org/wiki/Fisher-Yates_shuffle
export const shuffle = <T>(input: Array<T>): Array<T> => {
  const output = [...input];
  const lastIndex = output.length - 1;

  for (let sourceIndex = lastIndex; sourceIndex > 1; sourceIndex--) {
    const targetIndex = getRandomInt(0, sourceIndex);
    const tmp = output[targetIndex];
    output[targetIndex] = output[sourceIndex];
    output[sourceIndex] = tmp;
  }

  return output;
};

export const randomColors: string[] = shuffle<string>(Object.keys(colors));

export const generateCardPairs = (pairCount: number): CardPair[] => {
  const cards: CardPair[] = [];
  const cardCount: number = pairCount * 2;
  for (let i: number = 0; i < cardCount; i++) {
    const pairIndex = Math.floor(i / 2);
    const colorName: string = randomColors[pairIndex];
    cards.push([colorName, pairIndex]);
  }

  return shuffle<CardPair>(cards);
};
