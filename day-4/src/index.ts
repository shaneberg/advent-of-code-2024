import * as fs from "fs";
(() => {
  const content: string = fs.readFileSync("./input.txt", "utf8");
  const lines: string[] = content.trim().split("\n");
  const matrix: string[][] = lines.map((line) => {
    return line.split("");
  });

  const checkTarget = (
    matrix: string[][],
    x: number,
    y: number,
    dirX: number,
    dirY: number,
    target: string,
    depth: number,
  ): boolean => {
    if (x < 0 || x >= matrix.length || y < 0 || y >= matrix[0].length) {
      return false; // out of bounds
    }

    const cur: string = matrix[x][y];
    const match: boolean = cur === target[depth];

    if (!match) {
      return false;
    }

    if (depth === target.length - 1) {
      // We've found the word!
      return true;
    }

    return checkTarget(
      matrix,
      x + dirX,
      y + dirY,
      dirX,
      dirY,
      target,
      depth + 1,
    );
  };

  const target: string = "XMAS";
  const countTarget = (matrix: string[][], target: string): number => {
    let count = 0;
    for (let x = 0; x < matrix.length; x++) {
      for (let y = 0; y < matrix[0].length; y++) {
        // check left
        count += checkTarget(matrix, x, y, -1, 0, target, 0) ? 1 : 0;
        // check up-left
        count += checkTarget(matrix, x, y, -1, -1, target, 0) ? 1 : 0;
        // check up
        count += checkTarget(matrix, x, y, 0, -1, target, 0) ? 1 : 0;
        // check up-right
        count += checkTarget(matrix, x, y, 1, -1, target, 0) ? 1 : 0;
        // check right
        count += checkTarget(matrix, x, y, 1, 0, target, 0) ? 1 : 0;
        // check down-right
        count += checkTarget(matrix, x, y, 1, 1, target, 0) ? 1 : 0;
        // check down
        count += checkTarget(matrix, x, y, 0, 1, target, 0) ? 1 : 0;
        // check down-left
        count += checkTarget(matrix, x, y, -1, 1, target, 0) ? 1 : 0;
      }
    }

    return count;
  };

  const countXMases = (matrix: string[][]) => {
    let count = 0;
    const xmasTarget = "MAS";
    for (let x = 0; x < matrix.length; x++) {
      for (let y = 0; y < matrix[0].length; y++) {
        if (
          (checkTarget(matrix, x - 1, y - 1, 1, 1, xmasTarget, 0) || // up-left
            checkTarget(matrix, x + 1, y + 1, -1, -1, xmasTarget, 0)) && // down-right
          (checkTarget(matrix, x - 1, y + 1, 1, -1, xmasTarget, 0) || // down-left
            checkTarget(matrix, x + 1, y - 1, -1, 1, xmasTarget, 0)) // up-right
        ) {
          count++;
        }
      }
    }
    return count;
  };

  console.log(countTarget(matrix, target));
  console.log(countXMases(matrix));
})();
