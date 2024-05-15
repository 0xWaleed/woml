import {$} from "bun";

await $`rm -rf dist`;

await Bun.build({
	entrypoints: ['./src/woml.ts'],
	outdir: './dist',
	minify: true,
	plugins: []
});

await $`cp ./woml.d.ts ./dist/`;
