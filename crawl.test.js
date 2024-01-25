const { test, expect } = require('@jest/globals')
const { normalizeURL,
        getURLsFromHTML } = require('./crawl.js')

//normalizeURL tests
test('Normalize URL - protocol', () => {
  const input = 'https://blog.boot.dev/something'
  const received = normalizeURL(input)
  const expected = 'blog.boot.dev/something'
  expect(received).toBe(expected);
});

test('Normalize URL - trailing "/"', () => {
  const input = 'https://blog.boot.dev/something/'
  const received = normalizeURL(input)
  const expected = 'blog.boot.dev/something'
  expect(received).toBe(expected);

});

test('Normalize URL - excluded fragments: username, password, port, search, hash', () => {
  const input = 'https://admin:admin@blog.boot.dev:80/something/?user=name#id'
  const received = normalizeURL(input)
  const expected = 'blog.boot.dev/something'
  expect(received).toBe(expected);
});


//getURLsFromHTML test
test('getURLsFromHTML - relative"', () => {
  const inputHTML = '<html><head></head><body><a href="/something">Link</a></body></html>'
  const inputBaseURL = 'http://blog.boot.dev'
  const received = getURLsFromHTML(inputHTML, inputBaseURL)
  const expected = ['http://blog.boot.dev/something']
  expect(received).toEqual(expected);
});

test('getURLsFromHTML - more than one, another kind relative', () => {
  const inputHTML = '<html><head></head><body><a href="/something">Link</a><a href="./another_something">Another Link</a></body></html>'
  const inputBaseURL = 'http://blog.boot.dev'
  const received = getURLsFromHTML(inputHTML, inputBaseURL)
  const expected = ['http://blog.boot.dev/something', 'http://blog.boot.dev/another_something']
  expect(received).toEqual(expected);
});

test('getURLsFromHTML - more than one, absolute, external', () => {
  const inputHTML = '<html><head></head><body><a href="http://example.com/something"/>Link</a><a href="https://blog.boot.dev/something2">Link2</a><a href="/something3">Link3</a></body></html>'
  const inputBaseURL = 'http://blog.boot.dev'
  const received = getURLsFromHTML(inputHTML, inputBaseURL)
  const expected = ['http://example.com/something', 'https://blog.boot.dev/something2', 'http://blog.boot.dev/something3']
  expect(received).toEqual(expected);
});

test('getURLsFromHTML - mailto:', () => {
  const inputHTML = '<html><head></head><body><a href="mailto:abc@gmail.com">Link</a></body></html>'
  const inputBaseURL = 'http://gmail.com'
  const received = getURLsFromHTML(inputHTML, inputBaseURL)
  const expected = []
  expect(received).toEqual(expected);
});

test('getURLsFromHTML - relative, in parent directory tree', () => {
  const inputHTML = '<html><head></head><body><a href="../something">Link</a></body></html>'
  const inputBaseURL = 'http://example.com'
  const received = getURLsFromHTML(inputHTML, inputBaseURL)
  const expected = []
  expect(received).toEqual(expected);
});