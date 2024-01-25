const { test, expect } = require('@jest/globals')
const { normalizeURL,
        getURLsFromHTML } = require('./crawl.js')

//normalizeURL tests
test('Normalize URL: https://blog.boot.dev/something', () => {
  expect(normalizeURL('https://blog.boot.dev/something')).toBe('blog.boot.dev/something');
});

test('Normalize URL: http://blog.boot.dev/something/', () => {
  expect(normalizeURL('http://blog.boot.dev/something/')).toBe('blog.boot.dev/something');
});

test('Normalize URL: https://www.blog.boot.dev/something/', () => {
  expect(normalizeURL('https://www.blog.boot.dev/something/')).toBe('blog.boot.dev/something');
});

test('Normalize URL: http://www.blog.boot.dev/something/?user=name', () => {
  expect(normalizeURL('http://www.blog.boot.dev/something/?user=name')).toBe('blog.boot.dev/something');
});

test('Normalize URL: https://blog.boot.dev/something/?user=name#id', () => {
  expect(normalizeURL('https://blog.boot.dev/something/?user=name#id')).toBe('blog.boot.dev/something');
});

test('Normalize URL: https://blog.boot.dev:80/something/?user=name#id', () => {
  expect(normalizeURL('https://blog.boot.dev:80/something/?user=name#id')).toBe('blog.boot.dev/something');
});

test('Normalize URL: https://admin:admin@blog.boot.dev:80/something/?user=name#id', () => {
  expect(normalizeURL('https://admin:admin@blog.boot.dev:80/something/?user=name#id')).toBe('blog.boot.dev/something');
});


//getURLsFromHTML test
test('getURLsFromHTML: htmlBody="<html><head></head><body><a href="/something">Link</a></body></html>", baseURL="http://blog.boot.dev"', () => {
  expect(getURLsFromHTML('<html><head></head><body><a href="/something">Link</a></body></html>', 'http://blog.boot.dev')).toEqual(['http://blog.boot.dev/something']);
});

test('getURLsFromHTML: htmlBody="<html><head></head><body><a href="/something">Link</a><a href="./another_something">Another Link</a></body></html>", baseURL="http://blog.boot.dev"', () => {
  expect(getURLsFromHTML('<html><head></head><body><a href="/something">Link</a><a href="./another_something">Another Link</a></body></html>', 'http://blog.boot.dev')).toEqual(['http://blog.boot.dev/something', 'http://blog.boot.dev/another_something']);
});

test('getURLsFromHTML: htmlBody="<html><head></head><body><a href="http://example.com/something/">Link</a><a href="https://blog.boot.dev/something2">Link2</a><a href="/something3">Link3</a></body></html>", baseURL="http://blog.boot.dev"', () => {
  expect(getURLsFromHTML('<html><head></head><body><a href="http://example.com/something"/>Link</a><a href="https://blog.boot.dev/something2">Link2</a><a href="/something3">Link3</a></body></html>', 'http://blog.boot.dev')).toEqual(['http://example.com/something', 'https://blog.boot.dev/something2', 'http://blog.boot.dev/something3']);
});

test('getURLsFromHTML: htmlBody="<html><head></head><body><a href="mailto:abc@gmail.com">Link</a></body></html>", baseURL="http://gmail.com"', () => {
  expect(getURLsFromHTML('<html><head></head><body><a href="mailto:abc@gmail.com">Link</a></body></html>', 'http://gmail.com')).toEqual([]);
});

test('getURLsFromHTML: htmlBody="<html><head></head><body><a href="../something">Link</a></body></html>", baseURL="http://example.com"', () => {
  expect(getURLsFromHTML('<html><head></head><body><a href="../something">Link</a></body></html>', 'http://example.com')).toEqual([]);
});