const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

client.on('qr', (qr) => { qrcode.generate(qr, { small: true }); });
client.on('ready', () => { console.log('البوت الفيلسوف خدام!'); });

function getReply(text) {
    text = text.toLowerCase();

    // من صنعه ؟
    if (text.includes('من صنعك') || text.includes('من صايبك') || text.includes('من انت') || text.includes('شكون صايبك') || text.includes('من خالقك')) {
        return 'أنا خادم عبد الله المغربي المطيع، خلقني ليُحاج
