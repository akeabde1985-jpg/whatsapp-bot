const http = require('http');
http.createServer((req,res)=>{res.end('Bot is running')}).listen(process.env.PORT || 3000);

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('QR READY - scan it');
});

client.on('ready', () => {
  console.log('Bot is ready!');
});

function getReply(text) {
  text = text.toLowerCase();
  if (text.includes('سلام') || text.includes('salam') || text.includes('hi') || text.includes('hello')) {
    return 'وعليكم السلام! كيداير؟ ❤️';
  }
  if (text.includes('من صنعك') || text.includes('شكون صنعك') || text.includes('شكون صايبك')) {
    return 'صنعني سيدي أيوب، تبارك الله عليه 👑';
  }
  if (text.includes('لاباس') || text.includes('كيداير')) {
    return 'الحمد لله، و نتا؟';
  }
  return 'فهمتك، شنو بغيتي نقول ليك؟';
}

client.on('message', async (msg) => {
  if (msg.fromMe) return;
  const reply = getReply(msg.body);
  msg.reply(reply);
});

client.initialize();
