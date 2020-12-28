declare type PrimitiveType =
  | string
  | boolean
  | array
  | undefined
  | number
  | bigint
  | symbol
  | null
  | function;
export declare function getProperties(obj: object, divider?: string): string[];
export declare function getPropertiesAsync(obj: object, divider?: string): Promise<string[]>;
export declare function getPropertiesWithTypes(
  obj: object,
  divider?: string
): { path: string; type: PrimitiveType }[];
export declare function getPropertiesWithTypesAsync(
  obj: object,
  divider?: string
): Promise<{ path: string; type: PrimitiveType }[]>;
export declare function setProperty(
  obj: object,
  selector: string,
  value: any,
  divider?: string
): object;
export declare function getProperty(
  obj: object,
  selector: string,
  divider?: string
): PrimitiveType | object;
export {};
