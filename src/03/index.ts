import { puzzleInput } from "./puzzleInput";

const linesArrayOriginal = puzzleInput.split("\n");
const linesArray = linesArrayOriginal;
const isNumber = (str: string) => !isNaN(parseInt(str));
const isSymbol = (str?: string) =>
  typeof str === "string" && str !== "." && !isNumber(str);

let partSum = 0;

type LineNumber = {
  string: string;
  firstIndex: number;
  lastIndex?: number;
};

const numbersByLine: Record<number, Array<LineNumber>> = {};

linesArray.forEach((line, lineIndex) => {
  const lineArray = line.split("");
  const thisLineNumbers: Array<LineNumber> = [];

  lineArray.forEach((char, charIndex) => {
    if (char === ".") return;
    if (isNumber(char)) {
      const lastLineNumber =
        thisLineNumbers.length === 0
          ? null
          : thisLineNumbers[thisLineNumbers.length - 1];

      if (
        lastLineNumber === null ||
        typeof lastLineNumber.lastIndex === "number"
      ) {
        // Create new
        thisLineNumbers.push({ string: char, firstIndex: charIndex });
      } else {
        // Add to existing
        thisLineNumbers[thisLineNumbers.length - 1].string += char;
      }
      if (!isNumber(lineArray[charIndex + 1])) {
        thisLineNumbers[thisLineNumbers.length - 1].lastIndex = charIndex;
      }
    }
  });

  numbersByLine[lineIndex] = thisLineNumbers;

  // determine if symbols are adjecent to each number
  thisLineNumbers.forEach((cur) => {
    // before
    if (cur.firstIndex > 0 && isSymbol(lineArray[cur.firstIndex - 1])) {
      partSum += parseInt(cur.string);
      return;
    }

    // after
    if (cur.lastIndex && isSymbol(lineArray[cur.lastIndex + 1])) {
      partSum += parseInt(cur.string);
      return;
    }

    // above
    if (
      lineIndex > 0 &&
      cur.lastIndex &&
      linesArray[lineIndex - 1]
        .substring(Math.max(cur.firstIndex - 1, 0), cur.lastIndex + 2)
        .split("")
        .some(isSymbol)
    ) {
      partSum += parseInt(cur.string);
      return;
    }

    // below
    if (
      lineIndex < linesArray.length - 1 &&
      cur.lastIndex &&
      linesArray[lineIndex + 1]
        .substring(Math.max(cur.firstIndex - 1, 0), cur.lastIndex + 2)
        .split("")
        .some(isSymbol)
    ) {
      partSum += parseInt(cur.string);
      return;
    }
  });
});

let gearRatioSum = 0;
linesArray.forEach((line, lineIndex) => {
  const lineArray = line.split("");

  const thisLineGears: Array<number> = [];

  lineArray.forEach((char, charIndex) => {
    if (char === "*") {
      thisLineGears.push(charIndex);
      return;
    }
  });

  thisLineGears.forEach((gearIndex) => {
    let matchingNumbers: Array<LineNumber> = [];
    const thisLineNumbers = numbersByLine[lineIndex];

    // before
    const beforeMatch = thisLineNumbers.find(
      (n) => n.lastIndex && n.lastIndex + 1 === gearIndex,
    );
    if (beforeMatch) {
      matchingNumbers.push(beforeMatch);
    }

    // after
    const afterMatch = thisLineNumbers.find(
      (n) => n.firstIndex - 1 === gearIndex,
    );
    if (afterMatch) {
      matchingNumbers.push(afterMatch);
    }

    // above
    const prevLineNumbers = lineIndex > 0 ? numbersByLine[lineIndex - 1] : null;
    if (prevLineNumbers) {
      const aboveMatches = prevLineNumbers.filter(
        (n) =>
          n.lastIndex &&
          gearIndex >= n.firstIndex - 1 &&
          gearIndex <= n.lastIndex + 1,
      );
      if (aboveMatches.length > 0) {
        matchingNumbers = [...matchingNumbers, ...aboveMatches];
      }
    }

    // below
    const nextLineNumbers =
      lineIndex < linesArray.length - 1 ? numbersByLine[lineIndex + 1] : null;
    if (nextLineNumbers) {
      const belowMatches = nextLineNumbers.filter(
        (n) =>
          n.lastIndex &&
          gearIndex >= n.firstIndex - 1 &&
          gearIndex <= n.lastIndex + 1,
      );
      if (belowMatches.length > 0) {
        matchingNumbers = [...matchingNumbers, ...belowMatches];
      }
    }

    if (matchingNumbers.length === 2) {
      const thisRatio =
        parseInt(matchingNumbers[0].string) *
        parseInt(matchingNumbers[1].string);
      gearRatioSum += thisRatio;
    }
  });
});

console.log(`Part one totals: ${partSum}`);
console.log(`Part two total: ${gearRatioSum}`);
