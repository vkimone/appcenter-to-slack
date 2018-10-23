var { WebClient } = require('@slack/client');
var slackifyMarkdown = require('slackify-markdown');

var MessageColor = {
    Release : '#2fa44f',
    Build : '#de9e31',
    Crash : '#d50200'
}

var web = new WebClient(process.env.SLACK_TOKEN);


exports.distribution = function (params) {
    var message = {
        "channel": params.channel_id,
        "attachments": [
            {
                "fallback": "New Version for "+params.app_display_name+" - "+params.short_version+" ("+params.version+")",
                "color": MessageColor.Release,
                "title": "Download & Install on AppCenter",
                "title_link": params.install_link,
                "pretext": "*New Version for "+params.app_display_name+"*",
                "text": "",
                "mrkdwn_in": ["pretext", "text", "fields"],
                "fields": [
                    {
                        "title": "App",
                        "value": "`"+params.app_display_name+"`",
                        "short": true
                    },
                    {
                        "title": "Platform",
                        "value": "`"+params.platform+"`",
                        "short": true
                    },
                    {
                        "title": "Version",
                        "value": "`"+params.short_version+" ("+params.version+")`",
                        "short": true
                    },
                    {
                        "title": "Size",
                        "value": "`"+bytesToSize(params.size)+"`",
                        "short": true
                    },
                    {
                        "title": "Release Notes",
                        "value": slackifyMarkdown(params.release_notes),
                        "short": false
                    }
                ]
            }
        ]
    }

    web.chat.postMessage(message)
        .then((response) => {
            console.log('Message sent: ', response.ts);
        })
        .catch(console.error);
};

exports.build = function (params) {
    // not implemented
}

exports.crashes = function (params) {
    // not implemented
}

exports.ping = function (params) {
    var message = {
        "channel": params.channel_id,
        "text": "Ping from AppCenter ! :wave:"
    }
    web.chat.postMessage(message)
    .then((response) => {
        console.log('Message sent: ', response.ts);
    })
    .catch(console.error);
};

function bytesToSize(bytes,decimals) {
    if(bytes == 0) return '0 Bytes';
    var k = 1024,
        dm = decimals <= 0 ? 0 : decimals || 1,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
 }
