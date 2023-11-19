// @ts-check

const ANIMALS = {
  fly: "",
  spider: "It wriggled and jiggled and tickled inside her.\n",
  bird: "How absurd to swallow a bird!\n",
  cat: "Imagine that, to swallow a cat!\n",
  dog: "What a hog, to swallow a dog!\n",
  goat: "Just opened her throat and swallowed a goat!\n",
  cow: "I don't know how she swallowed a cow!\n",
  horse: "She's dead, of course!\n",
};

const first = (verse) =>
  `I know an old lady who swallowed a ${animal(verse)}.\n`;

const second = (verse) => ANIMALS[animal(verse)];

const middle = (verse) =>
  verse < 2 || verse > 7
    ? ""
    : `She swallowed the ${animal(verse)} to catch the ${animal(verse - 1)}${
        verse === 3 ? ANIMALS.spider.replace("It", " that") : ".\n"
      }${middle(verse - 1)}`;

const last = (verse) =>
  verse > 7
    ? ""
    : `I don't know why she swallowed the fly. Perhaps she'll die.\n`;

const animal = (verse) => Object.keys(ANIMALS)[verse - 1];

export class Song {
  verse = (n) => first(n) + second(n) + middle(n) + last(n);

  verses = (start, end) =>
    start > end ? "" : `${this.verse(start)}\n${this.verses(start + 1, end)}`;
}
