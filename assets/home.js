// Dynamic homepage project grid.
// The list of projects is NOT hard-coded in index.html: it is discovered at
// runtime by reading sitemap.xml (same origin, no API) and collecting every
// /projects/<slug>/ entry. Each card is then built from that folder's
// content.<lang>.md frontmatter. Adding a new project means creating the
// projects/<slug>/ folder and adding its <url> entry to sitemap.xml.
(function () {
    const SITEMAP = '/sitemap.xml';

    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const STRINGS = {
        it: {
            details: 'Dettagli',
            download: 'Scarica',
            github: 'GitHub',
            visit: 'Visita il Sito',
            techs: 'Tecnologie utilizzate',
            detailsAria: (t) => 'Dettagli progetto ' + t,
            downloadAria: (t) => 'Scarica ' + t + ' da GitHub',
            githubAria: (t) => t + ' su GitHub',
            visitAria: (t) => 'Visita il sito di ' + t,
            error: 'Impossibile caricare l’elenco dei progetti.'
        },
        en: {
            details: 'Details',
            download: 'Download',
            github: 'GitHub',
            visit: 'Visit the Site',
            techs: 'Technologies used',
            detailsAria: (t) => t + ' project details',
            downloadAria: (t) => 'Download ' + t + ' from GitHub',
            githubAria: (t) => t + ' on GitHub',
            visitAria: (t) => 'Visit the ' + t + ' website',
            error: 'Unable to load the project list.'
        }
    };

    function parseFrontmatter(text) {
        const meta = {};
        const m = text.match(/^---\s*\n([\s\S]*?)\n---/);
        if (m) {
            m[1].split('\n').forEach((line) => {
                const idx = line.indexOf(':');
                if (idx === -1) return;
                const key = line.slice(0, idx).trim();
                let val = line.slice(idx + 1).trim();
                if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
                meta[key] = val;
            });
        }
        return meta;
    }

    let slugCache = null;

    function listProjectSlugs() {
        if (slugCache) return Promise.resolve(slugCache);
        return fetch(SITEMAP)
            .then((r) => {
                if (!r.ok) throw new Error('sitemap ' + r.status);
                return r.text();
            })
            .then((xml) => {
                const doc = new DOMParser().parseFromString(xml, 'application/xml');
                const slugs = [];
                Array.from(doc.getElementsByTagName('loc')).forEach((loc) => {
                    const m = (loc.textContent || '').trim().match(/\/projects\/([^/]+)\/?$/);
                    if (m && slugs.indexOf(m[1]) === -1) slugs.push(m[1]);
                });
                slugCache = slugs;
                return slugs;
            });
    }

    function loadMeta(slug, lang) {
        const fetchLang = (l) => fetch('projects/' + slug + '/content.' + l + '.md').then((r) => {
            if (!r.ok) throw new Error('missing');
            return r.text();
        });
        return fetchLang(lang)
            .catch(() => fetchLang('it'))
            .then((text) => {
                const meta = parseFrontmatter(text);
                if (!meta.slug) meta.slug = slug;
                return meta;
            })
            .catch(() => null);
    }

    function link(href, cls, text, aria) {
        const a = document.createElement('a');
        a.href = href;
        a.className = cls;
        a.textContent = text;
        if (aria) a.setAttribute('aria-label', aria);
        return a;
    }

    function buildCard(meta, lang) {
        const S = STRINGS[lang] || STRINGS.it;
        const slug = meta.slug;
        const title = meta.title || slug;

        const article = document.createElement('article');
        article.className = 'project-card';
        article.setAttribute('aria-labelledby', 'project-' + slug + '-title');

        const h2 = document.createElement('h2');
        h2.id = 'project-' + slug + '-title';
        h2.textContent = title;
        article.appendChild(h2);

        const p = document.createElement('p');
        p.textContent = meta.description || '';
        article.appendChild(p);

        const tags = document.createElement('div');
        tags.className = 'tags';
        tags.setAttribute('aria-label', S.techs);
        (meta.tags || '').split(',').map((t) => t.trim()).filter(Boolean).forEach((t) => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = t;
            tags.appendChild(span);
        });
        article.appendChild(tags);

        const actions = document.createElement('div');
        actions.className = 'card-actions';
        actions.appendChild(
            link('projects/' + slug + '/index.html', 'btn-details', S.details, S.detailsAria(title))
        );

        // Secondary button: a live site if the project has one, otherwise a
        // release download, otherwise a plain "GitHub" button to the repo.
        const isRelease = meta.download && /releases/.test(meta.download);
        let href, label, aria;
        if (meta.demo) {
            href = meta.demo; label = S.visit; aria = S.visitAria(title);
        } else if (isRelease) {
            href = meta.download; label = S.download; aria = S.downloadAria(title);
        } else if (meta.repo) {
            href = meta.repo; label = S.github; aria = S.githubAria(title);
        }
        if (href) {
            const a = link(href, 'btn-download', label, aria);
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            actions.appendChild(a);
        }
        article.appendChild(actions);

        return article;
    }

    function orderOf(meta) {
        const n = parseFloat(meta.order);
        return isNaN(n) ? Infinity : n;
    }

    function render(lang) {
        listProjectSlugs()
            .then((slugs) => Promise.all(slugs.map((s) => loadMeta(s, lang))))
            .then((metas) => {
                metas = metas.filter(Boolean).sort((a, b) => {
                    const diff = orderOf(a) - orderOf(b);
                    if (diff !== 0) return diff;
                    return (a.title || '').localeCompare(b.title || '');
                });
                grid.innerHTML = '';
                metas.forEach((m) => grid.appendChild(buildCard(m, lang)));
            })
            .catch((err) => {
                console.error(err);
                const S = STRINGS[lang] || STRINGS.it;
                grid.innerHTML = '<p style="color:#999;text-align:center;">' + S.error + '</p>';
            });
    }

    if (window.I18N) {
        I18N.onChange(render);
        render(I18N.get());
    } else {
        render('it');
    }
})();
