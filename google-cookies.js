// ==UserScript==
// @name        Reject Google Cookies
// @namespace   msd.github
// @match       https://consent.google.com/m
// @grant       none
// @version     1.0
// @author      msd
// @description Reject cookies by google
// ==/UserScript==

function xpathArray(xpath, root)
{
    if (root === undefined)
    {
        root = document;
    }
    let result = document.evaluate(xpath, root);
    let a = [];
    let e;
    while ((e = result.iterateNext()) !== null)
    {
        a.push(e);
        e = result.iterateNext();
    }
    return a;
}

function compStyle(element, key)
{
    return window.getComputedStyle(element)[key]
}

function hasInvisibility(element)
{
    element.hasAttribute("hidden") || compStyle(element, "display") === "none" || compStyle(element, "visibility") === "hidden";
}

function isVisible(element)
{
    if (hasInvisibility(element))
    {
        return false;
    }

    if (element.parentElement === null)
    {
        return true;
    }

    let b = isVisible(element.parentElement);
    // console.log(element.tagName + "." + element.className);
    return b;
}

function main()
{
    const xpath = '/html/body//form//button//span[text()="Reject all"]'
    let buttons = xpathArray(xpath).filter(isVisible);
    if (buttons.length == 0)
    {
        alert("could not find reject button");
        return;
    }
    buttons.forEach(e => e.click());
}

window.addEventListener("load", main);
