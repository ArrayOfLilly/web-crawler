const { argv } = require("node:process");
const { crawlPage } = require("./crawl.js");

async function main(argv) {
	const usage = "Usage: node main.js [baseURL] ";
	if (argv.length < 3) {
		console.log(`Error: no website provided.\n${usage}`);
		return;
	} else if (argv.length < 3) {
		console.log(`Error: too many parameter.\n${usage}`);
		return;
	}

	const baseURL = argv[2];
	// sample: "https://wagslane.dev";

	console.log(`\nCrawling ${baseURL} has started...`);
	pages = await crawlPage(baseURL, baseURL, {});

	console.log(`\nResult:`);
	console.log(pages);
}

main(argv);
