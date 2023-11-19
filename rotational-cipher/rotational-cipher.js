// @ts-check

export const rotate = (string, by) => {
  return [...string]
    .map((char) => {
      const charCode = char.charCodeAt(0),
        shifted = charCode + by;
      if (charCode >= 65 && charCode <= 90) {
        const offset = shifted > 90 ? -26 : 0;
        return String.fromCharCode(shifted + offset);
      } else if (charCode >= 97 && charCode <= 122) {
        const offset = shifted > 122 ? -26 : 0;
        return String.fromCharCode(shifted + offset);
      } else {
        return char;
      }
    })
    .join("");
};
