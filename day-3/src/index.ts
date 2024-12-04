import * as fs from "fs";

(() => {
  const filename: string = "./input.txt";
  const content: string = fs.readFileSync(filename, "utf8");

  const process = (content: string): number => {
    const regex: RegExp = /mul\(\d{1,3}\,\d{1,3}\)/g;
    const mulMatches: string[] = content.match(regex) ?? [];

    return mulMatches.reduce((acc: number, item: string) => {
      const matches: string[] = item.match(/\d{1,3}/g) ?? [];
      const [left, right]: number[] = matches.map(Number);
      return acc + left * right;
    }, 0);
  };

  const processEligibleMuls = (content: string): number => {
    const regex: RegExp = /(?:^|do\(\))(.*?)(?:don't\(\)|$)/gs;
    const eligibleMatches: string[] = content.match(regex) ?? [];

    return eligibleMatches.reduce((acc: number, item: string) => {
      return acc + process(item);
    }, 0);
  };

  console.log(`sum of all products: ${process(content)}`);
  console.log(`sum of all eligible products: ${processEligibleMuls(content)}`);
})();
