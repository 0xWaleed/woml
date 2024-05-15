import { generate } from "../src/woml.ts";
import { expect, test } from "bun:test";


test("can generate #1", function() {

	const actual = generate({
		desc: {
			type: "string",
			value: "this is my value"
		},
		tags: "array",
		config: "object"
	});

	expect(actual).toEqual(`\
[desc]
this is my value

[tags]

[config]`);

});


test("can generate #2", function() {

	const actual = generate({
		desc: {
			type: "string",
			value: "this is my value"
		},
		tags: {
			type: "array",
			value: ["a", "b", "c"]
		},
		config: "object"
	});

	expect(actual).toEqual(`\
[desc]
this is my value

[tags]
- a
- b
- c

[config]`);

});

test("can generate #3", function() {

	const actual = generate({
		desc: {
			type: "string",
			value: "this is my value"
		},
		tags: {
			type: "array",
			value: ["a", "b", "c"]
		},
		config: {
			type: "object",
			value: {
				name: "0xWal",
				city: "Meca"
			}
		}
	});

	expect(actual).toEqual(`\
[desc]
this is my value

[tags]
- a
- b
- c

[config]
name = 0xWal
city = Meca`);

});

test("can generate #4", function() {

	const actual = generate({
		desc: {
			type: "string",
			value: "this is my value"
		},
		tags: {
			type: "array",
			value: ["a", "b", "c"]
		},
		config: {
			type: "object",
			value: {}
		}
	});

	expect(actual).toEqual(`\
[desc]
this is my value

[tags]
- a
- b
- c

[config]`);

});

test("can generate #5", function() {

	const actual = generate({
		desc: {
			type: "string",
			value: ""
		},
		tags: {
			type: "array",
			value: []
		},
		config: {
			type: "object"
		}
	});

	expect(actual).toEqual(`\
[desc]

[tags]

[config]`);

});


test("can generate #6", function() {

	const actual = generate({
		"$": "this is a root string",
		desc: {
			type: "string",
			value: ""
		},
		tags: {
			type: "array",
			value: []
		},
		config: {
			type: "object"
		}
	});

	expect(actual).toEqual(`\
this is a root string

[desc]

[tags]

[config]`);

});
