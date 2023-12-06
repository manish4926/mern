const { WebClient } = require('@slack/web-api');

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

    (async () => {

        // Post a message to the channel, and await the result.
        // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
        const result = await web.chat.postMessage({
            text: message,
            channel: conversationId,
        });

        // The result contains an identifier for the message, `ts`.
        //console.log(`Successfully send message ${result.ts} in conversation ${conversationId}`);
    })();
}

const Telegram = (title, message) => {
    // Website not working now
}

module.exports = {Logger, CreateLog};