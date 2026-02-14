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
                .neon-text { text-shadow: 0 0 10px rgba(254, 44, 85, 0.3); }
            </style>
        </head>
        <body class="p-4">
            <div class="bg-grid"></div>

            <div class="text-center mt-16 mb-8">
                <div class="mb-3 text-3xl opacity-80 animate-bounce"><i class="fab fa-tiktok"></i></div>
                <h1 class="text-4xl sm:text-5xl font-black tracking-tight neon-text">
                    TikTok <span class="text-[#fe2c55]">Downloader</span>
                </h1>
                <div class="mt-3 flex justify-center gap-2 text-[8px] font-bold uppercase tracking-[2px] text-gray-500 opacity-80">
                    <span>No Watermark</span> • <span>No Copyright</span> • <span>Fast & Free</span>
                </div>
            </div>

            <div class="w-full max-w-lg mx-auto text-center">
                <div class="mb-4">
                    <div class="visitor-badge">
                        <div class="pulse-dot"></div>
                        LIVE VISITORS: <span id="vCount">1,024</span>
                    </div>
                </div>

                <div class="space-y-5">
                    <input type="url" id="vUrl" placeholder="ভিডিও লিঙ্কটি এখানে পেস্ট করুন..." 
                        class="input-glass w-full p-4 rounded-2xl outline-none text-white text-center text-sm">
                    <button onclick="dl()" class="btn-fetch uppercase tracking-widest flex items-center gap-2 mx-auto">
                        <i class="fas fa-bolt text-[10px]"></i> Get Video
                    </button>
                </div>

                <div id="res" class="mt-10"></div>
            </div>

            <div class="mt-auto w-full pt-16 pb-8 flex flex-col items-center">
                <div class="text-center mb-8 opacity-50">
                    <p class="text-[7px] uppercase tracking-[3px] mb-1">Architected By</p>
                    <h2 class="text-xs font-bold text-white tracking-[2px]">BLACK HERIX</h2>
                    <p class="text-[7px] text-blue-500/50 font-bold uppercase mt-1">Powered By Mirjapur Cyber Venom</p>
                </div>
                <a href="https://t.me/+iA3sqCtLYtU2ZGY1" target="_blank" class="flex items-center gap-2 text-gray-500 hover:text-white transition-all">
                    <div class="bg-blue-600/10 p-2 rounded-lg border border-blue-600/20"><i class="fab fa-telegram-plane text-blue-400"></i></div>
                    <span class="text-[10px] font-bold uppercase tracking-widest">Join Official Channel</span>
                </a>
                <p class="mt-6 text-[6px] text-gray-800 uppercase tracking-widest">© 2026 Herix Labs. All rights reserved.</p>
            </div>

            <script>
                // লাইভ ভিজিটর ফেক কাউন্টার লজিক
                setInterval(() => {
                    const el = document.getElementById('vCount');
                    let count = parseInt(el.innerText.replace(',', ''));
                    el.innerText = (count + Math.floor(Math.random() * 3)).toLocaleString();
                }, 3000);

                async function dl() {
                    const u = document.getElementById('vUrl').value;
                    const r = document.getElementById('res');
                    if(!u) return;
                    r.innerHTML = '<p class="animate-pulse text-gray-400">Processing...</p>';
                    try {
                        const response = await fetch('/api/download?url=' + encodeURIComponent(u));
                        const d = await response.json();
                        const data = d.data;
                        r.innerHTML = \`
                            <div class="flex flex-col items-center bg-white/5 p-6 rounded-[2.5rem] border border-white/5">
                                <img src="\${data.cover}" class="w-32 h-32 object-cover rounded-2xl border border-white/10 mb-4">
                                <div class="text-center mb-5">
                                    <p class="text-[#25f4ee] font-bold text-xs">@\${data.author.nickname}</p>
                                    <p class="text-gray-500 text-[9px] mt-1 italic px-2">\${data.title}</p>
                                </div>
                                <a href="\${data.play}" target="_blank" class="bg-white text-black px-6 py-2 rounded-full font-bold text-[11px] hover:bg-[#25f4ee] transition-all">
                                    <i class="fas fa-download mr-1"></i> SAVE TO DEVICE
                                </a>
                            </div>\`;
                    } catch (e) { r.innerHTML = '<p class="text-red-500">Error Fetching Video!</p>'; }
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
