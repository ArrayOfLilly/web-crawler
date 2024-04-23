function printReport(pages) {
	console.log(`\n\n---------`);
	console.log(` Report:`);
	console.log(`---------\n`);

	let entries = Object.entries(pages);
	let reversedPages = entries.sort((a, b) => b[1] - a[1]);

	for (const page of reversedPages) {
		console.log(`Found ${page[1]} internal links to ${page[0]}`);
	}
}

module.exports = {
	printReport,
};
