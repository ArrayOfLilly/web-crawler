const { test, expect } = require('@jest/globals')
const { normalizeURL,
        getURLsFromHTML } = require('./crawl.js')


test('Normalize URL: https://blog.boot.dev/path', () => {
  expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});

test('Normalize URL: http://blog.boot.dev/path/', () => {
  expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('Normalize URL: https://www.blog.boot.dev/path/', () => {
  expect(normalizeURL('https://www.blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('Normalize URL: http://www.blog.boot.dev/path/?user=name', () => {
  expect(normalizeURL('http://www.blog.boot.dev/path/?user=name')).toBe('blog.boot.dev/path');
});

test('Normalize URL: https://blog.boot.dev/path/?user=name#id', () => {
  expect(normalizeURL('https://blog.boot.dev/path/?user=name#id')).toBe('blog.boot.dev/path');
});

test('Normalize URL: https://blog.boot.dev:80/path/?user=name#id', () => {
  expect(normalizeURL('https://blog.boot.dev:80/path/?user=name#id')).toBe('blog.boot.dev/path');
});

test('Normalize URL: https://admin:admin@blog.boot.dev:80/path/?user=name#id', () => {
  expect(normalizeURL('https://admin:admin@blog.boot.dev:80/path/?user=name#id')).toBe('blog.boot.dev/path');
});
