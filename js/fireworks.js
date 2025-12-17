// import confetti from '../vendor/canvas-confetti/confetti.module.mjs';

// 由用户点击页面触发的烟花与音效
function runFireworks() {
    const duration = 2000;
    const end = Date.now() + duration;

    // Audio setup
    // Note: Please ensure 'pop.mp3' and 'wedding_march.mp3' exist in the 'audio' folder
    const popSound = new Audio('audio/pop.mp3');
    const bgm = new Audio('audio/wedding_march.mp3');
    bgm.loop = true;

    // 在用户点击事件中调用时，一般不会被自动播放策略拦截
    bgm.play().catch(error => {
        console.log("BGM play failed, maybe due to browser policy:", error);
    });

    let lastPopTime = 0;
    const popInterval = 300; // Play pop sound every 300ms

    (function frame() {
        const now = Date.now();

        // Play pop sound periodically
        if (now - lastPopTime > popInterval) {
            const clone = popSound.cloneNode();
            clone.volume = 0.5;
            clone.play().catch(() => {});
            lastPopTime = now;
        }

        // launch a few confetti from the left edge
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 }
        });
        // and launch a few from the right edge
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// 通过点击页面任意位置触发烟花与音乐，适配 file:// 打开
(function setupFireworksTrigger() {
    // 如果浏览器是通过 file:// 打开，给一点提示（控制台）
    if (window.location.protocol === 'file:') {
        console.log('当前通过 file:// 打开，本地音频可能会被某些浏览器限制，如无声音请考虑使用本地服务器方式（http://localhost:...）。');
    }

    let hasTriggered = false;

    document.addEventListener('DOMContentLoaded', () => {
        // 如果本会话已经看过烟花，就不再触发
        try {
            if (sessionStorage.getItem('hasSeenFireworks')) {
                hasTriggered = true;
            }
        } catch (e) {
            // 忽略 sessionStorage 异常
        }

        // 在 body 上监听一次点击事件
        document.body.addEventListener('click', () => {
            if (hasTriggered) return;
            hasTriggered = true;

            runFireworks();
            try {
                sessionStorage.setItem('hasSeenFireworks', 'true');
            } catch (e) {
                // 某些隐私模式可能禁止 sessionStorage，忽略即可
            }
        }, { once: false });
    });
})();
