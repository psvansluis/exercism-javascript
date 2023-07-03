// @ts-check

/**
 * Implement the classes etc. that are needed to solve the
 * exercise in this file. Do not forget to export the entities
 * you defined so they are available for the tests.
 */
export class Size {
  constructor(width = 80, height = 60) {
    this.width = width;
    this.height = height;
  }
  /**
   *
   * @param {number} newWidth
   * @param {number} newHeight
   */
  resize(newWidth, newHeight) {
    this.width = newWidth;
    this.height = newHeight;
  }
}

export class Position {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  /**
   *
   * @param {number} newX
   * @param {number} newY
   */
  move(newX, newY) {
    this.x = newX;
    this.y = newY;
  }
}

export class ProgramWindow {
  constructor() {
    this.screenSize = new Size(800, 600);
    this.size = new Size();
    this.position = new Position();
  }
  /**
   *
   * @param {Size} newSize
   */
  resize(newSize) {
    this.size.resize(
      Math.max(
        1,
        Math.min(newSize.width, this.screenSize.width - this.position.x)
      ),
      Math.max(
        1,
        Math.min(newSize.height, this.screenSize.height - this.position.y)
      )
    );
  }
  /**
   *
   * @param {Position} position
   */
  move(position) {
    this.position.move(
      Math.max(
        0,
        Math.min(this.screenSize.width - this.size.width, position.x)
      ),
      Math.max(
        0,
        Math.min(this.screenSize.height - this.size.height, position.y)
      )
    );
  }
}

/**
 * @param {ProgramWindow} window
 * @returns {ProgramWindow}
 */
export function changeWindow(window) {
  window.resize(new Size(400, 300));
  window.move(new Position(100, 150));
  return window;
}
