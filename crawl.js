const url = require('node:url')

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostname = urlObj.hostname.startsWith('www.') ? urlObj.hostname.slice(4) : urlObj.hostname
    const pathname = urlObj.pathname.endsWith('/') ? urlObj.pathname.slice(0, -1) : urlObj.pathname
    const normalizedURL = `${hostname}${pathname}`
    return normalizedURL
}

function getURLsFromHTML(htmlString) {
    
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
  }