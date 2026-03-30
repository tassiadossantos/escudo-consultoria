// scripts/send-whatsapp-message.js
const accountSid = 'process.env.TWILIO_SID';
const authToken = 'process.env.TWILIO_TOKEN'; 
import twilio from 'twilio';
const client = twilio(accountSid, authToken);

client.messages
    .create({
        from: 'whatsapp:+14155238886',
        contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
        contentVariables: '{"1":"12/1","2":"3pm"}',
        to: 'whatsapp:+557196171605'
    })
    .then(message => console.log(message.sid))
    .catch(err => console.error(err));
