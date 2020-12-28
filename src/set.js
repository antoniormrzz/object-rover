'use strict';
// // credits mostly go to https://github.com/coderaiser/nessy

const notSecure = a => /__proto__|prototype/.test(a);

function check(selector, divider) {
  if (typeof divider !== 'string' || divider === '')
    throw Error('divider should be a nonempty string!');

  if (typeof selector !== 'string' || selector === '') throw Error('selector should be a nonempty string!');
}

module.exports = (obj, selector, value, divider) => {
  if (divider === undefined) {
    divider = '.';
  }

  const result = obj;

  check(selector, divider);

  const arr = selector.split(divider);

  for (let i = 0; i < arr.length; i++) {
    const name = arr[i];

    if (notSecure(name)) continue;

    if (i === arr.length - 1) obj[name] = value;
    else if (!obj[name]) obj[name] = {};

    obj = obj[name];
  }

  return result;
};
