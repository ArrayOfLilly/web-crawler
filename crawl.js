const jsdom = require("jsdom");
const { JSDOM } = jsdom;

/**
 * Normalizes a given URL by converting it to lowercase domain + pathname and removing any trailing slash from the pathname.
 *
 * @param {string} url - The URL to be normalized.
 * @return {string} The normalized URL.
 */
function normalizeURL(url) {
	const urlObj = new URL(url);
	// the conversion to URL object automatically convert to lowercase the URL
	let fullPath = `${urlObj.host}${urlObj.pathname}`;
	// if fullPath is relative path
	if (fullPath.length > 0 && fullPath.slice(-1) === "/") {
		fullPath = fullPath.slice(0, -1);
	}
	return fullPath;
}

/**
 * Extracts URLs from an HTML body using a regular expression and returns them as an array.
 *
 * @param {string} htmlBody - The HTML body from which to extract URLs.
 * @param {string} baseURL - The base URL to prepend to relative URLs.
 * @return {Array<string>} An array of URLs extracted from the HTML body.
 */
function getURLsFromHTML(htmlBody, baseURL) {
	dom = new JSDOM(htmlBody);
	const anchorList = dom.window.document.querySelectorAll("a"); // NodeList from <a> tags
	const urlList = [];

	for (let i = 0; i < anchorList.length; i++) {
		const anchor = anchorList[i].getAttribute("href");

		const re = new RegExp("^https?://|^/");
		if (!re.test(anchor)) {
			continue;
		}

		if (anchor.length > 0 && anchor.startsWith("/")) {
			urlList.push(`${baseURL}${anchor}`);
		} else if (anchor.length > 0) {
			urlList.push(anchor);
		}
	}
	return urlList;
}

async function crawlPage(baseURL, currentURL, pages) {
	// console.log(`current URL is ${currentURL}`);

	const baseURLObj = new URL(baseURL);
	const currentURLObj = new URL(currentURL);

	// external link, don't count, don't follow
	if (!(baseURLObj.hostname === currentURLObj.hostname)) {
		return pages;
	}

	const normalisedCurrentURL = normalizeURL(currentURL);

	// repeating link, count, but not follow
	if (pages[normalisedCurrentURL]) {
		pages[normalisedCurrentURL]++;
		return pages;
		// internal link, first time, count, follow
	} else {
		pages[normalisedCurrentURL] = 1;

		console.log(`Crawling ${currentURL} page has started...`);

		const options = {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "text/html",
			},
		};

		try {
			const response = await fetch(currentURL, options);

			if (response.status >= 400) {
				console.log(`HTTP error: ${response.status}, ${response.statusText}`);
				return pages;
			}
			if (
				!response.headers.get("Content-Type").startsWith("text/html") &&
				!response.headers.get("Content-Type").startsWith("text/HTML")
			) {
				console.log(`Error: invalid content type: ${response.headers.get("Content-Type")}`);
				return pages;
			}

			const htmlBody = await response.text();
			const urls = getURLsFromHTML(htmlBody, baseURL);
			// console.log(urls);

			for (let i = 0; i < urls.length; i++) {
				// console.log(urls[i]);
				try {
					pages = await crawlPage(baseURL, urls[i], pages);
				} catch (err) {
					raise(err);
					return pages;
				}
			}
			return pages;
		} catch (err) {
			console.log(`Error: invalid URL: ${currentURL}`);
			return pages;
		}
		return pages;
	}
}

module.exports = {
	normalizeURL,
	getURLsFromHTML,
	crawlPage,
};
