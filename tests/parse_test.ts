import { parse } from "../src/woml.ts";
import { expect, test } from "bun:test";

test("can parse #1", function() {

	const input = `
[desc]
this is a description
	`;

	const actual = parse(input);

	expect(actual).toEqual({
		desc: "this is a description"
	});
});

test("can parse #2", function() {

	const input = `
[desc]
this is a description
and newline

	`;

	const actual = parse(input);

	expect(actual).toEqual({
		desc: "this is a description\nand newline"
	});
});

test("can parse #3", function() {

	const input = `
[desc]
this is a description
and newline

[tags]
- coffee
- pc

- hacking
`;

	const actual = parse(input);

	expect(actual).toEqual({
		desc: "this is a description\nand newline",
		tags: [
			"coffee",
			"pc",
			"hacking"
		]
	});
});

test("can parse #4", function() {

	const input = `
[desc]
this is a description
and newline

[tags]
- coffee
- pc

- hacking

[options]
interval=2
theme= dark
color = red
update =true
`;

	const actual = parse(input);

	expect(actual).toEqual({
		desc: "this is a description\nand newline",
		tags: [
			"coffee",
			"pc",
			"hacking"
		],
		options: {
			interval: "2",
			theme: "dark",
			color: "red",
			update: "true"
		}
	});
});

test("can parse #5", function() {
	const input = `
[name]
this is my task name


[session]
work = 25
break = 10

[tags]
- coding
- open source

[benefits]
- money
- social
`;

	const actual = parse(input);

	expect(actual).toEqual({
		name: "this is my task name",
		session: {
			work: "25",
			break: "10"
		},
		tags: [
			"coding",
			"open source"
		],
		benefits: [
			"money",
			"social"
		]
	});

})

test("can parse #6", function() {
	const input = `
[session]
work = 25
break = 10

[tags]
- coding
- open source

[benefits]
- money
- social

[name]
this is my task name
`;

	const actual = parse(input);

	expect(actual).toEqual({
		name: "this is my task name",
		session: {
			work: "25",
			break: "10"
		},
		tags: [
			"coding",
			"open source"
		],
		benefits: [
			"money",
			"social"
		]
	});

})


test("can parse #7", function() {
	const input = `

[tags]
- coding
- open source
[session]
work = 25
break = 10
[benefits]
- money
- social
[name]
this is my task name
`;

	const actual = parse(input);

	expect(actual).toEqual({
		name: "this is my task name",
		session: {
			work: "25",
			break: "10"
		},
		tags: [
			"coding",
			"open source"
		],
		benefits: [
			"money",
			"social"
		]
	});

})

test("can parse #8", function() {
	const input = `

[tags]
- coding
- open source
[session]
work = 25
break = 10
[benefits]

- money
- social
[name]
this is my task name
`;

	const actual = parse(input);

	expect(actual).toEqual({
		name: "this is my task name",
		session: {
			work: "25",
			break: "10"
		},
		tags: [
			"coding",
			"open source"
		],
		benefits: [
			"money",
			"social"
		]
	});

})

test("can parse #9", function() {
	const input = `

[tags]
- coding
- open source
[session]
work = 25
break = 10
[benefits]
[name]
this is my task name
`;

	const actual = parse(input);

	expect(actual).toEqual({
		name: "this is my task name",
		session: {
			work: "25",
			break: "10"
		},
		tags: [
			"coding",
			"open source"
		],
		benefits: undefined
	});

})

test("can parse #10", function() {
	const input = `

[tags]
- coding
- open source
[session]
[benefits]
[name]
this is my task name
`;

	const actual = parse(input);

	expect(actual).toEqual({
		name: "this is my task name",
		session: undefined,
		tags: [
			"coding",
			"open source"
		],
		benefits: undefined
	});

})

test("can parse #11", function() {
	const input = `

[tags]
[session]
[benefits]
[name]
this is my task name
`;

	const actual = parse(input);

	expect(actual).toEqual({
		name: "this is my task name",
		session: undefined,
		tags: undefined,
		benefits: undefined
	});

});

test("can parse #12", function() {
	const input = `
[tags]
[session]
[benefits]
[name]
`;

	const actual = parse(input);

	expect(actual).toEqual({
		name: undefined,
		session: undefined,
		tags: undefined,
		benefits: undefined
	});

});

test("parse input that has no header", function() {
	const input = `
this is a text that has no header
`;

	const actual = parse(input);

	expect(actual).toEqual({
		"$": input.trim()
	});

});


test("can parse #13 with array that has spaces", function() {
	const input = `
[benefits]
-                a
-b
`;

	const actual = parse(input);

	expect(actual).toEqual({
		benefits: [
			"a",
			"b"
		]
	});

});
