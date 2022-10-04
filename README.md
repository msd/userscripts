# Recruiter Booter for indeed.com

Have you been burned multiple times by a specific company?

Are you tired of sifting through dozens of job listings by the the same damn
recruiter, page after page?

Do you find it frustrating seeing your corporate landlord advertising management
positions instead of fixing your leaky faucet you told them 2 months ago?

Boy, do we have the product for you!

Try RecruiterBooter-2000 today!

# Installing

## Browser

Make sure your browser is up-to-date with the latest version available.

## Install ViolentMonkey

Stores for:
	* [Mozilla Firefox](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
	* [Mozilla Firefox Android](https://addons.mozilla.org/en-US/android/addon/violentmonkey/)
	* [Google Chrome](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
	* [Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/violentmonkey/eeagobfjdenkkddmbclomhiblgggliao) 

Note for Safari users: The following sections do not apply. Install [Userscripts](https://itunes.apple.com/us/app/userscripts/id1463298887) instead and follow their documentation on how to install a script.

## Create a new script

Click the ViolentMonkey (monkey face) icon and then from the popup menu click the plus.

You should be on a new page with some text that starts with `// ==UserScript==`.

Delete all the lines in order to be left with an empty text-box.

## Copy script

Open the [script file](https://github.com/msd/recruiter-booter/raw/main/recruiter-booter.js) and copy the entire contents.

Paste the contents to the empty text-box.

Click "Save & Close" on the top right.

## Configure script

See the Options section for more on what configuration options are provided.

## Try it

Go to indeed.com and search for any of the companies listed in the script and see the magic happen right before your very eyes.

# Options

These are configured as variables inside the script

* `baddies`: The names of offensive companies (no, I'll wait). Write them as they appear in the results page.
* `hide`: Remove violators from view instead of flagging them. (`true`=hide, `false`=flag)
* `bigFlag`: Pick either subtle flagging or very obvious. (`true`=obvious, `false`=subtle)

# Working Status

This has been tested and found working as of 2022-10-04.

If you followed the above instructions and it still does not work please open an issue ticket.
