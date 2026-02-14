const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="bn">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>TikTok Downloader | Pro</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
                body { background: #050505; color: white; font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; display: flex; flex-direction: column; align-items: center; }
                .bg-grid { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 50% 50%, #0d0d2b 0%, #050505 100%); z-index: -2; }
                .bg-grid::after { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px); background-size: 35px 35px; perspective: 1000px; transform: rotateX(60deg); z-index: -1; }
                .visitor-badge { background: rgba(37, 244, 238, 0.1); border: 1px solid rgba(37, 244, 238, 0.2); padding: 4px 12px; border-radius: 50px; font-size: 10px; font-weight: 700; color: #25f4ee; display: inline-flex; align-items: center; gap: 6px; }
                .pulse-dot { width: 6px; height: 6px; background: #25f4ee; border-radius: 50%; box-shadow: 0 0 10px #25f4ee; animation: pulse 1.5s infinite; }
                @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
                .input-glass { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); backdrop-filter: blur(15px); transition: 0.3s; }
                .btn-fetch { background: linear-gradient(90deg, #fe2c55, #25f4ee); color: black; padding: 10px 24px; font-size: 13px; font-weight: 700; border-radius: 50px; }
            </style>
        </head>
        <body class="p-4">
            <div class="bg-grid"></div>
            <div class="text-center mt-16 mb-8">
                <h1 class="text-4xl sm:text-5xl font-black tracking-tight">TikTok <span class="text-[#fe2c55]">Downloader</span></h1>
            </div>
            <div class="w-full max-w-lg mx-auto text-center">
                <div class="mb-4">
                    <div class="visitor-badge"><div class="pulse-dot"></div> LIVE VISITORS: 1,580</div>
                </div>
                <div class="space-y-5">
                    <input type="url" id="vUrl" placeholder="ভিডিও লিঙ্ক পেস্ট করুন..." class="input-glass w-full p-4 rounded-2xl outline-none text-center">
                    <button onclick="dl()" class="btn-fetch uppercase tracking-widest flex items-center gap-2 mx-auto">
                        <i class="fas fa-bolt"></i> GET VIDEO
                    </button>
                </div>
                <div id="res" class="mt-10"></div>
            </div>
            <script>
                async function dl() {
                    const u = document.getElementById('vUrl').value;
                    const r = document.getElementById('res');
                    r.innerHTML = '<p class="animate-pulse text-gray-400">Fetching Video...</p>';
                    try {
                        const response = await fetch('/api/download?url=' + encodeURIComponent(u));
                        const d = await response.json();
                        const data = d.data;
                        r.innerHTML = \`
                            <div class="flex flex-col items-center bg-white/5 p-6 rounded-[2.5rem] border border-white/5">
                                <img src="\${data.cover}" class="w-32 h-32 object-cover rounded-2xl mb-4">
                                <p class="text-[#25f4ee] font-bold">@\${data.author.nickname}</p>
                                <a href="\${data.play}" target="_blank" class="bg-white text-black px-6 py-2 rounded-full font-bold mt-4 hover:scale-105 transition-all">SAVE TO DEVICE</a>
                            </div>\`;
                    } catch (e) { r.innerHTML = '<p class="text-red-500">Error! Please try again.</p>'; }
                }
            </script>
        </body>
        </html>
    `);
});

app.get('/api/download', async (req, res) => {
    try {
        const response = await axios.get('https://api.kojaxd.dpdns.org/downloader/tiktok?apikey=Koja&url=' + encodeURIComponent(req.query.url));
        res.json(response.data);
    } catch (e) { res.status(500).json({error: true}); }
});

module.exports = app;
