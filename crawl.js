const url = require('node:url')
const { JSDOM } = require('jsdom')

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostname = urlObj.hostname.startsWith('www.') ? urlObj.hostname.slice(4) : urlObj.hostname
    const pathname = urlObj.pathname.endsWith('/') ? urlObj.pathname.slice(0, -1) : urlObj.pathname
    const normalizedURL = `${hostname}${pathname}`
    return normalizedURL
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody)
    const paths = dom.window.document.querySelectorAll('a')
    const urls = []
    for (const path of paths) {
        if (path.href.indexOf('/') === 0) {
            try {
                const urlObj = new URL(path.href, baseURL).href
                urls.push(urlObj)
            } catch (err) {
                console.log(`${err.message}: ${path.href}`)
            }
        } else if (path.href.indexOf('./') === 0) {
                try {
                    urls.push(new URL(path.href.slice(1), baseURL).href)
                } catch (err) {
                    console.log(`${err.message}: ${path.href}`)
                }
        } else if (path.href.indexOf('mailto:') === 0 || path.href.indexOf('tel:') === 0) {
            continue
        } else {
            try {
                urls.push(new URL(path.href).href)
            } catch (err){
                console.log(`${err.message}: ${path.href}`)
            }
        }
    }
    return urls
}


module.exports = {
    normalizeURL,
    getURLsFromHTML
  }