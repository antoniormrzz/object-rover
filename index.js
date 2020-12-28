const {
  getProperties,
  getPropertiesAsync,
  getPropertiesWithTypes,
  getPropertiesWithTypesAsync
} = require('./src/get-all');
const setProperty = require('./src/set');
const getProperty = require('./src/get');

module.exports = {
  getProperties,
  getPropertiesAsync,
  getPropertiesWithTypes,
  getPropertiesWithTypesAsync,
  setProperty,
  getProperty
};
