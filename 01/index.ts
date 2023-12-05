import { puzzleInputPart1, puzzleInputPart2 } from "./puzzleInput";

let part1Total = 0;
const part1Array = puzzleInputPart1.split("\n");

const getFirstInt = (arr: string[]) => {
  let first;
  arr.some((letter) => {
    const int = parseInt(letter);

    if (isNaN(int)) {
      return false;
    }

    first = int;
    return true;
  });

  return first;
};

part1Array.forEach((line) => {
  const lineArray = line.split("");
  const first = getFirstInt(lineArray);
  const last = getFirstInt(lineArray.reverse());

  const combinedNumber = parseInt(`${first}${last}`);

  part1Total += combinedNumber;
});

let part2Total = 0;
const part2Array = puzzleInputPart2.split("\n");

const spelledOutNumbers: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const getFirstInt2 = (string: string, reverse?: boolean) => {
  let first;
  let firstIndex: null | number = null;
  string.split("").some((letter, i) => {
    const int = parseInt(letter);

    if (isNaN(int)) {
      return false;
    }

    firstIndex = i;
    first = int;
    return true;
  });

  const earlierSpelledOutNumber: null | number = null;

  Object.keys(spelledOutNumbers).forEach((spelledOutNumber) => {
    const maybeReversedSpelledOutNumber = reverse
      ? spelledOutNumber.split("").reverse().join("")
      : spelledOutNumber;
    const index = string.indexOf(maybeReversedSpelledOutNumber);
    if (firstIndex === null || (index >= 0 && index < firstIndex)) {
      first = spelledOutNumbers[spelledOutNumber];
      firstIndex = index;
    }
  });

  return first;
};

part2Array.forEach((line) => {
  const first = getFirstInt2(line);
  const last = getFirstInt2(line.split("").reverse().join(""), true);

  const combinedNumber = parseInt(`${first}${last}`);
  part2Total += combinedNumber;
});

console.log(`Part one total: ${part1Total}`)
console.log(`Part two total: ${part2Total}`)
