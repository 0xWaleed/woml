# WOML

Simple format for configuration


## Example

### Parsing
```ts
import { parse } from "./src/woml";

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
```
```ts
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
/*
this is a root value that has no header

[meta]

[name]
this is my value

[tags]
- coffee
- programming

[config]
theme = dark
color = gruvbox
*/

```
