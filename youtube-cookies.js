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

// $x('.//*[text()="Reject all"]', $('#dialog'))[0].parentElement.parentElement

function clickReject(cform)
{
    let method1 = xpathArray(select_consent_form__reject_all_button_1, cform);
    if (method1.length !== 0)
    {
        method1.forEach(e => e.click());
        return;
    }

    let method2 = xpathArray(select_consent_form__reject_all_button_2, cform);
    if (method2.length !== 0)
    {
        method2.forEach(e => e.click());
        // if the above doesnt work maybe(?) try clicking the following:
        // ../../../button/yt-touch-feedback-shape/div
        return;
    }

    let method3 = xpathArray(select_consent_form__reject_all_button_last, cform);
    if (method3.length !== 0)
    {
        method3.forEach(e => e.click());
        return;
    }
}

function _main(tries)
{
    let cform;
    if ((cform = xpathArray(select_consent_form)).length !== 0)
    {
        cform.forEach(clickReject);
    }
    else if (tries < MAX_RETRIES)
    {
        setTimeout(_main, RETRY_DELAY, tries + 1);
    }
}

function main()
{
    setTimeout(_main, 500, 0);
}

window.addEventListener("load", main);
