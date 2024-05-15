declare type Header = { type: string, value: string };
declare type Dict<T> = { [key: string]: T };

declare type HeaderTypes = "string" | "object" | "array";
declare type PossibleValue = string[] | Dict<string> | string | undefined;
declare type Woml = Dict<PossibleValue>;
declare type HeaderStructure = {
	[key: string]: HeaderTypes | { type: string, value?: PossibleValue }
} | { "$": string };

export function parse(input: string): Dict<PossibleValue>;
export function generate(structure: HeaderStrucutre): string;
