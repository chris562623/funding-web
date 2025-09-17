// campaign card menu dropdown
document.querySelectorAll('.campaign-card').forEach(card => {
    const icon = card.querySelector('.campaign-options');
    const menu = card.querySelector('.campaign-dropdown');

    if (icon && menu) {
        icon.addEventListener('click', function (event) {
            event.stopPropagation();
            menu.classList.toggle('active');
        });

        document.addEventListener('click', function (event) {
            if (!menu.contains(event.target) && !icon.contains(event.target)) {
                menu.classList.remove('active');
            }
        });
    }
});
