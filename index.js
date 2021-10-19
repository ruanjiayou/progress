const stringWidth = require('string-width');

const MOVE_LEFT = '\u001b[1000D'
const MOVE_UP = '\u001b[1A'
const CLEAR_LINE = '\u001b[0K'

const stream = process.stdout;
const write = stream.write;

stream.write = function (data) {
  return write.apply(this, arguments);
};
process.on('exit', function () {
  if (progress.nextStr) stream.write('\n');
});

const progress = {
  prevLineCount: 0,
  nextStr: '',
  print() {
    let str = '';

    for (let i = 0; i < this.prevLineCount; i++) {
      str += MOVE_LEFT + CLEAR_LINE + (i < this.prevLineCount - 1 ? MOVE_UP : '');
    }
    str += Array.prototype.join.call(arguments, ' ') + '\n';
    str += this.nextStr;
    stream.write(str);
  },
  update() {
    let str = '';
    this.nextStr = Array.prototype.join.call(arguments, ' ') + '\n';

    for (let i = 0; i < this.prevLineCount - 1; i++) {
      str += MOVE_LEFT + CLEAR_LINE + (i < this.prevLineCount - 1 ? MOVE_UP : '');
    }

    // Actual log output
    str += this.nextStr;
    stream.write(str);

    // How many lines to remove on next clear screen
    const prevLines = this.nextStr.split('\n');
    this.prevLineCount = 0;
    for (let i = 0; i < prevLines.length; i++) {
      this.prevLineCount += Math.ceil(stringWidth(prevLines[i]) / stream.columns) || 1;
    }
  },
  clear() {
    let str = '';
    for (let i = 0; i < this.prevLineCount; i++) {
      str += MOVE_LEFT + CLEAR_LINE + (i < this.prevLineCount - 1 ? MOVE_UP : '');
    }
    this.prevLineCount = 0;
    this.nextStr = '';
    stream.write(str);
  }
}

module.exports = progress;