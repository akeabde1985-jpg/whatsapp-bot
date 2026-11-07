const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const http = require('http');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
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

  if (text.includes('سلام') || text.includes('salam')) {
    return 'وعليكم السلام! كيداير؟ ❤️';
  }
  if (text.includes('من صنعك') || text.includes('شكون صنعك')) {
    return 'صنعني سيدي أيوب 👑 تبارك الله عليه';
  }
  if (text.includes('لاباس') || text.includes('labass')) {
    return 'الحمد لله، و نتايا؟';
  }
  if (text.includes('شكون انت')) {
    return 'أنا بوت ديال سيدي أيوب';
  }

  return 'فهمتك، شنو بغيتي نقول ليك؟';
}

client.on('message', async (msg) => {
  if (msg.fromMe) return;
  const reply = getReply(msg.body);
  msg.reply(reply);
});

const PORT = process.env.PORT || 10000;
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot is running');
}).listen(PORT, '0.0.0.0', () => {
  console.log('Server on ' + PORT);
});

client.initialize();
