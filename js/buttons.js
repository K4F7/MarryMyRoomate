document.addEventListener('DOMContentLoaded', () => {
    const btnGet = document.getElementById('btn-get');
    const btnLeave = document.getElementById('btn-leave');

    if (btnGet) {
        btnGet.addEventListener('click', () => {
            // 仅负责跳转到“关于我”页面
            window.location.href = './subpages/page1.html';
        });
    }

    const introSection = document.getElementById('introduction');

    if (btnLeave && introSection) {
        btnLeave.addEventListener('mouseover', () => {
            // Ensure the section is the positioning context
            if (window.getComputedStyle(introSection).position === 'static') {
                introSection.style.position = 'relative';
            }

            const maxX = introSection.clientWidth - btnLeave.offsetWidth;
            const maxY = introSection.clientHeight - btnLeave.offsetHeight;

            const x = Math.random() * Math.max(0, maxX);
            const y = Math.random() * Math.max(0, maxY);

            btnLeave.style.position = 'absolute';
            btnLeave.style.left = `${x}px`;
            btnLeave.style.top = `${y}px`;
        });
    }
});
