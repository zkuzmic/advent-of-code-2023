import { puzzleInput } from "./puzzleInput";

const cardStrings = puzzleInput.split("\n");
let totalPoints = 0;
let totalCardCount = 0;

const parseCardString = (cardString: string) => {
  const [cardLabelString, numbersString] = cardString.split(":");
  const [winningNumbersString, playerNumbersString] = numbersString.split("|");

  const winningNumbersArray = winningNumbersString.trim().split(" ");
  const playerNumbersArray = playerNumbersString
    .trim()
    .split(" ")
    .filter(Boolean);
  return { winningNumbersArray, playerNumbersArray };
};

const getCardPoints = (
  winningNumbersArray: string[],
  playerNumbersArray: string[],
) => {
  let cardTotal = 0;
  playerNumbersArray.forEach((playerNumber) => {
    if (winningNumbersArray.includes(playerNumber)) {
      cardTotal = cardTotal === 0 ? 1 : cardTotal * 2;
    }
  });
  return cardTotal;
};

const getWinningCardCount = (points: number) => {
  if (points < 4) return points;
  return Math.log(points) / Math.log(2) + 1;
};

const getCardCount = (
  index: number,
  winnerCount: number,
  prevCardCount?: number,
): number => {
  let cardCount = prevCardCount || 1;

  for (let card = index + 1; card <= index + winnerCount; card++) {
    const cardString = cardStrings[card];
    if (cardString) {
      const { winningNumbersArray, playerNumbersArray } = parseCardString(
        cardStrings[card],
      );
      const points = getCardPoints(winningNumbersArray, playerNumbersArray);
      const winningCardCount = getWinningCardCount(points);

      cardCount += getCardCount(card, winningCardCount);
    }
  }

  return cardCount;
};

cardStrings.forEach((cardString, i) => {
  const { winningNumbersArray, playerNumbersArray } =
    parseCardString(cardString);

  const cardTotal = getCardPoints(winningNumbersArray, playerNumbersArray);
  const cardCount = getCardCount(i, getWinningCardCount(cardTotal));

  totalPoints += cardTotal;
  totalCardCount += cardCount;
});

// 20117
console.log(`Total points: ${totalPoints}`);
console.log(`Total cards: ${totalCardCount}`);

// 0 0
// 1 1
// 2 2
// 3 4
// 4 8
// 5 16
// 6 32
// 7 64
// 8 128
// 9 256
// getCardCount(0, 1);
// console.log(getWinningCardCount(256));
