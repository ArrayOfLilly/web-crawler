const { test, expect } = require("@jest/globals");
const { normalizeURL } = require("./crawl.js");

const url = "";
const url1 = "https://blog.boot.dev/path/";
const url2 = "http://blog.boot.dev/path/";
const url3 = "http://blog.boot.dev/path";
const url4 = "http://www.blog.dev/path/";
const url5 = "http://www.Blog.Dev/Path";
const url6 = "./logs/";
const url7 = "#";
const expectedURL = "boot.dev/path";

test(`normalize empty url ${url} to ${expectedURL}`, () => {
	expect(normalizeURL(url)).toBe("");
});

test(`normalize url ${url1} to ${expectedURL}`, () => {
	expect(normalizeURL(url1)).toBe(expectedURL);
});

test(`normalize url ${url2} to ${expectedURL}`, () => {
	expect(normalizeURL(url2)).toBe(expectedURL);
});

test(`normalize url ${url3} to ${expectedURL}`, () => {
	expect(normalizeURL(url3)).toBe(expectedURL);
});

test(`normalize url ${url4} to ${expectedURL}`, () => {
	expect(normalizeURL(url4)).toBe(expectedURL);
});

test(`normalize url ${url5} to ${expectedURL}`, () => {
	expect(normalizeURL(url5)).toBe(expectedURL);
});

test(`normalize url ${url6} to ${expectedURL}`, () => {
	expect(normalizeURL(url6)).toBe(".logs");
});

test(`normalize url ${url7} to ${expectedURL}`, () => {
	expect(() => normalizeURL()).toThrow("Error: invalid URL");
});
