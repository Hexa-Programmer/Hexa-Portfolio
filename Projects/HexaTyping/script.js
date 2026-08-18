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
    rootMargin: "0px 0px -20px 0px"
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

const projectNav = document.querySelector('.project-nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        projectNav.style.backgroundColor = 'rgba(18, 20, 23, 0.95)';
        projectNav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
    } else {
        projectNav.style.backgroundColor = 'rgba(18, 20, 23, 0.85)';
        projectNav.style.boxShadow = 'none';
    }
});

const osBtns = document.querySelectorAll('.os-btn');
const installCode = document.getElementById('install-code');
const copyBtn = document.getElementById('copy-btn');

const codes = {
    unix: "git clone https://github.com/Hexa-Programmer/hexatyping.git\ncd hexatyping\npython hexatyping.py",
    windows: "git clone https://github.com/Hexa-Programmer/hexatyping.git\ncd hexatyping\npython hexatyping.py"
};

function setOS(os) {
    osBtns.forEach(btn => {
        if (btn.dataset.os === os) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
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
            copyBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
            }, 2000);
        });
    });
}

document.getElementById("year").textContent = new Date().getFullYear();