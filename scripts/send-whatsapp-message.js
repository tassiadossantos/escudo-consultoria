// scripts/send-whatsapp-message.js
import 'dotenv/config';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;

if (!accountSid || !authToken) {
    throw new Error('Defina TWILIO_SID e TWILIO_TOKEN antes de executar este script.');
}

const client = twilio(accountSid, authToken);

client.messages
    .create({
        from: process.env.TWILIO_WHATSAPP_FROM ?? 'whatsapp:+14155238886',
        contentSid: process.env.TWILIO_CONTENT_SID ?? 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
        contentVariables: process.env.TWILIO_CONTENT_VARIABLES ?? '{"1":"12/1","2":"3pm"}',
        to: process.env.TWILIO_WHATSAPP_TO ?? 'whatsapp:+557196171605'
    })
    .then(message => console.log(message.sid))
    .catch(err => console.error(err));
