// @ts-check

const DEFAULT_STUDENTS = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Fred",
  "Ginny",
  "Harriet",
  "Ileana",
  "Joseph",
  "Kincaid",
  "Larry",
];

const PLANT_CODES = {
  G: "grass",
  V: "violets",
  R: "radishes",
  C: "clover",
};

export class Garden {
  rows;
  /**
   *
   * @param {string} diagram
   * @param {string[]} students
   */
  constructor(diagram, students = DEFAULT_STUDENTS) {
    this.rows = diagram.split("\n");
    this.students = students.sort();
  }

  /**
   *
   * @param {string} student
   * @returns {string[]}
   */
  plants(student) {
    const start = this.students.indexOf(student) * 2,
      end = start + 2;
    return this.rows.flatMap((row) =>
      [...row.slice(start, end)].map((plant) => PLANT_CODES[plant])
    );
  }
}
