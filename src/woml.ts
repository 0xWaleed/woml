import type { Header, Woml, HeaderStructure, HeaderType } from "../woml.d.ts";

function extractCurrentBody(input: string): string {
	let index = input.indexOf("[");
	if (index === -1) {
		return input;
	}
	const body = input.substring(0, index)
	return body;
}

function parseHeader(input: string): [Header, string] {
	const header: string[] = [];

	let type: HeaderType = "string";

	const chars = input.split("");

	let i = 0;

	for (const c of chars) {
		i++;
		if (c === "[") {
			continue;
		}

		if (c === "]") {
			break;
		}


		header.push(c);
	}

	const after = input.substring(i);
	const lines = after.split("\n");

	for (const line of lines) {
		if (!line) {
			continue;
		}
		if (line.startsWith("-")) {
			type = "array";
			break;
		}

		if (line.includes("=")) {
			type = "object";
			break;
		}

		break;
	}


	const h = header.join("");
	return [{ type, value: h }, after];
}

function parseBody(input: string): [string, string] {
	const output = [];

	let i = 0;

	while (i < input.length) {
		const c = input[i++];

		if (c === "[") {
			break;
		}

		output.push(c);
	}


	return [output.join("").trim(), input.substring(i)];
}

function parseBodyAsArray(input: string): [string[], string] {
	const output: string[] = [];


	const body = extractCurrentBody(input);

	const lines = body.split("\n");

	for (const line of lines) {
		if (!line) {
			continue;
		}
		output.push(line.replace(/^\-\s*/, ""));
	}

	return [output, input.substring(body.length)];
}

function parseBodyAsObject(input: string): [Dict<string>, string] {
	const o: Dict<string> = {};


	const body = extractCurrentBody(input);

	const lines = body.split("\n");

	for (const line of lines) {
		if (!line) {
			continue;
		}


		const [k, v] = line.trim().split("=");

		o[k.trim()] = v.trim();
	}

	return [o, input.substring(body.length)];
}

function parseEntry(input: string): Woml {
	const o: Dict<any> = {};

	let rest = input.trim();
	let i = 0;

	if (!input.startsWith("[")) {
		const [value, r] = parseBody(input);
		o["$"] = value;
		rest = r;
	}

	do {
		const [{ type, value }, restAfterHeader] = parseHeader(rest.trim());

		if (!value) {
			continue;
		}

		let body;
		switch (type) {
			case "array": {
				const [b, r] = parseBodyAsArray(restAfterHeader);
				body = b;
				rest = r.trim();

				if (!b) {
					body = undefined;
				}

				break
			}
			case "object": {
				const [b, r] = parseBodyAsObject(restAfterHeader);
				body = b;
				rest = r.trim();
				break

			}
			default: {
				const [b, r] = parseBody(restAfterHeader);
				if (!b) {
					body = undefined;
				} else {
					body = b;
				}

				rest = r.trim();
				break;
			}
		}

		o[value] = body;

	} while (i++ < input.length)


	return o;
}

export function parse(input: string): Woml {
	return parseEntry(input.trim());
}

export function generate(structure: HeaderStructure): string {
	const out: string[] = [];


	for (const [key, props] of Object.entries(structure)) {
		if (key === "$") {
			out.push(props);
			out.push("\n\n");
			continue;
		}


		let value, type
		if (typeof props === "object") {
			value = props.value;
			type = props.type;
		} else {
			type = props
		}

		if (type === "string") {
			out.push(`[${key}]`);
			if (value) {
				out.push("\n");
				out.push(value as string);
			}
		}

		if (type === "array") {
			out.push(`[${key}]`);

			if (Array.isArray(value) && value.length > 0) {
				out.push("\n");
				out.push(value.map(i => `- ${i}`).join("\n"));
			}
		}

		if (type === "object") {
			out.push(`[${key}]`);

			if (typeof value === "object") {
				out.push("\n");
				for (const k in value) {
					const v = (value as Dict<string>)[k];
					out.push(`${k} = ${v}`);
					out.push("\n");
				}
			}
		}


		out.push("\n\n");
	}

	return out.join("").trim();
}
