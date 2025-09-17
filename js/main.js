(function () {
    function debounce(fn, wait = 120) {
        let t;
        return function (...args) {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), wait);
        };
    }

    const handleResize = debounce(function () {
        const navRight = document.querySelector('.nav-right');
        const hamburger = document.querySelector('.hamburger');
        const icon = hamburger ? hamburger.querySelector('i') : null;

        if (window.innerWidth > 768 && navRight && navRight.classList.contains('active')) {
            navRight.classList.remove('active');
            if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
            if (icon) { icon.classList.remove('fa-xmark'); icon.classList.add('fa-bars'); }
        }
    }, 120);


    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    const hamburger = document.querySelector('.hamburger');
    const navRight = document.querySelector('.nav-right');

    if (hamburger && navRight) {

        hamburger.setAttribute('aria-expanded', 'false');

        const icon = hamburger.querySelector('i');

        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            const nowOpen = !navRight.classList.contains('active');
            navRight.classList.toggle('active', nowOpen);
            hamburger.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');

            if (icon) {
                if (nowOpen) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        document.addEventListener('click', function (ev) {
            if (!navRight.contains(ev.target) && !hamburger.contains(ev.target) && navRight.classList.contains('active')) {
                navRight.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                if (icon) { icon.classList.remove('fa-xmark'); icon.classList.add('fa-bars'); }
            }
        });

        document.addEventListener('keydown', function (ev) {
            if (ev.key === 'Escape' && navRight.classList.contains('active')) {
                navRight.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                if (icon) { icon.classList.remove('fa-xmark'); icon.classList.add('fa-bars'); }
            }
        });
    } 
})();
