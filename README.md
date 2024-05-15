# WOML

Simple format for configuration


## Example

### Parsing
```ts
import { parse } from "./src/woml";

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
```
```ts
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
```

## Generate structure
```ts
const output = generate({
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
/*
[name]
this is my value

[a:tags]
coffee
programming

[o:config]
theme = dark
color = gruvbox
*/

```
