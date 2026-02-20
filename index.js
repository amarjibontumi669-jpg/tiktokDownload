const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// কনফিগারেশন - এগুলো Vercel Dashboard থেকে সেট করবে
const API_KEY = process.env.API_KEY || "Db99b6ad61a43f115ddee06c7d716467";
const API_URL = "https://smmnea.com/api/v2";
const SERVICE_ID = "12394"; // আপডেট করা হয়েছে
const QUANTITY = 1500; // আপডেট করা হয়েছে

app.get('/', (req, res) => {
    res.send(renderHTML(""));
});

app.post('/', async (req, res) => {
    const link = req.body.tiktok_link;
    let message = "";

    try {
        const response = await axios.post(API_URL, new URLSearchParams({
            key: API_KEY,
            action: 'add',
            service: SERVICE_ID,
            link: link,
            quantity: QUANTITY
        }));

        if (response.data && response.data.order) {
            message = `<p style='color: #00f2ea; font-weight:bold;'>অর্ডার সফল হয়েছে! আইডি: ${response.data.order}</p>`;
        } else {
            message = `<p style='color: #ff0050; font-weight:bold;'>অর্ডার ব্যর্থ হয়েছে! আবার চেষ্টা করুন।</p>`;
        }
    } catch (error) {
        message = `<p style='color: #ff0050; font-weight:bold;'>সার্ভার ত্রুটি! পরে চেষ্টা করুন।</p>`;
    }

    res.send(renderHTML(message));
});

function renderHTML(message) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>TikTok Free Views - Black Herix</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { background-color: #010101; color: white; font-family: 'Segoe UI', Roboto, sans-serif; display: flex; flex-direction: column; min-height: 100vh; }
            .header { padding: 15px; text-align: center; border-bottom: 1px solid #222; background: #010101; width: 100%; }
            .dev-info { color: #fe2c55; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px; }
            .wrapper { width: 100%; max-width: 420px; margin: 20px auto; padding: 0 15px; flex-grow: 1; }
            .card { background: #121212; border-radius: 16px; padding: 25px; border: 1px solid #333; box-shadow: 0 10px 30px rgba(0,0,0,0.7); text-align: center; }
            .tiktok-logo { width: 50px; margin-bottom: 15px; }
            h2 { font-size: 22px; margin-bottom: 10px; font-weight: 800; color: #fff; }
            p.desc { font-size: 13px; color: #888; margin-bottom: 20px; }
            .ad-container { width: 100%; margin: 15px 0; background: #1a1a1a; border-radius: 10px; min-height: 90px; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid #222; }
            .counter-box { font-size: 36px; font-weight: 900; color: #fe2c55; margin: 10px 0; text-shadow: 0 0 10px rgba(254, 44, 85, 0.3); }
            .status-text { font-size: 14px; color: #00f2ea; margin-bottom: 15px; font-weight: bold; }
            input[type="text"] { width: 100%; padding: 15px; background: #262626; border: 1px solid #444; border-radius: 10px; color: white; margin-bottom: 15px; font-size: 15px; outline: none; transition: 0.3s; }
            .btn { width: 100%; padding: 16px; background: #fe2c55; border: none; border-radius: 10px; color: white; font-size: 16px; font-weight: bold; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 15px rgba(254, 44, 85, 0.3); }
            .btn:disabled { background: #333; color: #777; cursor: not-allowed; box-shadow: none; }
            .footer { text-align: center; padding: 20px; margin-top: auto; }
            .footer a { color: #00f2ea; text-decoration: none; font-size: 14px; font-weight: bold; border: 1px solid #00f2ea; padding: 8px 20px; border-radius: 50px; }
            .hidden { display: none; }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="dev-info">DEVELOPER BY: BLACK HERIX</div>
            <div class="dev-info">POWERED BY: MIRJAPUR CYBER VENOM</div>
        </div>
        <div class="wrapper">
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" class="tiktok-logo" alt="TikTok">
                <h2>Get 1500 Views</h2>
                <p class="desc">Complete the tasks to unlock free views</p>
                ${message}
                <div id="ad-logic-area">
                    <div class="status-text" id="status-label">অ্যাড বাকি আছে</div>
                    <div class="counter-box" id="count-display">10</div>
                    <div class="ad-container">
                        <script type="text/javascript">
                            atOptions = { 'key' : '0b5496f26a063df2ebb57040e1a1209f', 'format' : 'iframe', 'height' : 90, 'width' : 728, 'params' : {} };
                        </script>
                        <script type="text/javascript" src="https://www.highperformanceformat.com/0b5496f26a063df2ebb57040e1a1209f/invoke.js"></script>
                    </div>
                    <button class="btn" id="claim-btn" onclick="handleAdStep()">অ্যাড দেখুন</button>
                </div>
                <div id="order-area" class="hidden">
                    <form method="POST" id="main-form">
                        <p class="status-text" style="color:#00f2ea;">কনগ্রাচুলেশন! এখন লিঙ্ক দিন</p>
                        <input type="text" name="tiktok_link" placeholder="TikTok Video Link (URL)" required>
                        <button type="submit" class="btn">অর্ডার সাবমিট করুন</button>
                    </form>
                </div>
                <div id="cooldown-area" class="hidden">
                    <p style="color: #fe2c55; margin-bottom:10px; font-weight:bold;">অপেক্ষা করুন...</p>
                    <div class="counter-box" id="big-timer">05:00</div>
                    <p class="desc">৫ মিনিট পর আবার ১০টি অ্যাড আসবে</p>
                </div>
            </div>
            <script src="https://pl28510942.effectivegatecpm.com/39/3c/7e/393c7e7eacac1a10dbb649e4b5bc54a3.js"></script>
        </div>
        <div class="footer">
            <a href="https://t.me/+kfvkH89h4gcwNzll">Join Telegram Channel</a>
        </div>
        <script>
            let adsLeft = 10;
            const cooldownKey = 'next_session_time';
            function checkSession() {
                const nextTime = localStorage.getItem(cooldownKey);
                if (nextTime && Date.now() < nextTime) {
                    startBigTimer(Math.floor((nextTime - Date.now()) / 1000));
                }
            }
            function handleAdStep() {
                window.open("https://www.effectivegatecpm.com/x0dducz7?key=618fd46739e206ae16531ee7e9a28b0b", "_blank");
                let btn = document.getElementById('claim-btn');
                let status = document.getElementById('status-label');
                btn.disabled = true;
                let wait = 7;
                status.innerText = "অপেক্ষা করুন...";
                let waitInterval = setInterval(() => {
                    btn.innerText = "অপেক্ষা করুন (" + wait + "s)";
                    wait--;
                    if (wait < 0) {
                        clearInterval(waitInterval);
                        processFinish();
                    }
                }, 1000);
            }
            function processFinish() {
                adsLeft--;
                document.getElementById('count-display').innerText = adsLeft;
                if (adsLeft <= 0) {
                    document.getElementById('ad-logic-area').classList.add('hidden');
                    document.getElementById('order-area').classList.remove('hidden');
                } else {
                    let btn = document.getElementById('claim-btn');
                    btn.disabled = false;
                    btn.innerText = "পরবর্তী অ্যাড দেখুন";
                    document.getElementById('status-label').innerText = "অ্যাড বাকি আছে";
                }
            }
            document.getElementById('main-form').onsubmit = function() {
                const finishTime = Date.now() + (5 * 60 * 1000);
                localStorage.setItem(cooldownKey, finishTime);
            };
            function startBigTimer(seconds) {
                document.getElementById('ad-logic-area').classList.add('hidden');
                document.getElementById('order-area').classList.add('hidden');
                document.getElementById('cooldown-area').classList.remove('hidden');
                let remaining = seconds;
                let timerInterval = setInterval(() => {
                    let m = Math.floor(remaining / 60);
                    let s = remaining % 60;
                    document.getElementById('big-timer').innerText = (m < 10 ? '0'+m : m) + ":" + (s < 10 ? '0'+s : s);
                    if (--remaining < 0) {
                        clearInterval(timerInterval);
                        localStorage.removeItem(cooldownKey);
                        location.reload();
                    }
                }, 1000);
            }
            window.onload = checkSession;
        </script>
    </body>
    </html>`;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running...'));
