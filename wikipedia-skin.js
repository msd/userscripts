// ==UserScript==
// @name        [wikipedia.org] Use Old Wikipedia Layout / Skin / Theme (Vector)
// @namespace   com.github.msd
// @match       https://*.wikipedia.org/wiki/*
// @exclude     https://*.wikipedia.org/wiki/File:*
// @grant       none
// @version     1.0
// @author      msd
// @description Redirect new wikipedia urls (that do not use vector skin) to old wikipedia urls (ones that explicitly have vector skin in their query)
// ==/UserScript==

const SKIN_VALUE = "vector"
const SKIN_KEY = "useskin"

$$ = (selector) => document.querySelectorAll(selector);

let params = new URLSearchParams(window.location.search);

if (params.get(SKIN_KEY) !== SKIN_VALUE)
{
    params.set(SKIN_KEY, SKIN_VALUE);
    window.location.search = params.toString();
}

else
{
    let base = window.location.toString();
    for (let tag of $$("a[href]"))
    {
        let u = new URL(tag.getAttribute("href"), base);
        if (u.hostname.match(/.*\.wikipedia\.org/) !== null
            && u.searchParams.get(SKIN_KEY) !== SKIN_VALUE)
        {
            u.searchParams.set(SKIN_KEY, SKIN_VALUE);
            tag.setAttribute("href", u.toString());
        }
    }
}
