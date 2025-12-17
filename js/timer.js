function updateTimer() {
    // 假设出生日期为 2006年1月1日 (19岁)
    // 如果需要精确日期，可以在此处修改
    const birthDate = new Date("2006-01-01T00:00:00");
    const now = new Date();
    
    const diff = now - birthDate;
    
    // Calculate total seconds and milliseconds
    const totalSeconds = Math.floor(diff / 1000);
    const milliseconds = diff % 1000;
    
    const timerElement = document.getElementById('single-timer');
    if (timerElement) {
        const msStr = milliseconds.toString().padStart(3, '0');
        timerElement.innerHTML = `
            <div class="timer-item"><span class="timer-num">${totalSeconds}</span> 秒</div>
            <div class="timer-item"><span class="timer-num">${msStr}</span> 毫秒</div>
        `;
    }
}

setInterval(updateTimer, 10);
document.addEventListener('DOMContentLoaded', updateTimer);
