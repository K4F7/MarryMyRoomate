document.addEventListener('DOMContentLoaded', () => {
    const btnGet = document.getElementById('btn-get');
    const btnLeave = document.getElementById('btn-leave');

    if (btnGet) {
        btnGet.addEventListener('click', () => {
            window.location.href = 'contact.html';
        });
    }

    if (btnLeave) {
        btnLeave.addEventListener('mouseover', () => {
            const x = Math.random() * (window.innerWidth - btnLeave.offsetWidth);
            const y = Math.random() * (window.innerHeight - btnLeave.offsetHeight);

            btnLeave.style.position = 'fixed';
            btnLeave.style.left = `${x}px`;
            btnLeave.style.top = `${y}px`;
            btnLeave.style.zIndex = '1000'; // Ensure it's on top
        });
    }
});

