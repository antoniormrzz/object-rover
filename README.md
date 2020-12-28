# object-rover

A package to get, read and modify nested javascript object properties. List all nested leaf properties of object, optionally get their primitive types, then iterate over them and change what you need. Very useful for json validation.
This package will be used for a complete rewrite of [express-autosanitizer](https://www.npmjs.com/package/express-autosanitizer), a popular tool that cleans xss injections from express requests.


## Support Me
If this does help you, please consider making a tiny donation [here,](https://www.patreon.com/bePatron?u=44856855) even small amounts help! 🤝

# Why Object Rover?
-   Straightforward, easy functions.
-   Provides typescript types for function parameters and returned values.
-   Supports Async listing of properties, for large objects.
-   You can optionally list primitive types of leaf notes (e.g. string, boolean)
-   Pretty small.
-   Is tested and passing all tests, Almost 100% coverage.
-   Convert recursive traversing of an object into iterating over an array, with support for async!



## Getting Started

```
npm i object-rover
```
### Examples:

```
const rover = require('object-rover');

const testObj = {
		foo:  null,
		bar: {
		 a: {
		  b:  'hello'
		 },
		 c:  false
		}
	  };
	  
rover.getProperties(testObj)
// ['foo', 'bar.c', 'bar.a.b']

await rover.getPropertiesAsync(testObj)
// ['foo', 'bar.c', 'bar.a.b']

// for a list of types, read types section
rover.getPropertiesWithTypes(testObj)
// [{ path:  'foo', type:  'null' }, 
//  { path:  'bar.c', type:  'boolean' },
//  { path:  'bar.a.b', type:  'string' }]

await rover.getPropertiesWithTypesAsync(testObj)
// [{ path:  'foo', type:  'null' }, 
//  { path:  'bar.c', type:  'boolean' },
//  { path:  'bar.a.b', type:  'string' }]

rover.getProperty(testObj, 'foo') // null
rover.getProperty(testObj, 'bar.a.b') // 'hello'
rover.getProperty(testObj, 'bar.a') 
// testObj.bar.a object will be returned

// set is mutating, so we clone testObj if we need to get a new object
rover.setProperty({ ...testObj }, 'bar.a.b', 44)
// returns an object like testObj except testObj.bar.a.b will be 44
```
## Types

Returned types are JavaScript Primitive types, with null and array. JavaScript recognizes null and arrays as objects, but you might need to filter them out or do something with them, so object-rover indicates that.
- 'string', 'boolean', 'array', 'undefined', 'number', 'bigint', 'symbol', 'null', 'function'

# API
**divider** is a nonempty string that is used to parse/generate paths, by default it is a dot. if you pass '-' for example, you will get paths like bar-a-b

**selector** is the path string, e.g. 'bar.a.c'

**getProperties(obj:  object, divider?:  string):  string[]**
- Returns array of paths for nested leaf properties of obj

**getPropertiesAsync(obj:  object, divider?:  string):  Promise<string[]>**
- Returns a promise that resolves to an array of paths for nested leaf properties of obj

**getPropertiesWithTypes(obj:  object,divider?:  string): { path:  string; type:  PrimitiveType }[]**
- Returns an array of paths and types for nested leaf properties of obj

**getPropertiesWithTypesAsync(obj:  object,divider?:  string):  Promise<{ path:  string; type:  PrimitiveType }[]>**
- Returns a promise that resolves to an array of paths and types for nested leaf properties of obj

**setProperty(obj:  object,selector:  string,value:  any,divider?:  string):  object**
- Sets the selector path to value and returns the object
- Mutates the obj, clone if you need immutability like examples above

**getProperty(obj:  object,selector:  string,divider?:  string):  PrimitiveType  |  object**
- Gets the value at selector path

## License

Distributed under the MIT License. See  `LICENSE`  for more information.

## Credits

A huge portion of this package is based on code written by [coderaiser](https://github.com/coderaiser)


## Contact

Antonio Ramirez:  [sepehralizade@live.com](mailto:sepehralizade@live.com)

Project Link:  [Github](https://github.com/antoniormrzz/object-rover)

## Key Phrases
how to get all nested properties of object
how to list all leaf properties of object
list nested properties of object
list nested primitive properties of object
set nested property of object
get nested property of object


