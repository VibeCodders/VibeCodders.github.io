// Shared renderer for project pages.
// Loads ./content.<lang>.md, parses its YAML-like frontmatter and Markdown
// body, then populates the shared page boilerplate (head meta, header,
// buttons, content and footer). Keeping the content in Markdown means each
// project page reuses the same HTML/CSS/JS shell, and switching language
// simply re-fetches the matching content file.
(function () {
    const $ = (id) => document.getElementById(id);
    const SITE = 'https://VibeCodders.github.io';

    const STRINGS = {
        it: {
            view: 'Visualizza su GitHub',
            download: "⬇️ Scarica l'ultima versione",
            footerRepo: (t) => t + ' su GitHub',
            error: 'Impossibile caricare il contenuto del progetto.'
        },
        en: {
            view: 'View on GitHub',
            download: '⬇️ Download latest release',
            footerRepo: (t) => t + ' on GitHub',
            error: 'Unable to load project content.'
        }
    };

    function parseFrontmatter(text) {
        const meta = {};
        let body = text;
        const m = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
        if (m) {
            body = m[2];
            m[1].split('\n').forEach((line) => {
                const idx = line.indexOf(':');
                if (idx === -1) return;
                const key = line.slice(0, idx).trim();
                let val = line.slice(idx + 1).trim();
                if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
                meta[key] = val;
            });
        }
        return { meta, body };
    }

    function setMeta(name, content, attr) {
        if (!content) return;
        attr = attr || 'name';
        let el = document.head.querySelector('meta[' + attr + '="' + name + '"]');
        if (!el) {
            el = document.createElement('meta');
            el.setAttribute(attr, name);
            document.head.appendChild(el);
        }
        el.setAttribute('content', content);
    }

    function setCanonical(href) {
        let el = document.head.querySelector('link[rel="canonical"]');
        if (!el) {
            el = document.createElement('link');
            el.setAttribute('rel', 'canonical');
            document.head.appendChild(el);
        }
        el.setAttribute('href', href);
    }

    function render(meta, body, lang) {
        const S = STRINGS[lang] || STRINGS.it;
        const title = meta.title || 'Progetto';
        const fullTitle = title + ' - VibeCodders';
        const url = SITE + '/projects/' + (meta.slug || '') + '/';

        // Head metadata
        document.title = fullTitle;
        setMeta('description', meta.description);
        setMeta('keywords', meta.keywords);
        setCanonical(url);
        setMeta('og:type', 'website', 'property');
        setMeta('og:url', url, 'property');
        setMeta('og:title', fullTitle, 'property');
        setMeta('og:description', meta.description, 'property');
        setMeta('og:image', SITE + '/og-image.png', 'property');
        setMeta('og:locale', lang === 'it' ? 'it_IT' : 'en_US', 'property');
        setMeta('og:site_name', 'VibeCodders', 'property');
        setMeta('twitter:card', 'summary_large_image');
        setMeta('twitter:title', fullTitle);
        setMeta('twitter:description', meta.description);
        setMeta('twitter:image', SITE + '/og-image.png');

        // Structured data (replaced on each render)
        const ld = {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: title,
            applicationCategory: 'DeveloperApplication',
            description: meta.description,
            author: { '@type': 'Organization', name: 'VibeCodders', url: SITE },
            url: url,
            codeRepository: meta.repo,
            downloadUrl: meta.download || meta.repo
        };
        if (meta.language) ld.programmingLanguage = meta.language;
        if (meta.os) ld.operatingSystem = meta.os;
        let ldScript = document.getElementById('project-ld');
        if (!ldScript) {
            ldScript = document.createElement('script');
            ldScript.id = 'project-ld';
            ldScript.type = 'application/ld+json';
            document.head.appendChild(ldScript);
        }
        ldScript.textContent = JSON.stringify(ld);

        // Header
        $('project-title').textContent = title;
        $('project-subtitle').textContent = meta.subtitle || '';
        const tagsEl = $('project-tags');
        tagsEl.innerHTML = '';
        (meta.tags || '').split(',').map((t) => t.trim()).filter(Boolean).forEach((t) => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = t;
            tagsEl.appendChild(span);
        });

        // Content (Markdown body)
        const contentEl = $('project-content');
        marked.setOptions({ gfm: true, breaks: false });
        contentEl.innerHTML = marked.parse(body);

        // Action buttons, inserted right after the intro paragraph
        if (meta.repo || meta.download) {
            const group = document.createElement('div');
            group.className = 'btn-group';
            if (meta.repo) {
                const a = document.createElement('a');
                a.href = meta.repo;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.className = 'btn';
                a.textContent = S.view;
                group.appendChild(a);
            }
            if (meta.download) {
                const a = document.createElement('a');
                a.href = meta.download;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.className = 'btn btn-secondary';
                a.textContent = meta.downloadLabel || S.download;
                group.appendChild(a);
            }
            const firstP = contentEl.querySelector('p');
            if (firstP) firstP.after(group);
            else contentEl.insertBefore(group, contentEl.firstChild);
        }

        // Footer
        const footer = $('project-footer');
        footer.innerHTML = '';
        if (meta.repo) {
            const a = document.createElement('a');
            a.href = meta.repo;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = S.footerRepo(title);
            footer.appendChild(document.createTextNode('VibeCodders - '));
            footer.appendChild(a);
        } else {
            footer.textContent = 'VibeCodders';
        }
    }

    function load(lang) {
        return fetch('content.' + lang + '.md')
            .then((r) => {
                if (!r.ok) throw new Error('content.' + lang + '.md not found');
                return r.text();
            })
            .then((text) => {
                const parsed = parseFrontmatter(text);
                render(parsed.meta, parsed.body, lang);
            })
            .catch((err) => {
                console.error(err);
                const S = STRINGS[lang] || STRINGS.it;
                $('project-content').innerHTML = '<p>' + S.error + '</p>';
            });
    }

    if (window.I18N) {
        I18N.onChange(load);
        load(I18N.get());
    } else {
        load('it');
    }
})();
