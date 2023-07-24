// @ts-check

export const recite = (
  /** @type number */ first,
  /** @type number */ last = first
) => {
  if (last === first) {
    return `On the ${
      DAYS[first].ordinal
    } day of Christmas my true love gave to me: ${presentsForDay(first)}.\n`;
  } else {
    return recite(first, last - 1) + "\n" + recite(last, last);
  }
};

const presentsForDay = (day) =>
  day === 1
    ? DAYS[day].present
    : DAYS[day].present +
      (day === 2 ? ", and " : ", ") +
      presentsForDay(day - 1);

const DAYS = {
  1: { ordinal: "first", present: "a Partridge in a Pear Tree" },
  2: { ordinal: "second", present: "two Turtle Doves" },
  3: { ordinal: "third", present: "three French Hens" },
  4: { ordinal: "fourth", present: "four Calling Birds" },
  5: { ordinal: "fifth", present: "five Gold Rings" },
  6: { ordinal: "sixth", present: "six Geese-a-Laying" },
  7: { ordinal: "seventh", present: "seven Swans-a-Swimming" },
  8: { ordinal: "eighth", present: "eight Maids-a-Milking" },
  9: { ordinal: "ninth", present: "nine Ladies Dancing" },
  10: { ordinal: "tenth", present: "ten Lords-a-Leaping" },
  11: { ordinal: "eleventh", present: "eleven Pipers Piping" },
  12: { ordinal: "twelfth", present: "twelve Drummers Drumming" },
};
