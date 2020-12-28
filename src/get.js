'use strict';
// credits mostly go to https://github.com/coderaiser/jessy

const empty = obj => !Object.keys(obj).length;

function check(selector, obj, divider) {
  if (typeof selector !== 'string') throw Error('selector should be string!');

  if (typeof divider !== 'string' || divider === '')
    throw Error('divider should be a nonempty string!');

  if (typeof obj !== 'object') throw Error('obj should be object!');
}

module.exports = (obj, selector, divider) => {
  if (divider === undefined) {
    divider = '.';
  }

  check(selector, obj, divider);

  if (!selector) return obj;

  if (empty(obj)) return undefined;

  const selects = selector.split(divider);

  selects.some((name, i) => {
    const nestedName = selects.slice(i).join(divider);

    if (typeof obj[nestedName] !== 'undefined') {
      obj = obj[nestedName];
      return true;
    }

    if (!obj[name]) {
      obj = undefined;
      return true;
    }

    obj = obj[name];

    return !obj;
  });

  return obj;
};