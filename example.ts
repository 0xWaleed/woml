import { parse } from "./src/woml";

{
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

	const o = parse(input) as any;
	console.log(o.benefits); // ["money", "social"]
	console.log(o.session["work"]); // "25"
};

{
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
theme=dark
color=red
update=true

`;
	const o = parse(input) as any;
	console.log(o.tags); // ["pc", "coffee", "hacking"]
	console.log(o.options["theme"]); // "dark"
}
