import { puzzleInputPart1 } from "./puzzleInput";

const gameArray = puzzleInputPart1.split("\n");

const testBag = {
  red: 12,
  green: 13,
  blue: 14,
};

let gameSum = 0;
let powerSum = 0;

gameArray.forEach((game) => {
  const [gameString, grabsString] = game.split(":");
  const grabsStringArray = grabsString.split(";");

  const colorMax: Record<string, number> = {
    red: 0,
    green: 0,
    blue: 0,
  };

  let isPossible = true;
  grabsStringArray.forEach((grabString) => {
    const remainingCubes: Record<string, number> = { ...testBag };
    const cubeStringArray = grabString.split(",");
    cubeStringArray.forEach((cubeString) => {
      const [count, color] = cubeString.trim().split(" ");
      const countNum = parseInt(count);
      remainingCubes[color] -= parseInt(count);

      if (countNum > colorMax[color]) {
        colorMax[color] = countNum;
      }
    });

    const isGrabPossible = Object.keys(remainingCubes).every((color) => {
      return remainingCubes[color] >= 0;
    });

    if (!isGrabPossible) {
      isPossible = false;
    }
  });

  if (isPossible) {
    const [label, numberString] = gameString.split(" ");

    gameSum += parseInt(numberString);
  }

  const power = Object.keys(colorMax).reduce((acc, color, i) => {
    const max: number = colorMax[color];
    return i === 0 ? max : acc * max;
  }, 0);

  powerSum += power;
});

console.log(`Part one total: ${gameSum}`);
console.log(`Part two total: ${powerSum}`);
