export const transpose = (matrix) =>
  [...Array(Math.max(...matrix.map((row) => row.length), 0))].map((_, index) =>
    matrix
      .reduceRight((mat, row) => [row.padEnd(mat[0]?.length ?? 0), ...mat], [])
      .map((row) => row[index])
      .join("")
  );
