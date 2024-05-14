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

[a:tags]
coffee
pc

hacking
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

[a:tags]
coffee
pc

hacking

[o:options]
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


[o:session]
work = 25
break = 10

[a:tags]
coding
open source

[a:benefits]
money
social
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
[o:session]
work = 25
break = 10

[a:tags]
coding
open source

[a:benefits]
money
social

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

[a:tags]
coding
open source
[o:session]
work = 25
break = 10
[a:benefits]
money
social
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

[a:tags]
coding
open source
[o:session]
work = 25
break = 10
[a:benefits]

money
social
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

[a:tags]
coding
open source
[o:session]
work = 25
break = 10
[a:benefits]
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
		benefits: []
	});

})

test("can parse #10", function() {
	const input = `

[a:tags]
coding
open source
[o:session]
[a:benefits]
[name]
this is my task name
`;

	const actual = parse(input);

	expect(actual).toEqual({
		name: "this is my task name",
		session: {},
		tags: [
			"coding",
			"open source"
		],
		benefits: []
	});

})

test("can parse #11", function() {
	const input = `

[a:tags]
[o:session]
[a:benefits]
[name]
this is my task name
`;

	const actual = parse(input);

	expect(actual).toEqual({
		name: "this is my task name",
		session: {},
		tags: [],
		benefits: []
	});

});

test("can parse #12", function() {
	const input = `
[a:tags]
[o:session]
[a:benefits]
[name]
`;

	const actual = parse(input);

	expect(actual).toEqual({
		name: "",
		session: {},
		tags: [],
		benefits: []
	});

})
