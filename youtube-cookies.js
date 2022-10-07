// ==UserScript==
// @name        Reject Youtube Cookies
// @namespace   msd.github
// @match       https://www.youtube.com/*
// @grant       none
// @version     1.0
// @author      msd
// @description Skip all the pesky prompts about cookies (clicks "reject all")
// ==/UserScript==

const select_consent_form = '//ytd-consent-bump-v2-lightbox'

const select_consent_form__reject_all_button_1 = '//yt-formatted-string[text()="Reject all"]';
const select_consent_form__reject_all_button_2 = '//button//span[text()="Reject all"]';
const select_consent_form__reject_all_button_last = '//*[text()="Reject all"]';

const INITIAL_DELAY = 500; //< ms
const RETRY_DELAY = 200; //< ms
const MAX_RETRIES = 15;

function xpathAll(xpath, root)
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

function xpathExists(xpath, root)
{
    if (root === undefined)
    {
        root = document;
    }
    return document.evaluate(xpath, root).iterateNext() !== null;
}

function clickReject(cform)
{
    let method1 = xpathAll(select_consent_form__reject_all_button_1, cform);
    if (method1.length !== 0)
    {
        console.log("c00kee skip worked 1");
        method1.forEach(e => e.click());
        return;
    }

    let method2 = xpathAll(select_consent_form__reject_all_button_2, cform);
    if (method2.length !== 0)
    {
        console.log("c00kee skip worked 2");
        method2.forEach(e => e.click());
        // if the above doesnt work maybe(?) try clicking the following:
        // ../../../button/yt-touch-feedback-shape/div
        return;
    }

    let method3 = xpathAll(select_consent_form__reject_all_button_last, cform);
    if (method3.length !== 0)
    {
        console.log("c00kee skip  worked using last ditch attempt");
        method3.forEach(e => e.click());
        return;
    }

    console.log("failed to find the reject button");
}

function _main(tries)
{
    console.log("try " + tries);
    let cform;
    if ((cform = xpathAll(select_consent_form)).length !== 0)
    {
        console.log("success?");
        cform.forEach(clickReject);
    }
    else if (tries < MAX_RETRIES)
    {
        setTimeout(_main, RETRY_DELAY, tries + 1);
    }
    else
    {
        console.log("failed skipping c00kees  after " + (tries + 1) + " attempts");
    }
}

function main()
{
    setTimeout(_main, 500, 0);
}

window.addEventListener("load", main);
