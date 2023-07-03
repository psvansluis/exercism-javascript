// @ts-check

export class LinkedList {
  /**
   * @param {ListItem | null} firstItem
   */
  constructor(firstItem = null) {
    this.firstItem = firstItem;
  }

  push(val) {
    if (this.firstItem === null) {
      this.firstItem = new ListItem(val);
    } else {
      this.firstItem.addItemAtEnd(val);
    }
  }

  pop() {
    if (this.firstItem === null) {
      return null;
    } else if (this.firstItem === this.firstItem.getLast()) {
      const val = this.firstItem.content;
      this.firstItem = null;
      return val;
    } else {
      const val = this.firstItem.getLast().content;
      this.firstItem.getLast().previous?.removeNext();
      return val;
    }
  }

  shift() {
    if (
      this.firstItem === null ||
      this.firstItem === this.firstItem.getLast()
    ) {
      return this.pop();
    } else {
      const val = this.firstItem.content;
      const second = this.firstItem.next;
      second?.removePrevious();
      this.firstItem = second;
      return val;
    }
  }

  unshift(val) {
    if (this.firstItem === null) {
      this.push(val);
    } else {
      const first = this.firstItem;
      this.firstItem = new ListItem(val, null, first);
    }
  }

  delete(val) {
    if (this.firstItem === null) {
      return;
    }
    if (this.firstItem.content === val) {
      if (this.firstItem.next !== null) {
        this.firstItem = this.firstItem.next;
        this.firstItem.previous = null;
      } else {
        this.firstItem = null;
      }
    } else {
      let isDeleted = false;
      let index = 1;
      while (!isDeleted) {
        if (this.firstItem.getNext(index).content === val) {
          this.firstItem.getNext(index).delete();
          isDeleted = true;
        } else {
          index++;
        }
        if (index > this.count()) {
          break;
        }
      }
    }
  }

  count() {
    if (this.firstItem === null) {
      return 0;
    } else {
      return this.firstItem.getDistanceFromEnd();
    }
  }
}

class ListItem {
  /**
   *
   * @param {any} content
   * @param {ListItem | null} previous
   * @param {ListItem | null} next
   */
  constructor(content, previous = null, next = null) {
    this.content = content;
    this.previous = previous;
    this.next = next;
  }

  addItemAtEnd(content) {
    const added = new ListItem(content, this.getLast());
    this.getLast().next = added;
  }

  delete() {
    if (this.previous !== null) {
      this.previous.next = this.next;
    }
    if (this.next !== null) {
      this.next.previous = this.previous;
    }
  }

  /**
   *
   * @returns {ListItem}
   */
  getLast() {
    if (this.next === null) {
      return this;
    } else {
      return this.next.getLast();
    }
  }

  /**
   *
   * @param {number} distance
   * @returns {ListItem}
   */
  getNext(distance = 1) {
    if (distance === 0 || this.next === null) {
      return this;
    } else if (distance === 1) {
      return this.next;
    } else {
      return this.next.getNext(distance - 1);
    }
  }
  /**
   *
   * @param {number} counted
   * @returns number
   */
  getDistanceFromEnd(counted = 1) {
    if (this.next === null) {
      return counted;
    } else {
      return this.next.getDistanceFromEnd(counted + 1);
    }
  }

  removeNext() {
    this.next = null;
  }

  removePrevious() {
    this.previous = null;
  }
}
