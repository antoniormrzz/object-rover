declare type PrimitiveType =
  | 'string'
  | 'boolean'
  | 'array'
  | 'undefined'
  | 'number'
  | 'bigint'
  | 'symbol'
  | 'null'
  | 'function';
export declare function getProperties(obj: Object, divider?: string): string[];
export declare function getPropertiesAsync(obj: Object, divider?: string): Promise<string[]>;
export declare function getPropertiesWithTypes(
  obj: Object,
  divider?: string
): { path: string; type: PrimitiveType }[];
export declare function getPropertiesWithTypesAsync(
  obj: Object,
  divider?: string
): Promise<{ path: string; type: PrimitiveType }[]>;
export declare function setProperty(obj: Object, selector: string, value: any, divider?: string): Object;
export declare function getProperty(obj: Object, selector: string, divider?: string): PrimitiveType | 'object';
export {};