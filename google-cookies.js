// ==UserScript==
// @name        Reject Google Cookies
// @namespace   msd.github
// @match       https://consent.google.com/*
// @grant       none
// @version     1.1
// @author      msd
// @description Reject cookies by google
// ==/UserScript==

/*
# Changelog

All notable changes to this project will be documented here

## Unreleased

### Fixed

- xpathArray major logic bug, only every other result is returned

## [1.1] 02-12-2022

### Added 

- Added "xpathArray" function alias to "$x" to keep with convention by Web Console Helper functions,
  see https://firefox-source-docs.mozilla.org/devtools-user/web_console/helpers/index.html

### Fixed

- Fixed breaking UI change

## [1.0] 2022-10-04 Initial release

### Added

- Automatic rejection of cookies by clicking the appropriate form button
 */

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
    }
    return a;
}

let $x = xpathArray; // convenience and convention like web console helper

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

    return isVisible(element.parentElement);
}

function findAncestorByTagname(element, tag_name)
{
    tag_name = tag_name.toUpperCase();
    while (element.tagName !== tag_name)
    {
        if (element.parentElement === null)
        {
            throw new Error(`Parent element with tag name '${tag_name}' could not be found`);
        }
        element = element.parentElement;
    }
    return element;
}

/**
 * Press the submit input or the submit button (in that order)
 * @param {Element} e The form that needs to be submitted or an element inside of it
 */
function submitForm(element)
{
    let form = findAncestorByTagname(element, "form");

    let first_option = $x('.//input[@type="submit"]', form);
    let second_option = $x('.//button', form);

    if (first_option.length !== 0)
    {
        first_option[0].click();
        return;
    }

    if (second_option.length !== 0)
    {
        second_option[0].click();
        return;
    }

    throw new Error("Form could not be submitted as it has no submit options.");
}

function main()
{
    let buttons = $x('//form//input[@name="set_eom"][@value="true"]').filter(isVisible);
    if (buttons.length == 0)
    {
        return;
    }
    buttons.forEach(e => submitForm(e));
}

window.addEventListener("load", main);
