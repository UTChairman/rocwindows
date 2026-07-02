// One-shot: JEF-style mobile responsiveness across all pages.
// - Fluid type/spacing tokens (clamp) so fixed 72px/48px headings stop overflowing 375px viewports
// - Hamburger + slide-down mobile nav (replaces the cut-off bottom app bar)
// - Scrolled-header background like jefcontractors-inc.com
const fs = require('fs');
const path = require('path');

const pages = ['index.html', 'about_us.html', 'services.html', 'our_work.html', 'window_cleaning.html'];

const mobileNavLinks = `
<a class="block py-3 border-b border-white/10 text-structural-white uppercase font-headline-sm text-headline-sm hover:text-brand-light transition-colors" href="index.html">Home</a>
<a class="block py-3 border-b border-white/10 text-structural-white uppercase font-headline-sm text-headline-sm hover:text-brand-light transition-colors" href="about_us.html">About</a>
<a class="block py-3 border-b border-white/10 text-structural-white uppercase font-headline-sm text-headline-sm hover:text-brand-light transition-colors" href="services.html">Services</a>
<a class="block py-3 border-b border-white/10 text-structural-white uppercase font-headline-sm text-headline-sm hover:text-brand-light transition-colors" href="our_work.html">Portfolio</a>
<a class="block py-3 border-b border-white/10 text-structural-white uppercase font-headline-sm text-headline-sm hover:text-brand-light transition-colors" href="index.html#contact">Contact</a>
<a class="block py-3 border-b border-white/10 text-brand-light uppercase font-headline-sm text-headline-sm" href="tel:+18454146195">(845) 414-6195</a>
<a class="mt-5 block bg-safety-yellow text-structural-white text-center px-6 py-4 text-label-bold font-label-bold uppercase border-2 border-safety-yellow active:scale-95 transition-transform" href="index.html#contact">Get a Free Quote</a>`;

const headerActions = (ctaHtml) => `<div class="flex items-center gap-4">
${ctaHtml}
<button aria-controls="mobile-nav" aria-expanded="false" aria-label="Toggle menu" class="md:hidden flex flex-col justify-between w-8 h-[22px] bg-transparent border-0 cursor-pointer p-0" id="menu-btn" type="button">
<span class="block h-[3px] w-full bg-structural-white transition-transform duration-200"></span>
<span class="block h-[3px] w-full bg-structural-white transition-opacity duration-200"></span>
<span class="block h-[3px] w-full bg-structural-white transition-transform duration-200"></span>
</button>
</div>
<nav aria-label="Mobile navigation" class="hidden absolute top-full left-0 w-full bg-charcoal-black border-t-2 border-safety-yellow flex-col px-6 pt-2 pb-8" id="mobile-nav">${mobileNavLinks}
</nav>
</header>`;

const extraCss = `
        /* Mobile nav + scrolled header (JEF pattern) */
        header { transition: background-color 0.25s ease; }
        .header-scrolled,
        body.nav-open header { background: rgba(16, 22, 28, 0.97); }
        #mobile-nav.flex { display: flex; }
        #menu-btn.menu-open span:nth-child(1) { transform: translateY(9.5px) rotate(45deg); }
        #menu-btn.menu-open span:nth-child(2) { opacity: 0; }
        #menu-btn.menu-open span:nth-child(3) { transform: translateY(-9.5px) rotate(-45deg); }
    </style>`;

const navScript = `<script>
(function () {
    var btn = document.getElementById('menu-btn');
    var nav = document.getElementById('mobile-nav');
    var header = document.querySelector('header');
    function closeNav() {
        nav.classList.add('hidden');
        nav.classList.remove('flex');
        btn.classList.remove('menu-open');
        btn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
    }
    if (btn && nav) {
        btn.addEventListener('click', function () {
            if (nav.classList.contains('hidden')) {
                nav.classList.remove('hidden');
                nav.classList.add('flex');
                btn.classList.add('menu-open');
                btn.setAttribute('aria-expanded', 'true');
                document.body.classList.add('nav-open');
            } else {
                closeNav();
            }
        });
        nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    }
    if (header) {
        var onScroll = function () {
            if (window.scrollY > 8) header.classList.add('header-scrolled');
            else header.classList.remove('header-scrolled');
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }
})();
</script>
</body>`;

for (const page of pages) {
    const file = path.join(__dirname, page);
    let html = fs.readFileSync(file, 'utf8');
    const before = html;

    // 1. Fluid typography tokens
    html = html
        .replace('"stats-number": ["56px",', '"stats-number": ["clamp(40px, 3vw + 28px, 56px)",')
        .replace('"display-lg": ["72px",', '"display-lg": ["clamp(38px, 6vw + 16px, 72px)",')
        .replace('"headline-md": ["32px",', '"headline-md": ["clamp(24px, 1.5vw + 18px, 32px)",')
        .replace('"headline-lg": ["48px",', '"headline-lg": ["clamp(30px, 2.5vw + 20px, 48px)",')
        .replace('"headline-sm": ["24px",', '"headline-sm": ["clamp(19px, 1vw + 15px, 24px)",');

    // 2. Fluid spacing tokens
    html = html
        .replace('"margin-desktop": "64px"', '"margin-desktop": "clamp(20px, 5vw, 64px)"')
        .replace('"section-gap": "120px"', '"section-gap": "clamp(64px, 9vw, 120px)"');

    // 3. Header: wrap CTA with hamburger + append mobile nav panel
    const ctaRe = /(<a class="bg-safety-yellow text-structural-white px-6 py-2 [^"]*" href="index\.html#contact">\s*FREE QUOTE\s*<\/a>)\s*<\/header>/;
    if (!ctaRe.test(html)) throw new Error(page + ': header CTA pattern not found');
    html = html.replace(ctaRe, (_, cta) => headerActions(cta.replace('px-6 py-2', 'px-4 sm:px-6 py-2')));

    // 4. Extra CSS
    if (!html.includes('.header-scrolled')) {
        html = html.replace(/^\s*<\/style>/m, extraCss);
    }

    // 5. Remove fixed bottom mobile nav bar
    html = html.replace(/(<!-- Bottom Nav[^>]*-->\s*)?<(div|nav) class="md:hidden fixed bottom-0[\s\S]*?<\/\2>\s*/, '');

    // 6. Nav toggle + scrolled header script
    if (!html.includes("getElementById('menu-btn')")) {
        html = html.replace(/<\/body>/, navScript);
    }

    fs.writeFileSync(file, html);
    console.log(page, before === html ? 'NO CHANGES (!)' : 'updated');
}

// Page-specific fixes
let idx = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
idx = idx.replace('class="bg-background text-on-background font-body-md selection:bg-safety-yellow selection:text-structural-white"',
    'class="bg-background text-on-background font-body-md overflow-x-hidden selection:bg-safety-yellow selection:text-structural-white"');
idx = idx.replaceAll('class="group p-12 border-', 'class="group p-8 md:p-12 border-');
idx = idx.replace('border-2 border-charcoal-black p-12 brutalist-shadow" id="contact-form"',
    'border-2 border-charcoal-black p-6 sm:p-12 brutalist-shadow" id="contact-form"');
fs.writeFileSync(path.join(__dirname, 'index.html'), idx);
console.log('index.html page-specific fixes applied');

let work = fs.readFileSync(path.join(__dirname, 'our_work.html'), 'utf8');
work = work.replace('src="images\\logo.png"', 'src="images/logo.png"');
fs.writeFileSync(path.join(__dirname, 'our_work.html'), work);
console.log('our_work.html logo path fixed');
