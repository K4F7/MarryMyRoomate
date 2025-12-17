import confetti from '../vendor/canvas-confetti/confetti.module.mjs';

function runFireworks() {
    const duration = 2000;
    const end = Date.now() + duration;

    // Audio setup
    // Note: Please ensure 'pop.mp3' and 'wedding_march.mp3' exist in the 'audio' folder
    const popSound = new Audio('audio/pop.mp3');
    const bgm = new Audio('audio/wedding_march.mp3');
    bgm.loop = true;

    // Attempt to play BGM
    bgm.play().catch(error => {
        console.log("Autoplay prevented for BGM. Waiting for user interaction.", error);
        const playOnInteraction = () => {
            bgm.play();
            document.removeEventListener('click', playOnInteraction);
        };
        document.addEventListener('click', playOnInteraction);
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

// Check if we have already shown the fireworks in this session
if (!sessionStorage.getItem('hasSeenFireworks')) {
    // Wait a brief moment for the page to settle
    setTimeout(() => {
        runFireworks();
        sessionStorage.setItem('hasSeenFireworks', 'true');
    }, 500);
}

