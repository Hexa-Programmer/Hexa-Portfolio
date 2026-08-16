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

const projectNav = document.querySelector('.project-nav');
const sectionDark = document.querySelector('.section-dark');

const navColorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            projectNav.classList.add('scrolled-nav');
        } else {
            projectNav.classList.remove('scrolled-nav');
        }
    });
}, {
    root: null,
    threshold: 0,
    rootMargin: "-80px 0px 0px 0px"
});

if (sectionDark && projectNav) {
    navColorObserver.observe(sectionDark);
}

const osBtns = document.querySelectorAll('.os-btn');
const installCode = document.getElementById('install-code');
const copyBtn = document.getElementById('copy-btn');

const codes = {
    windows: "git clone https://github.com/Hexa-Programmer/HexaNotes.git\ncd HexaNotes\nstart index.html",
    unix: "git clone https://github.com/Hexa-Programmer/HexaNotes.git\ncd HexaNotes\nopen index.html"
};

function setOS(os) {
    osBtns.forEach(btn => {
        if (btn.dataset.os === os) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    if (installCode) {
        installCode.textContent = codes[os];
    }
}

const userAgent = window.navigator.userAgent.toLowerCase();
if (userAgent.indexOf("win") > -1) {
    setOS('windows');
} else {
    setOS('unix');
}

osBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setOS(btn.dataset.os);
    });
});

if (copyBtn && installCode) {
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(installCode.textContent).then(() => {
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
            }, 2000);
        });
    });
}
