<?php
// ভিজিটর কাউন্টার লজিক (ভার্সেলে ফাইল রাইট সাপোর্ট করে না, তাই এটি এখানে এরর ছাড়াই হ্যান্ডেল করা হয়েছে)
$visitor_count = 1050; // ডিফল্ট কাউন্ট
?>

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
        .input-glass:focus { border-color: #fe2c55; box-shadow: 0 0 20px rgba(254, 44, 85, 0.1); }
        .btn-md { padding: 10px 24px; font-size: 13px; font-weight: 700; border-radius: 50px; transition: 0.3s; cursor: pointer; }
        .btn-fetch { background: linear-gradient(90deg, #fe2c55, #25f4ee); color: black; border: none; }
        .btn-fetch:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(254, 44, 85, 0.4); }
    </style>
</head>
<body class="p-4">
    <div class="bg-grid"></div>

    <div class="text-center mt-16 mb-8">
        <div class="mb-3 text-3xl opacity-80 animate-bounce"><i class="fab fa-tiktok"></i></div>
        <h1 class="text-4xl sm:text-5xl font-black tracking-tight">TikTok <span class="text-[#fe2c55]">Downloader</span></h1>
        <div class="mt-3 flex justify-center gap-2 text-[8px] font-bold uppercase tracking-[2px] text-gray-500 opacity-80">
            <span>No Watermark</span> • <span>No Copyright</span> • <span>Fast & Free</span>
        </div>
    </div>

    <div class="w-full max-w-lg mx-auto text-center">
        <div class="mb-4">
            <div class="visitor-badge"><div class="pulse-dot"></div> LIVE VISITORS: <?php echo number_format($visitor_count); ?></div>
        </div>
        <form method="POST" class="space-y-5">
            <input type="url" name="url" required placeholder="ভিডিও লিঙ্কটি এখানে পেস্ট করুন..." class="input-glass w-full p-4 rounded-2xl outline-none text-white text-center text-sm">
            <button type="submit" name="fetch" class="btn-md btn-fetch uppercase tracking-widest flex items-center gap-2 mx-auto">
                <i class="fas fa-bolt text-[10px]"></i> Get Video
            </button>
        </form>
    </div>

    <?php
    if(isset($_POST['fetch'])){
        $user_url = $_POST['url'];
        $api_url = "https://api.tiklydown.eu.org/api/download?url=" . urlencode($user_url);
        
        // Verifying API with cURL for better Vercel support
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $api_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($ch);
        curl_close($ch);
        
        $resData = json_decode($response, true);

        if($resData && isset($resData['video'])){
            $res = $resData;
            ?>
            <div class="mt-10 flex flex-col items-center bg-white/5 p-6 rounded-[2.5rem] border border-white/5">
                <img src="<?php echo $res['thumbnail']; ?>" class="w-32 h-32 object-cover rounded-2xl border border-white/10 mb-4">
                <div class="text-center mb-5">
                    <p class="text-[#25f4ee] font-bold text-xs">@<?php echo htmlspecialchars($res['author']['unique_id'] ?? 'User'); ?></p>
                    <p class="text-gray-500 text-[9px] mt-1 italic px-2"><?php echo htmlspecialchars($res['title']); ?></p>
                </div>
                <a href="<?php echo $res['video']['noWatermark']; ?>" target="_blank" class="bg-white text-black px-6 py-2 rounded-full font-bold text-[11px] hover:bg-[#25f4ee] transition-all">
                    <i class="fas fa-download mr-1"></i> SAVE TO DEVICE
                </a>
            </div>
            <?php
        } else {
            echo "<p class='mt-5 text-red-500 text-xs'>ভিডিওটি পাওয়া যায়নি স্যার! লিঙ্কটি চেক করুন।</p>";
        }
    }
    ?>

    <div class="mt-auto w-full pt-16 pb-8 flex flex-col items-center">
        <div class="text-center mb-8 opacity-50">
            <p class="text-[7px] uppercase tracking-[3px] mb-1">Architected By</p>
            <h2 class="text-xs font-bold text-white tracking-[2px]">BLACK HERIX</h2>
            <p class="text-[7px] text-blue-500/50 font-bold uppercase mt-1">Powered By Sir's Server</p>
        </div>
    </div>
</body>
</html>
