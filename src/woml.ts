declare type Header = { type: string, value: string };
declare type Dict<T> = { [key: string]: T };

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


	const body = extractCurrentBody(input);

	const lines = body.split("\n");

	for (const line of lines) {
		if (!line) {
			continue;
		}
		output.push(line);
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

function parseEntry(input: string): Dict<string | Dict<string> | string[]> {
	const o: { [key: string]: any } = {};

	let rest = input;
	let i = 0;

	do {
		const [{ type, value }, restAfterHeader] = parseHeader(rest.trim());

		if (!value) {
			continue;
		}

		let body;
		switch (type) {
			case "a": {
				const [b, r] = parseBodyAsArray(restAfterHeader);
				body = b;
				rest = r.trim();

				break
			}
			case "o": {
				const [b, r] = parseBodyAsObject(restAfterHeader);
				body = b;
				rest = r.trim();
				break

			}
			default: {
				const [b, r] = parseBody(restAfterHeader);
				body = b;
				rest = r.trim();
				break;
			}
		}

		o[value] = body;

	} while (i++ < input.length)


	return o;
}

export function parse(input: string): Dict<string | Dict<string> | string[]> {
	return parseEntry(input.trim());
}
