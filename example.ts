import { generate, parse } from "./src/woml";

{
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

	const o = parse(input) as any;
	console.log(o.benefits); // ["money", "social"]
	console.log(o.session["work"]); // "25"
};

{
	const input = `
[desc]
Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
when an unknown printer took a galley of type and scrambled it to make a type specimen book.
It has survived not only five centuries, but also the leap into electronic typesetting,
remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
Aldus PageMaker including versions of Lorem Ipsum.

[tags]

- coffee
- pc

hacking

[options]
interval=2
theme=dark
color=red
update=true

`;
	const o = parse(input) as any;
	console.log(o.tags); // ["pc", "coffee", "hacking"]
	console.log(o.tags?.[0]);
	console.log(o.options["theme"]); // "dark"
	console.log(o);
}

{
	const input = `
Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
when an unknown printer took a galley of type and scrambled it to make a type specimen book.
It has survived not only five centuries, but also the leap into electronic typesetting,
remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
Aldus PageMaker including versions of Lorem Ipsum.
`;
	const o = parse(input) as any;
	console.log(o);
}

{
	const output = generate({
		"$": "this is a root value that has no header",
		meta: "object",
		name: {
			type: "string",
			value: "this is my value"
		},
		tags: {
			type: "array",
			value: [
				"coffee",
				"programming"
			]
		},
		config: {
			type: "object",
			value: {
				theme: "dark",
				color: "gruvbox"
			}
		}
	});

	console.log(output);
}
