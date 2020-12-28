'use strict';
// credits mostly go to https://github.com/coderaiser/all-object-keys

const bend = require('callback-bender');

const isObject = a => typeof a === 'object';
const isEmptyObject = a => !Object.keys(a).length;
const isSimple = a => !a || !isObject(a) || isEmptyObject(a);
const pop = a => a.pop() || [];
const isArray = a => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(a) === '[object Array]';
  } else {
    return Array.isArray(a);
  }
};

function _Sync(obj, divider) {
  if (divider === undefined) divider = '.';

  check(divider, obj);

  if (isEmptyObject(obj)) return [];

  return getAll(divider, obj);
}

const _Async = async (obj, divider) => {
  if (divider === undefined) divider = '.';

  check(divider, obj);

  if (isEmptyObject(obj)) return [];

  return await bend.cp.single(getAllAsync)(divider, obj);
};

function _SyncTypes(obj, divider) {
  if (divider === undefined) divider = '.';

  check(divider, obj);

  if (isEmptyObject(obj)) return [];

  return getAllWithTypes(divider, obj);
}

const _AsyncTypes = async (obj, divider) => {
  if (divider === undefined) divider = '.';

  check(divider, obj);

  if (isEmptyObject(obj)) return [];

  return await bend.cp.single(getAllWithTypesAsync)(divider, obj);
};

function getAll(divider, obj) {
  const result = [];

  const [currentResult, stack] = readPaths(obj, divider);

  result.push(...currentResult);

  let [key, current] = pop(stack);

  while (current) {
    const [currentResult, currentStack] = readPaths(current, divider, key);

    result.push(...currentResult);
    stack.push(...currentStack);

    [key, current] = pop(stack);
  }

  return result;
}

function getAllAsync(divider, obj, cb) {
  const result = [];

  const [currentResult, stack] = readPaths(obj, divider);

  result.push(...currentResult);

  let [key, current] = pop(stack);

  while (current) {
    const [currentResult, currentStack] = readPaths(current, divider, key);

    result.push(...currentResult);
    stack.push(...currentStack);

    [key, current] = pop(stack);
  }

  cb(result);
}

function getAllWithTypes(divider, obj) {
  const result = [];

  const [currentResult, stack] = readPathsWithTypes(obj, divider);

  result.push(...currentResult);

  let [key, current] = pop(stack);

  while (current) {
    const [currentResult, currentStack] = readPathsWithTypes(current, divider, key);

    result.push(...currentResult);
    stack.push(...currentStack);

    [key, current] = pop(stack);
  }

  return result;
}

function getAllWithTypesAsync(divider, obj, cb) {
  const result = [];

  const [currentResult, stack] = readPathsWithTypes(obj, divider);

  result.push(...currentResult);

  let [key, current] = pop(stack);

  while (current) {
    const [currentResult, currentStack] = readPathsWithTypes(current, divider, key);

    result.push(...currentResult);
    stack.push(...currentStack);

    [key, current] = pop(stack);
  }

  cb(result);
}

function readPaths(obj, divider, path = '') {
  const result = [];
  const stack = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullPath = !path ? key : `${path}${divider}${key}`;

    if (isArray(value)) {
      result.push(fullPath);
      continue;
    }

    if (isSimple(value) || isArray(value)) {
      result.push(fullPath);
      continue;
    }

    stack.push([fullPath, value]);
  }

  return [result, stack];
}

function readPathsWithTypes(obj, divider, path = '') {
  const result = [];
  const stack = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullPath = !path ? key : `${path}${divider}${key}`;

    if (isArray(value)) {
      result.push({ path: fullPath, type: 'array' });
      continue;
    }

    if (isSimple(value)) {
      result.push({ path: fullPath, type: value === null ? 'null' : typeof value });
      continue;
    }

    stack.push([fullPath, value]);
  }

  return [result, stack];
}

function check(divider, obj) {
  if (typeof divider !== 'string' || divider === '')
    throw Error('divider should be a nonempty string!');

  if (typeof obj !== 'object' || isArray(obj)) throw Error('obj should be an object!');
}

module.exports = {
  getProperties: _Sync,
  getPropertiesAsync: _Async,
  getPropertiesWithTypes: _SyncTypes,
  getPropertiesWithTypesAsync: _AsyncTypes
};
