AppCenter To Slack [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/vkimone/appcenter-to-slack.git)
====================================

appcenter-to-slack is a webhook receiver that will post messages to your Slack instance. AppCenter supports sending the following types of events to webhooks:

* Build 
* Distribution
* Crashes

> appcenter-to-slack supports only the distribution type of event. there is no ducumentation on the payload of the "Build" and "Crashes".


## Get Your Slack Access Token

In order to use this integration, you need the Slack Access Token and the channel name or id `(e.g. #channel or C061EG9SL)`  to post messages to. 
You can get an access token from your Slack app or custom integration - xoxa, xoxp, or xoxb.

1. Create new app on https://api.slack.com/apps.
2. Click on Features > OAuth & Permissions


## Deploy to Heroku

Click on the Heroku button above and fill out the form.

## Create the Webhook

1. Click on your app on the [AppCenter dashboard](https://appcenter.ms/apps).
2. Click on Settings > Webhooks.
3. Create a new Webook.
4. Enter a name and the URL of your Heroku app e.g. `https://YOUR-APP-NAME.herokuapp.com/?channel_id=general`

> `channel_id` is the mandatory query parameter.