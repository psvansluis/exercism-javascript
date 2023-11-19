// @ts-check

const lineHeight = 4;
const charWidth = 3;
const rawToNumber = {
  '[" _ ","| |","|_|","   "]': 0,
  '["   ","  |","  |","   "]': 1,
  '[" _ "," _|","|_ ","   "]': 2,
  '[" _ "," _|"," _|","   "]': 3,
  '["   ","|_|","  |","   "]': 4,
  '[" _ ","|_ "," _|","   "]': 5,
  '[" _ ","|_ ","|_|","   "]': 6,
  '[" _ ","  |","  |","   "]': 7,
  '[" _ ","|_|","|_|","   "]': 8,
  '[" _ ","|_|"," _|","   "]': 9,
};

const chunk = (/** @type {string[]} */ strings, /** @type {number} */ size) =>
  Array.from(Array(Math.ceil(strings.length / size)), (_, i) =>
    strings.slice(i * size, i * size + size)
  );

const transpose = (/** @type {any[][]} */ mat) =>
  mat[0].map((_, i) => mat.map((r) => r[i]));

const lineToRawChars = (/** @type {string[]} */ line) =>
  transpose(
    line.map((rawLines) =>
      chunk([...rawLines], charWidth).map((chs) => chs.join(""))
    )
  );

const rawCharsToParsed = (/** @type {string[][]} */ line) =>
  line.map((char) => rawToNumber[JSON.stringify(char)] ?? "?").join("");

export const convert = (/** @type {string} */ raw) =>
  chunk(raw.split("\n"), lineHeight)
    .map(lineToRawChars)
    .map(rawCharsToParsed)
    .join(",");
