import * as fs from "fs";

(() => {
  const path = "./src/input.txt";
  const content: string = fs.readFileSync(path, "utf8");
  const lines: string[] = content.trim().split("\n");
  let lefts: number[] = [];
  let rights: number[] = [];

  lines.forEach((line) => {
    const [left, right] = line.split(/\s+/).map((numStr) => {
      return Number(numStr.trim());
    });

    lefts.push(left);
    rights.push(right);
  });

  const sorter = (a: number, b: number) => a - b;
  lefts.sort(sorter);
  rights.sort(sorter);

  let distanceSum = 0;
  lefts.forEach((left, iter) => {
    const right: number = rights[iter];
    const absoluteDistance: number = Math.abs(left - right);
    distanceSum += absoluteDistance;
  });

  console.log("total distance: \t\t" + distanceSum);

  let similarity = 0;
  lefts.forEach((left) => {
    // HACK: Yuck! N^2 time, but it works for the input size of 1000 lines.
    const rightCount = rights.reduce((acc, cur) => {
      return acc + (cur === left ? 1 : 0);
    }, 0);

    similarity += left * rightCount;
  });

  console.log("total similarity: \t\t" + similarity);
})();
