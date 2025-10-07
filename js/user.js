document.querySelectorAll('.campaign-card').forEach(card => {
    card.addEventListener('click', e => {
        if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.campaign-options')) return;
        window.location.href = card.dataset.url;
    });
});

//slider donations
document.querySelectorAll('.donations-slider-wrap').forEach(wrap => {
    const slider = wrap.querySelector('.donations-slider');
    const leftBtn = wrap.querySelector('.slider-nav-btn.left');
    const rightBtn = wrap.querySelector('.slider-nav-btn.right');
    if (!slider || !leftBtn || !rightBtn) return;

    leftBtn.addEventListener('click', e => {
        e.preventDefault();
        slider.scrollBy({ left: -slider.offsetWidth * 0.8, behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', e => {
        e.preventDefault();
        slider.scrollBy({ left: slider.offsetWidth * 0.8, behavior: 'smooth' });
    });
});

//slider donated
document.querySelectorAll('.donated-slider-wrap').forEach(wrap => {
    const slider = wrap.querySelector('.donated-slider');
    const leftBtn = wrap.querySelector('.slider-nav-btn.left');
    const rightBtn = wrap.querySelector('.slider-nav-btn.right');
    if (!slider || !leftBtn || !rightBtn) return;

    leftBtn.addEventListener('click', e => {
        e.preventDefault();
        slider.scrollBy({ left: -slider.offsetWidth * 0.8, behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', e => {
        e.preventDefault();
        slider.scrollBy({ left: slider.offsetWidth * 0.8, behavior: 'smooth' });
    });
});