// @flow
import colors from '@workday/canvas-colors-web';

export type CardPair = [string, Number];

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = (rangeStart: number, rangeEnd: Number): Number => {
  const min = Math.ceil(rangeStart);
  const max = Math.floor(rangeEnd);
  return Math.floor(Math.random() * (max - min)) + min;
};

// https://en.wikipedia.org/wiki/Fisher-Yates_shuffle
const shuffle = <T>(input: Array<T>): Array<T> => {
  const output = [...input];
  const lastIndex = output.length - 1;
  let tmp, targetIndex;

  for (let sourceIndex = lastIndex; sourceIndex > 0; sourceIndex--) {
    targetIndex = getRandomInt(0, sourceIndex);
    tmp = output[sourceIndex];
    output[sourceIndex] = output[targetIndex];
    output[targetIndex] = tmp;
  }

  return output;
};

/* 
  only include the mid-range hues from the canvas palette
  https://design.workday.com/tokens/basic/colors/canvas-colors
*/
const randomColors: string[] = shuffle<string>(
  Object.keys(colors).filter((name: string) => ['200', '300', '400'].includes(name.substr(-3))),
);

export const generateCardPairs = (pairCount: Number): CardPair[] => {
  const cards: CardPair[] = [];
  const cardCount: Number = pairCount * 2;

  for (let i: Number = 0; i < cardCount; i++) {
    const pairIndex = Math.floor(i / 2);
    const colorName: string = randomColors[pairIndex];
    cards.push([colorName, pairIndex]);
  }

  return shuffle<CardPair>(cards);
};
