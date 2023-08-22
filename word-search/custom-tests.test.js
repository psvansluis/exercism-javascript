import WordSearch from "./word-search";
describe("custom tests", () => {
  test("tl>br diagonal only", () => {
    const grid = [
      "jefblpepre",
      "camdcimgtc",
      "oivokprjsm",
      "pbwasqroua",
      "rixilelhrs",
      "wolcqlirpc",
      "screeaumgr",
      "alxhpburyi",
      "jalaycalmp",
      "clojurermt",
    ];
    const expectedResults = {
      java: {
        start: [1, 1],
        end: [4, 4],
      },
    };
    const wordSearch = new WordSearch(grid);

    expect(wordSearch.find(["java"])).toEqual(expectedResults);
  });

  test("rotate grid once", () => {
    const grid = ["abc", "def"];
    const rotated = [
      ["d", "a"],
      ["e", "b"],
      ["f", "c"],
    ];
    const wordSearch = new WordSearch(grid);
    expect(wordSearch.rotateGridRight(1)).toEqual(rotated);
  });

  test("rotate grid twice", () => {
    const grid = ["abc", "def"];
    const rotated = [
      ["f", "e", "d"],
      ["c", "b", "a"],
    ];
    const wordSearch = new WordSearch(grid);
    expect(wordSearch.rotateGridRight(2)).toEqual(rotated);
  });

  test("rotate grid thrice", () => {
    const grid = ["abc", "def"];
    const rotated = [
      ["c", "f"],
      ["b", "e"],
      ["a", "d"],
    ];
    const wordSearch = new WordSearch(grid);
    expect(wordSearch.rotateGridRight(3)).toEqual(rotated);
  });
});
