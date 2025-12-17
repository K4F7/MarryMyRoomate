function updateTimer() {
    // 假设出生日期为 2006年1月1日 (19岁)
    // 如果需要精确日期，可以在此处修改
    const birthDate = new Date("2006-01-01T00:00:00");
    const now = new Date();
    
    const diff = now - birthDate;
    
    // Calculate total days
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    const timerElement = document.getElementById('single-timer');
    if (timerElement) {
        timerElement.innerHTML = `
            <div class="timer-item"><span class="timer-num">${days}</span> 天</div>
        `;
    }
}

setInterval(updateTimer, 1000);
document.addEventListener('DOMContentLoaded', updateTimer);

