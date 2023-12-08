const { WebClient } = require('@slack/web-api');
//const fetch = require('node-fetch').default;

const Logger = (title, message) => {
    
    //Trace log on Slack
    Slack(title, message);

    //Trace log on Telegram
    Telegram(title, message);

    //Trace log on Server
}

const CreateLog = (title, message) => {
    Logger(title, message);
}

const CreateLogWithRequest = (req, title, message) => {
    const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    this.Logger(title, {status:statusCode,url:url, request:req.body, data: message});
}

const Slack = (title, message) => {
    const token = process.env.SLACK_TOKEN;
    const conversationId = process.env.SLACK_CHANNEL_ID;
    const web = new WebClient(token);    
    const data = message.data;
    const jsonString = JSON.stringify(data, null, 2); 
    const formattedCodeBlock = "```json\n" + jsonString + "\n```";
    if(!data.status) {
        data.status = "UNKNOWN";
    }
    //console.log(data);
    let content = {
        "text" : "ERROR",
        "blocks": [
            {
                "type": "rich_text",
                "elements": [
                    {
                        "type": "rich_text_section",
                        "elements": [
                            {
                                "type": "text",
                                "text": "Error | " + data.status,
                                "style": {
                                    "bold": true
                                }
                            }
                        ]
                    }
                ]
            }
        ]
        
    };

    

    if(data.url) {
        content.blocks.push(
            {
            "type": "rich_text",
            "elements": [
                {
                    "type": "rich_text_section",
                    "elements": [
                        {
                            "type": "text",
                            "text": "URL",
                            "style": {
                                "bold": true
                            }
                        }
                    ]
                }
            ]
            },
            {
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": data.url,
                    "emoji": true
                }
            });
    }

    

    if(data.message) {
        content.blocks.push({
            "type": "rich_text",
            "elements": [
                {
                    "type": "rich_text_section",
                    "elements": [
                        {
                            "type": "text",
                            "text": "Content",
                            "style": {
                                "bold": true
                            }
                        }
                    ]
                }
            ]
            },
            {
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": data.message,
                    "emoji": true
                }
            });
    }

    if(!Object.keys(data.request).length === 0) {
        let jsonRequestString = JSON.stringify(data.request, null, 2); 
        let formattedRequestData = "```json\n" + jsonRequestString + "\n```";
        content.blocks.push({
            "type": "rich_text",
            "elements": [
                {
                    "type": "rich_text_section",
                    "elements": [
                        {
                            "type": "text",
                            "text": "Request",
                            "style": {
                                "bold": true
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": formattedRequestData
            }
        });
    }


    if(data.stackTrace) {
        //let jsonDataString = JSON.stringify(data.stackTrace, null, 2); 
        //let formattedDataData = "```json\n" + jsonDataString + "\n```";
        content.blocks.push({
            "type": "rich_text",
            "elements": [
                {
                    "type": "rich_text_section",
                    "elements": [
                        {
                            "type": "text",
                            "text": "StackTrace",
                            "style": {
                                "bold": true
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": data.stackTrace
            }
        });
    }
    
    content.channel = conversationId;

    console.log(content);

    (async () => {

        // Post a message to the channel, and await the result.
        // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
        const result = await web.chat.postMessage(content);

        // The result contains an identifier for the message, `ts`.
        //console.log(`Successfully send message ${result.ts} in conversation ${conversationId}`);
    })();
}

const Telegram = (title, message) => {
    // Website not working now
//     const botToken = process.env.TELEGRAM_TOKEN;
//     const chatId = '+iiBu3J9iUY9hZTU1';
//     const messageText = 'Hello, this is a test message from your Telegram bot!';
//     const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

//     const params = {
//         chat_id: chatId,
//         text: messageText,
//       };

      
//     // Make the API request to send the message
//     fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(params),
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.ok) {
//         console.log('Message sent successfully!');
//       } else {
//         console.error(`Error: ${data.description}`);
//       }
//     })
//     .catch(error => {
//       console.error(`Error: ${error.message}`);
//     });
}

module.exports = {Logger, CreateLog};