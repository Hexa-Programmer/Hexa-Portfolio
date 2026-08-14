if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

if (window.location.hash) {
    history.replaceState(null, null, ' ');
    window.scrollTo(0, 0);
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        window.scrollTo(0, 0);
    }
});

const heroSection = document.getElementById('hero');
const fixedNav = document.getElementById('fixed-nav');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            fixedNav.classList.add('nav-visible');
        } else {
            fixedNav.classList.remove('nav-visible');
        }
    });
}, {
    root: null,
    threshold: 0.1
});

if (heroSection && fixedNav) {
    navObserver.observe(heroSection);
}

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});
