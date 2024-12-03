import * as fs from "fs";

(() => {
  const useRedundancy: boolean = true;
  const path: string = "./input.txt";
  const content: string = fs.readFileSync(path, "utf8");

  const isSafe = (
    report: number[],
    ignore: number | undefined = undefined,
  ): boolean => {
    let lastDelta: number | undefined;
    const modifiedReport = report.filter((_, iter) => ignore !== iter);
    for (let i = 1; i < modifiedReport.length; i++) {
      const curVal: number = modifiedReport[i];
      const lastVal: number = modifiedReport[i - 1];
      const delta: number = curVal - lastVal;

      if (
        lastDelta &&
        ((lastDelta > 0 && delta < 0) || (lastDelta < 0 && delta > 0))
      ) {
        if (useRedundancy && (ignore === undefined || ignore < report.length)) {
          const nextIgnoreCol = ignore === undefined ? 0 : ignore + 1;
          return isSafe(report, nextIgnoreCol);
        } else {
          return false;
        }
      }

      // Must be between 1 and 3 of the previous
      if (lastVal && (lastVal === curVal || Math.abs(lastVal - curVal) > 3)) {
        if (useRedundancy && (ignore === undefined || ignore < report.length)) {
          const nextIgnoreCol = ignore === undefined ? 0 : ignore + 1;
          return isSafe(report, nextIgnoreCol);
        } else {
          return false;
        }
      }

      lastDelta = delta;
    }

    return true;
  };

  const reports: number[][] = content
    .trim()
    .split("\n")
    .map((row: string) => {
      const levels: number[] = row
        .trim()
        .split(/\s+/)
        .map((level: string) => {
          return Number(level.trim());
        });

      return levels;
    });

  const total: number = reports.reduce((acc: number, cur: number[]) => {
    const isReportSafe = isSafe(cur);
    acc += isReportSafe ? 1 : 0;
    return acc;
  }, 0);

  console.log(`total ${total}`);
})();
