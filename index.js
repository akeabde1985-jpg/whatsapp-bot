const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

client.on('qr', (qr) => { qrcode.generate(qr, {small: true}); });
client.on('ready', () => { console.log('Bot is ready!'); });

function getReply(text) {
  text = text.toLowerCase();
  if (text.includes('سلام') || text.includes('salam')) return 'وعليكم السلام، مرحبا بيك ❤️';
  if (text.includes('من صنعك') || text.includes('شكون صايبك')) return 'صايبني المغربي المطيع، خلقني ليحاج';
  if (text.includes('شكون')) return 'أنا بوت صنعو المغربي المطيع';
  if (text.includes('لباس') || text.includes('كيداير')) return 'الحمد لله بخير، ونتا؟';
  if (text.includes('شكرا')) return 'العفو، مرحبا بيك ديما 🙏';
  return 'مرحبا بيك، أنا بوت المغربي المطيع. كتب ليا سلام باش نبدا معاك';
}

client.on('message', msg => {
  if (msg.fromMe) return;
  const reply = getReply(msg.body);
  msg.reply(reply);
});

client.initialize();
