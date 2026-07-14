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
            noResults: 'Nessun progetto trovato.',
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
            noResults: 'No projects found.',
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

    function buildHaystack(meta) {
        return [meta.title, meta.subtitle, meta.description, meta.tags, meta.language]
            .filter(Boolean).join(' ');
    }

    // Live fuzzy search over the rendered cards.
    let cards = [];          // [{ el, haystack }] in original (sorted) order
    let currentQuery = '';
    let currentLang = 'it';
    let noResultsEl = null;

    function ensureNoResults() {
        if (!noResultsEl) {
            noResultsEl = document.createElement('p');
            noResultsEl.className = 'no-results';
            noResultsEl.style.display = 'none';
            grid.parentNode.insertBefore(noResultsEl, grid.nextSibling);
        }
        return noResultsEl;
    }

    function applyFilter(q) {
        const S = STRINGS[currentLang] || STRINGS.it;
        const nr = ensureNoResults();

        if (!q) {
            // Restore the original order and show everything.
            cards.forEach((c) => { c.el.style.display = ''; grid.appendChild(c.el); });
            nr.style.display = 'none';
            return;
        }

        const MAX_RESULTS = 3;
        let matches;
        if (window.fuzzy && fuzzy.filter) {
            // Fuzzy matching is subsequence-based, so on long haystacks almost
            // everything matches weakly. Rank by score, drop matches far below
            // the best one (removes noise while keeping ranking + typo
            // tolerance), then show at most the top few.
            const ranked = fuzzy.filter(q, cards, { extract: (c) => c.haystack })
                .sort((a, b) => b.score - a.score);
            const best = ranked.length ? ranked[0].score : 0;
            matches = ranked
                .filter((r) => r.score >= best * 0.5)
                .slice(0, MAX_RESULTS)
                .map((r) => r.original);
        } else {
            const ql = q.toLowerCase();
            matches = cards
                .filter((c) => c.haystack.toLowerCase().indexOf(ql) !== -1)
                .slice(0, MAX_RESULTS);
        }

        cards.forEach((c) => { c.el.style.display = 'none'; });
        if (matches.length === 0) {
            nr.textContent = S.noResults;
            nr.style.display = '';
        } else {
            nr.style.display = 'none';
            matches.forEach((c) => { c.el.style.display = ''; grid.appendChild(c.el); });
        }
    }

    function render(lang) {
        currentLang = lang;
        listProjectSlugs()
            .then((slugs) => Promise.all(slugs.map((s) => loadMeta(s, lang))))
            .then((metas) => {
                metas = metas.filter(Boolean).sort((a, b) => {
                    const diff = orderOf(a) - orderOf(b);
                    if (diff !== 0) return diff;
                    return (a.title || '').localeCompare(b.title || '');
                });
                grid.innerHTML = '';
                cards = metas.map((m) => {
                    const el = buildCard(m, lang);
                    grid.appendChild(el);
                    return { el: el, haystack: buildHaystack(m) };
                });
                applyFilter(currentQuery);
            })
            .catch((err) => {
                console.error(err);
                const S = STRINGS[lang] || STRINGS.it;
                grid.innerHTML = '<p style="color:#999;text-align:center;">' + S.error + '</p>';
            });
    }

    const searchInput = document.getElementById('project-search');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            currentQuery = searchInput.value.trim();
            applyFilter(currentQuery);
        });
    }

    if (window.I18N) {
        I18N.onChange(render);
        render(I18N.get());
    } else {
        render('it');
    }
})();
