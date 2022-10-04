// ==UserScript==
// @name        Recruiter Booter for indeed.com
// @namespace   msd.github
// @match       https://*.indeed.com/jobs
// @grant       none
// @version     1.0
// @author      https://github.com/msd
// @description 10/4/2022, 9:34:15 PM Flag or hide results by specific companies in indeed search
// ==/UserScript==

/// Change this if you want to hide the recruiters instead
/// of flagging them with a color
const hide = false;

/// When flagging color the entire result instead of just the company name
const bigFlag = true;

/// The pesky baddies (company names), feel free to add your own (add exactly as shown in the results' page)
const baddies = new Set(["Client Server", "Oho Group", "Noir Consulting"]);

/// What color to flag the baddies
const baddieColor = "#ff0000"

//////////////////////////////////////////////////////////////////////////////////////////
//////  ADVANCED BADDIE DETECTION ALGORITHM AHEAD                                   //////
//////////////////////////////////////////////////////////////////////////////////////////

const css = 'li td.resultContent > div.companyInfo > span.companyName'

function xpathAll(xpath, root)
{
  if (root === undefined)
    {
      root = document;
    }

  let xpathResult = document.evaluate(xpath, root);

  let a = [];

  while ( (e = xpathResult.iterateNext()) !== null )
  {
    a.push(e);
  }
  return a;
}

function main()
{
  let action;
  if (hide)
  {
    action = (e) => {
      while (e.tagName !== "LI")
        {
          e = e.parentNode;
        }
      e.hidden = true;
    }
  }
  else // flag instead of hiding
  {
    if (!bigFlag)
    {
      action = (e) => { e.style.background = baddieColor; };
    }
    else // it's the big one
    {
      action = (e) => {
        // traverse up the DOM until the "ideal element" (the one that looks
        // best when turned red) is found div.job_seen_beacon is the ideal
        // element but stop at li in case it is not found (sail-safe)
        while (!e.classList.contains("job_seen_beacon") && e.tagName !== "LI")
        {
          e = e.parentNode;
        }
        e.style.background = baddieColor;
      }
    }
  }

  const pred = (e) => {
    const potentialBaddieName = e.innerText.trim();
    if (baddies.has(potentialBaddieName))
    {
      action(e);
    }
    console.log(e.innerText);
  }

  Array.from(document.querySelectorAll(css)).filter(pred).forEach(action);
}

console.log("!!==!!")
window.addEventListener("load", main);

// TODO add regex support >:}
