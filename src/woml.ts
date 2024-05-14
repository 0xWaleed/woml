declare type Header = { type: string, value: string };
declare type Dict<T> = { [key: string]: T }

function parseHeader(input: string): [Header, string] {
	const header: string[] = [];

	let i = 0;

	let type = "";

	while (i < input.length) {
		const c = input[i++];

		if (c === "[") {
			continue;
		}

		if (c === ":") {
			type = header.join("");
			header.forEach(() => header.pop());
			continue;
		}


		if (c === "]") {
			break;
		}

		header.push(c);
	}

	return [{ type, value: header.join("") }, input.substring(i)];
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


	let chunk = input;
	let index;
	if ((index = input.indexOf("[")) !== -1) {
		chunk = input.substring(0, index)
	}

	const bodyAsPlainText = chunk;

	const lines = bodyAsPlainText.split("\n");

	for (const line of lines) {
		if (!line) {
			continue;
		}
		output.push(line);
	}

	return [output, input.substring(chunk.length)];
}

function parseBodyAsObject(input: string): [Dict<string>, string] {
	const o: { [key: string]: string } = {};

	let chunk = input;
	let index;
	if ((index = input.indexOf("[")) !== -1) {
		chunk = input.substring(0, index)
	}

	const bodyAsPlainText = chunk;



	const lines = bodyAsPlainText.split("\n");

	for (const line of lines) {
		if (!line) {
			continue;
		}


		const [k, v] = line.trim().split("=");

		o[k.trim()] = v.trim();
	}

	return [o, input.substring(chunk.length)];
}

function parseEntry(input: string): Dict<string | Dict<string> | string[]> {
	const o: { [key: string]: any } = {};

	let rest = input;
	let i = 0;

	do {
		const [{ type, value }, restAfterHeader] = parseHeader(rest);

		let body;
		if (type === "a") {
			const [b, r] = parseBodyAsArray(restAfterHeader);
			body = b;
			rest = r;
		} else if (type === "o") {
			const [b, r] = parseBodyAsObject(restAfterHeader);
			body = b;
			rest = r;
		}
		else {
			const [b, r] = parseBody(restAfterHeader);
			body = b;
			rest = r;
		}

		i++;

		if (!value) {
			continue;
		}

		o[value] = body;
	} while (i < input.length)


	return o;
}

export function parse(input: string): object {
	return parseEntry(input.trim());
}
