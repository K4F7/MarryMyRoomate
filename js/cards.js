document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.review-card');

    cards.forEach(card => {
        const inner = card.querySelector('.card-inner');

        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to the card center
            // We use the entry point to decide direction
            const x = e.clientX - rect.left;
            const width = rect.width;

            // If entered from the left side (x < width/2), rotate one way
            // If entered from the right side, rotate the other way
            if (x < width / 2) {
                // Entered from left, push left side in -> rotateY(180deg)
                // (Right side comes forward)
                inner.style.transform = 'rotateY(180deg)';
            } else {
                // Entered from right, push right side in -> rotateY(-180deg)
                // (Left side comes forward)
                inner.style.transform = 'rotateY(-180deg)';
            }
        });

        card.addEventListener('mouseleave', (e) => {
            // Reset rotation when leaving
            inner.style.transform = 'rotateY(0deg)';
        });
    });
});

