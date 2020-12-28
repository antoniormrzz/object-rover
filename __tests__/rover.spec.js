const rover = require('../index');

const testObj = {
  firstName: 'John',
  lastName: false,
  arr: ['a', 'b'],
  undef: undefined,
  id: 23423,
  big: 1123312n,
  sym: Symbol(),
  nu: null,
  blahblah: {
    a: {
      b: 'hello'
    },
    c: false
  },
  fullName: function () {
    return this.firstName + ' ' + this.lastName;
  }
};

const testArray = ['a', 'b'];

describe('Get All', () => {
  // getProperties
  test('Should list all properties', () => {
    expect(rover.getProperties(testObj)).toEqual([
      'firstName',
      'lastName',
      'arr',
      'undef',
      'id',
      'big',
      'sym',
      'nu',
      'fullName',
      'blahblah.c',
      'blahblah.a.b'
    ]);
  });
  test('Should list all properties with a divider', () => {
    expect(rover.getProperties(testObj, '*')).toEqual([
      'firstName',
      'lastName',
      'arr',
      'undef',
      'id',
      'big',
      'sym',
      'nu',
      'fullName',
      'blahblah*c',
      'blahblah*a*b'
    ]);
  });
  test('Should throw instead of listing with faulty divider 1', () => {
    expect(() => {
      rover.getProperties(testObj, 0);
    }).toThrow();
  });
  test('Should throw instead of listing with faulty divider 2', () => {
    expect(() => {
      rover.getProperties(testObj, {});
    }).toThrow();
  });
  test('Should throw instead of listing with empty divider', () => {
    expect(() => {
      rover.getProperties(testObj, '');
    }).toThrow();
  });
  test('Should throw with array', () => {
    expect(() => {
      rover.getProperties(testArray);
    }).toThrow();
  });
  test('Should throw with non-object', () => {
    expect(() => {
      rover.getProperties(45645);
    }).toThrow();
  });
  test('Should return empty array for empty object', () => {
    expect(rover.getProperties({})).toEqual([]);
  });

  // getPropertiesAsync
  test('Should list all properties async', async () => {
    const data = await rover.getPropertiesAsync(testObj);
    expect(data).toEqual([
      'firstName',
      'lastName',
      'arr',
      'undef',
      'id',
      'big',
      'sym',
      'nu',
      'fullName',
      'blahblah.c',
      'blahblah.a.b'
    ]);
  });
  test('Should list all properties with a divider async', async () => {
    const data = await rover.getPropertiesAsync(testObj, '*');
    expect(data).toEqual([
      'firstName',
      'lastName',
      'arr',
      'undef',
      'id',
      'big',
      'sym',
      'nu',
      'fullName',
      'blahblah*c',
      'blahblah*a*b'
    ]);
  });
  test('Should throw instead of listing with faulty divider 1 async', done => {
    rover
      .getPropertiesAsync(testObj, 0)
      .then()
      .catch(e => done());
  });
  test('Should throw instead of listing with faulty divider 2 async', done => {
    rover
      .getPropertiesAsync(testObj, {})
      .then()
      .catch(e => done());
  });
  test('Should throw instead of listing with empty divider async', done => {
    rover
      .getPropertiesAsync(testObj, '')
      .then()
      .catch(e => done());
  });
  test('Should throw with array async', done => {
    rover
      .getPropertiesAsync(testArray)
      .then()
      .catch(e => done());
  });
  test('Should throw with non-object async', done => {
    rover
      .getPropertiesAsync(43345)
      .then()
      .catch(e => done());
  });
  test('Should return empty array for empty object async', async () => {
    expect(await rover.getPropertiesAsync({})).toEqual([]);
  });

  // getPropertiesWithTypes
  test('Should list all properties with types', () => {
    expect(rover.getPropertiesWithTypes(testObj)).toEqual([
      { path: 'firstName', type: 'string' },
      { path: 'lastName', type: 'boolean' },
      { path: 'arr', type: 'array' },
      { path: 'undef', type: 'undefined' },
      { path: 'id', type: 'number' },
      { path: 'big', type: 'bigint' },
      { path: 'sym', type: 'symbol' },
      { path: 'nu', type: 'null' },
      { path: 'fullName', type: 'function' },
      { path: 'blahblah.c', type: 'boolean' },
      { path: 'blahblah.a.b', type: 'string' }
    ]);
  });
  test('Should list all properties with types with a divider', () => {
    expect(rover.getPropertiesWithTypes(testObj, '*')).toEqual([
      { path: 'firstName', type: 'string' },
      { path: 'lastName', type: 'boolean' },
      { path: 'arr', type: 'array' },
      { path: 'undef', type: 'undefined' },
      { path: 'id', type: 'number' },
      { path: 'big', type: 'bigint' },
      { path: 'sym', type: 'symbol' },
      { path: 'nu', type: 'null' },
      { path: 'fullName', type: 'function' },
      { path: 'blahblah*c', type: 'boolean' },
      { path: 'blahblah*a*b', type: 'string' }
    ]);
  });
  test('Should throw instead of listing with types with faulty divider 1', () => {
    expect(() => {
      rover.getPropertiesWithTypes(testObj, 0);
    }).toThrow();
  });
  test('Should throw instead of listing with types with faulty divider 2', () => {
    expect(() => {
      rover.getPropertiesWithTypes(testObj, {});
    }).toThrow();
  });
  test('Should throw instead of listing with types with empty divider', () => {
    expect(() => {
      rover.getPropertiesWithTypes(testObj, '');
    }).toThrow();
  });
  test('Should throw with types with array', () => {
    expect(() => {
      rover.getPropertiesWithTypes(testArray);
    }).toThrow();
  });
  test('Should throw with types with non-object', () => {
    expect(() => {
      rover.getPropertiesWithTypes(45645);
    }).toThrow();
  });
  test('Should return empty array for empty object (types)', () => {
    expect(rover.getPropertiesWithTypes({})).toEqual([]);
  });

  // getPropertiesWithTypesAsync
  test('Should list all properties with types async', async () => {
    const data = await rover.getPropertiesWithTypesAsync(testObj);
    expect(data).toEqual([
      { path: 'firstName', type: 'string' },
      { path: 'lastName', type: 'boolean' },
      { path: 'arr', type: 'array' },
      { path: 'undef', type: 'undefined' },
      { path: 'id', type: 'number' },
      { path: 'big', type: 'bigint' },
      { path: 'sym', type: 'symbol' },
      { path: 'nu', type: 'null' },
      { path: 'fullName', type: 'function' },
      { path: 'blahblah.c', type: 'boolean' },
      { path: 'blahblah.a.b', type: 'string' }
    ]);
  });
  test('Should list all properties with types with a divider async', async () => {
    const data = await rover.getPropertiesWithTypesAsync(testObj, '*');
    expect(data).toEqual([
      { path: 'firstName', type: 'string' },
      { path: 'lastName', type: 'boolean' },
      { path: 'arr', type: 'array' },
      { path: 'undef', type: 'undefined' },
      { path: 'id', type: 'number' },
      { path: 'big', type: 'bigint' },
      { path: 'sym', type: 'symbol' },
      { path: 'nu', type: 'null' },
      { path: 'fullName', type: 'function' },
      { path: 'blahblah*c', type: 'boolean' },
      { path: 'blahblah*a*b', type: 'string' }
    ]);
  });
  test('Should throw instead of listing with types with faulty divider 1 async', done => {
    rover
      .getPropertiesWithTypesAsync(testObj, 0)
      .then()
      .catch(e => done());
  });
  test('Should throw instead of listing with types with faulty divider 2 async', done => {
    rover
      .getPropertiesWithTypesAsync(testObj, {})
      .then()
      .catch(e => done());
  });
  test('Should throw instead of listing with types with empty divider async', done => {
    rover
      .getPropertiesWithTypesAsync(testObj, '')
      .then()
      .catch(e => done());
  });
  test('Should throw with types with array async', done => {
    rover
      .getPropertiesWithTypesAsync(testArray)
      .then()
      .catch(e => done());
  });
  test('Should throw with types with non-object async', done => {
    rover
      .getPropertiesWithTypesAsync(43345)
      .then()
      .catch(e => done());
  });
  test('Should return empty array for empty object (types) async', async () => {
    expect(await rover.getPropertiesWithTypesAsync({})).toEqual([]);
  });
});

describe('Get', () => {
  test('Should get property from object correctly', () => {
    expect(rover.getProperty(testObj, 'blahblah*a*b', '*')).toEqual(testObj.blahblah.a.b);
    expect(rover.getProperty(testObj, 'blahblah.a.b')).toEqual(testObj.blahblah.a.b);
    expect(rover.getProperty(testObj, 'blahblah.a.b', '.')).toEqual(testObj.blahblah.a.b);
    expect(rover.getProperty(testObj, 'blahblah', '*')).toEqual(testObj.blahblah);
    expect(rover.getProperty(testObj, 'blahblah', '.')).toEqual(testObj.blahblah);
    expect(rover.getProperty(testObj, 'blahblah')).toEqual(testObj.blahblah);
    expect(rover.getProperty(testObj, 'big')).toEqual(testObj.big);
    expect(rover.getProperty(testObj, 'arr')).toEqual(testObj.arr);
    expect(rover.getProperty(testObj, 'nu')).toEqual(testObj.nu);
    expect(rover.getProperty(testObj, 'fullName')).toEqual(testObj.fullName);
    expect(rover.getProperty(testObj, '')).toEqual(testObj);
    expect(rover.getProperty({}, '')).toEqual({});
  });
  test('Should throw on invalid inputs', () => {
    expect(() => rover.getProperty(453, 'blahblah*a*b', '*')).toThrow();
    expect(() => rover.getProperty(453, 'blahblah.a.b')).toThrow();
    expect(() => rover.getProperty(testObj)).toThrow();
    expect(() => rover.getProperty(testObj, 'blahblah.a.b', '')).toThrow();
    expect(() => rover.getProperty(testObj, 2342)).toThrow();
  });
  test('Should return undefined for not found', () => {
    expect(rover.getProperty(testObj, 'dsgfdgdf')).toEqual(undefined);
    expect(rover.getProperty(testObj, 'blahblah.dsgfdgdf')).toEqual(undefined);
  });
});

describe('Set', () => {
  test('Should set property from object correctly', () => {
    expect(rover.setProperty({ ...testObj }, 'blahblah*a*b', 33, '*').blahblah.a.b).toEqual(33);
    expect(rover.setProperty({ ...testObj }, 'blahblah.a.b', 44).blahblah.a.b).toEqual(44);
    expect(rover.setProperty({ ...testObj }, 'blahblah.a.b', '.').blahblah.a.b).toEqual('.');
    expect(rover.setProperty({ ...testObj }, 'blahblah', 33, '*').blahblah).toEqual(33);
    expect(rover.setProperty({ ...testObj }, 'blahblah', {}).blahblah).toEqual({});
    expect(rover.setProperty({ ...testObj }, 'big', 'hello').big).toEqual('hello');

    console.log(
      rover.setProperty({ ...testObj }, 'arr', () => {
        console.log('a');
      }).arr
    );
    expect(rover.setProperty({ ...testObj }, 'fullName', { a: 5 }).fullName.a).toEqual(5);
  });
  test('Should throw on invalid inputs', () => {
    expect(() => rover.setProperty(453, 'blahblah*a*b', 33, '*')).toThrow();
    expect(() => rover.setProperty(453, 'blahblah.a.b', 44)).toThrow();
    expect(() => rover.setProperty({ ...testObj })).toThrow();
    expect(() => rover.setProperty({ ...testObj }, 'blahblah.a.b', 44, '')).toThrow();
    expect(() => rover.setProperty({ ...testObj }, 2342, 44)).toThrow();
    expect(() => rover.setProperty({ ...testObj }, '', { b: 6 })).toThrow();
    console.log(rover.setProperty({ ...testObj }, 'lastName.b', 6).lastName);
  });
  test('Should set nonexistent properties', () => {
    expect(rover.setProperty({ ...testObj }, 'dsgfdgdf', 5).dsgfdgdf).toEqual(5);
    expect(rover.setProperty({ ...testObj }, 'blahblah.dsgfdgdf', 5).blahblah.dsgfdgdf).toEqual(5);
    expect(rover.setProperty({ ...testObj }, 'aa.b.c.d', 5).aa.b.c.d).toEqual(5);
  });
});