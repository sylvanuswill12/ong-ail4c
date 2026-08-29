// ============================================================
// ONG-AIL4C — moteur de rendu partagé
// renderApp(data)  -> construit tout le HTML à partir de content.json
// initInteractions() -> branche le menu, le compteur, les formulaires
// ============================================================
window.AIL4C = (function(){

  const ACTION_ICONS = [
    '<path d="M12 3C7 8 5 13 12 21C19 13 17 8 12 3Z"/>',
    '<path d="M12 21s-7-4.5-9-9c-1.4-3 .5-6 3.5-6 2 0 3.3 1.1 5.5 3.4C14.2 6.1 15.5 5 17.5 5c3 0 4.9 3 3.5 6-2 4.5-9 9-9 9Z"/>',
    '<path d="M4 5h11l4 4v10H4V5Z"/><path d="M8 12h7M8 15h5"/>',
    '<path d="M3 6a2 2 0 0 1 2-2h6v16H5a2 2 0 0 1-2-2V6Z"/><path d="M21 6a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 0 2-2V6Z"/>',
    '<rect x="3" y="8" width="18" height="12" rx="1.5"/><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'
  ];

  function esc(str){
    if(str === undefined || str === null) return '';
    return String(str)
      .replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  }
  function img(data, key){
    return (data.images && data.images[key]) ? data.images[key] : '';
  }
  function icon(svgInner, cls){
    return `<svg class="${cls||'icon'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">${svgInner}</svg>`;
  }

  function renderApp(data){
    const d = data;
    return `
<div class="scrim" id="scrim"></div>

<header class="topbar">
  <a href="#accueil" class="brand">
    <img src="${img(d,'logo')}" alt="Logo ONG-AIL4C">
    <span>ONG-AIL4C<small>Bouaké · Côte d'Ivoire</small></span>
  </a>
  <button class="menu-btn" id="menuBtn" aria-label="Ouvrir le menu"><span></span><span></span><span></span></button>
</header>

<nav class="sidenav" id="sidenav" aria-label="Navigation principale">
  <div class="sidenav-head">
    <strong class="mono" style="letter-spacing:.1em;font-size:.8rem;">MENU</strong>
    <button class="close-btn" id="closeBtn" aria-label="Fermer le menu">&times;</button>
  </div>
  <a href="#accueil" class="nav-link"><span class="n">01</span> Accueil</a>
  <a href="#apropos" class="nav-link"><span class="n">02</span> À propos</a>
  <a href="#actions" class="nav-link"><span class="n">03</span> Nos domaines d'action</a>
  <a href="#projets" class="nav-link"><span class="n">04</span> Projets &amp; campagnes</a>
  <a href="#actualites" class="nav-link"><span class="n">05</span> Actualités</a>
  <a href="#galerie" class="nav-link"><span class="n">06</span> Galerie</a>
  <a href="#partenaires" class="nav-link"><span class="n">07</span> Partenaires</a>
  <a href="#don" class="nav-link"><span class="n">08</span> Faire un don</a>
  <a href="#benevolat" class="nav-link"><span class="n">09</span> Devenir bénévole</a>
  <a href="#contact" class="nav-link"><span class="n">10</span> Contact</a>
  <a href="#don" class="cta nav-link">Soutenir AIL4C</a>
</nav>

<section class="hero" id="accueil">
  <div class="wrap">
    <p class="eyebrow">${esc(d.hero.eyebrow)}</p>
    <h1>${esc(d.hero.title)}</h1>
    <p class="lede">${esc(d.hero.lede)}</p>
    <div class="hero-actions">
      <a href="#don" class="btn btn-gold">Faire un don</a>
      <a href="#benevolat" class="btn btn-outline">Devenir bénévole</a>
    </div>
    <div class="badge-phone">
      ${d.hero.phones.map(p => `<span>☎ ${esc(p)}</span>`).join('')}
      <span>✉ ${esc(d.hero.email)}</span>
    </div>
  </div>
  <img class="hero-photo" src="${img(d,d.hero.heroImage)}" alt="Équipe de bénévoles ONG-AIL4C sur le terrain">
</section>

<div class="kita"></div>

<section class="stats">
  <div class="wrap stats-grid">
    ${d.stats.map(s => `
    <div>
      <div class="stat-num" data-count="${s.count}">0</div>
      <div class="stat-label">${esc(s.label)}</div>
    </div>`).join('')}
  </div>
</section>

<section class="section" id="apropos">
  <div class="wrap about-grid">
    <div>
      <p class="eyebrow">À propos</p>
      <h2>Une organisation de terrain, née à Bouaké</h2>
      <p class="lede">${esc(d.about.lede)}</p>
      <p>${esc(d.about.text)}</p>
      <div class="value-list" style="margin-top:24px;">
        <li><div><strong>Président</strong><span>${esc(d.about.president)}</span></div></li>
        <li><div><strong>Contact</strong><span>${esc(d.about.contactLine)}</span></div></li>
      </div>
    </div>
    <div>
      <div class="about-photo"><img src="${img(d,d.about.image)}" alt="Équipe ONG-AIL4C en briefing terrain"></div>
      <ul class="value-list">
        ${d.about.values.map(v => `
        <li><div><strong>${esc(v.title)}</strong><span>${esc(v.text)}</span></div></li>`).join('')}
      </ul>
    </div>
  </div>
</section>

<section class="section section-alt" id="actions">
  <div class="wrap">
    <p class="eyebrow">Nos domaines d'action</p>
    <h2>Cinq axes d'intervention, une seule dynamique de terrain</h2>
    <div class="cards">
      ${d.actions.map((a,i) => `
      <div class="card">
        ${icon(ACTION_ICONS[i % ACTION_ICONS.length])}
        <h3>${esc(a.title)}</h3>
        <p>${esc(a.text)}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="section" id="projets">
  <div class="wrap">
    <p class="eyebrow">Projets &amp; campagnes</p>
    <h2>Sur le terrain, à Bouaké</h2>
    <div class="timeline">
      ${d.projects.map(p => `
      <div class="t-item">
        <span class="t-date">${esc(p.date)}</span>
        <h3>${esc(p.title)}</h3>
        ${p.image ? `<div class="t-photo"><img src="${img(d,p.image)}" alt="${esc(p.title)}"></div>` : ''}
        <p>${esc(p.text)}</p>
        ${(p.tags||[]).map((t,i) => `<span class="tag ${i===0?'':'tag-alt'}">${esc(t)}</span>`).join('')}
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="section section-alt" id="actualites">
  <div class="wrap">
    <p class="eyebrow">Actualités</p>
    <h2>Ce qui se passe sur le terrain</h2>
    <div class="news-grid">
      ${d.news.map(n => `
      <div class="news-card">
        <div class="news-thumb"><img src="${img(d,n.image)}" alt="${esc(n.title)}"></div>
        <div class="news-body">
          <span class="news-date">${esc(n.date)}</span>
          <h3>${esc(n.title)}</h3>
          <p>${esc(n.text)}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="section" id="galerie">
  <div class="wrap">
    <p class="eyebrow">Galerie</p>
    <h2>Photos de nos actions</h2>
    <div class="gallery">
      ${d.gallery.map(g => `
      <div class="g-item ${g.tall ? 'tall':''}"><img src="${img(d,g.image)}" alt="${esc(g.caption)}"><span class="g-caption">${esc(g.caption)}</span></div>`).join('')}
    </div>
  </div>
</section>

<section class="section section-alt" id="partenaires">
  <div class="wrap">
    <p class="eyebrow">Partenaires</p>
    <h2>Ils marchent avec nous</h2>
    <div class="partners-row">
      ${d.partners.map(p => `<div class="partner-chip"><span class="dot"></span> ${esc(p)}</div>`).join('')}
      <div class="partner-chip" style="opacity:.55;"><span class="dot" style="background:var(--line);"></span> Votre logo ici</div>
    </div>
  </div>
</section>

<section class="section" id="don">
  <div class="wrap">
    <div class="give">
      <p class="eyebrow">Faire un don</p>
      <h2>Chaque contribution renforce notre action à Bouaké</h2>
      <p style="opacity:.85;">${esc(d.give.text)}</p>
      <div class="give-grid">
        ${d.give.options.map(o => `
        <div class="give-opt"><h4>${esc(o.title)}</h4><p>${esc(o.text)}</p></div>`).join('')}
      </div>
      <div class="hero-actions" style="margin-top:30px;">
        <a href="#contact" class="btn btn-gold">Nous contacter pour donner</a>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt" id="benevolat">
  <div class="wrap">
    <p class="eyebrow">Devenir bénévole</p>
    <h2>Rejoignez l'équipe de terrain</h2>
    <p class="lede">Vous voulez agir concrètement pour le climat et la jeunesse de Bouaké ? Remplissez ce formulaire, notre équipe vous recontactera.</p>
    <form id="volunteerForm" style="max-width:760px;">
      <div class="form-grid">
        <div class="field"><label for="v-nom">Nom et prénoms</label><input id="v-nom" required placeholder="Kouassi Aya"></div>
        <div class="field"><label for="v-tel">Téléphone</label><input id="v-tel" required placeholder="07 00 00 00 00"></div>
        <div class="field"><label for="v-email">Email</label><input id="v-email" type="email" required placeholder="vous@exemple.com"></div>
        <div class="field"><label for="v-ville">Ville</label><input id="v-ville" required placeholder="Bouaké"></div>
        <div class="field full"><label for="v-comp">Compétences</label><input id="v-comp" placeholder="Communication, logistique, animation..."></div>
        <div class="field full"><label for="v-dispo">Disponibilité</label>
          <select id="v-dispo">
            <option>Week-ends</option>
            <option>Soirées en semaine</option>
            <option>Temps plein ponctuel</option>
            <option>Flexible</option>
          </select>
        </div>
        <div class="field full"><label for="v-motiv">Motivation</label><textarea id="v-motiv" placeholder="Pourquoi souhaitez-vous rejoindre ONG-AIL4C ?"></textarea></div>
      </div>
      <button type="submit" class="btn btn-clay">Envoyer ma candidature</button>
      <p class="form-note">Formulaire prêt côté design — à connecter à un service d'envoi (email, Google Sheets ou back-office) pour recevoir les candidatures.</p>
      <div class="toast" id="volunteerToast">Merci ! Votre candidature a été enregistrée localement pour cette démonstration.</div>
    </form>
  </div>
</section>

<section class="section" id="contact">
  <div class="wrap contact-grid">
    <div>
      <p class="eyebrow">Contact</p>
      <h2>Parlons-en</h2>
      <div class="contact-info-item">
        ${icon('<path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/>','ic')}
        <div><strong>Adresse</strong>${esc(d.contact.address)}</div>
      </div>
      <div class="contact-info-item">
        ${icon('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L7.9 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.1 2Z"/>','ic')}
        <div><strong>Téléphone</strong>${d.contact.phones.map(esc).join('<br>')}</div>
      </div>
      <div class="contact-info-item">
        ${icon('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>','ic')}
        <div><strong>Email</strong>${esc(d.contact.email)}</div>
      </div>
      <div class="contact-info-item">
        ${icon('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>','ic')}
        <div><strong>Président</strong>${esc(d.contact.president)}</div>
      </div>
      <div class="social-row">
        <a href="#" aria-label="Facebook">f</a>
        <a href="#" aria-label="LinkedIn">in</a>
        <a href="https://wa.me/${esc(d.contact.whatsapp)}" aria-label="WhatsApp">wa</a>
      </div>
    </div>
    <div>
      <div class="map-placeholder">Carte Google Maps interactive à intégrer ici<br>(position de Bouaké, siège ONG-AIL4C)</div>
      <form id="contactForm" style="margin-top:22px;">
        <div class="field"><label for="c-nom">Nom</label><input id="c-nom" required></div>
        <div class="field"><label for="c-msg">Message</label><textarea id="c-msg" required></textarea></div>
        <button type="submit" class="btn btn-clay">Envoyer le message</button>
        <div class="toast" id="contactToast">Merci pour votre message — enregistré localement pour cette démonstration.</div>
      </form>
    </div>
  </div>
</section>

<footer>
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <h4>ONG-AIL4C</h4>
        <p style="opacity:.8; font-size:.88rem; max-width:38ch;">Association Ivoirienne de Lutte Contre le Changement Climatique et le Chômage — Bouaké, Côte d'Ivoire.<br>${esc(d.footer.tagline)}</p>
      </div>
      <div>
        <h4>Navigation</h4>
        <a href="#apropos">À propos</a>
        <a href="#actions">Nos actions</a>
        <a href="#projets">Projets</a>
        <a href="#contact">Contact</a>
      </div>
      <div>
        <h4>Agir</h4>
        <a href="#don">Faire un don</a>
        <a href="#benevolat">Devenir bénévole</a>
        <a href="#">Mentions légales</a>
        <a href="#">Politique de confidentialité</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 ONG-AIL4C — Tous droits réservés.</span>
      <a href="#accueil" class="to-top">↑ Haut de page</a>
    </div>
  </div>
</footer>
`;
  }

  function initInteractions(root){
    root = root || document;
    const menuBtn = root.getElementById('menuBtn');
    const closeBtn = root.getElementById('closeBtn');
    const sidenav = root.getElementById('sidenav');
    const scrim = root.getElementById('scrim');
    const links = root.querySelectorAll('.nav-link');

    function openNav(){ sidenav.classList.add('open'); scrim.classList.add('show'); }
    function closeNav(){ sidenav.classList.remove('open'); scrim.classList.remove('show'); }
    if(menuBtn) menuBtn.addEventListener('click', openNav);
    if(closeBtn) closeBtn.addEventListener('click', closeNav);
    if(scrim) scrim.addEventListener('click', closeNav);
    links.forEach(l => l.addEventListener('click', closeNav));

    const stats = root.querySelectorAll('.stat-num');
    const win = root.defaultView || window;
    const statObserver = new win.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          let current = 0;
          const step = Math.max(1, Math.round(target / 30));
          const tick = () => {
            current = Math.min(target, current + step);
            el.textContent = current;
            if(current < target) win.requestAnimationFrame(tick);
          };
          tick();
          statObserver.unobserve(el);
        }
      });
    }, {threshold:.5});
    stats.forEach(s => statObserver.observe(s));

    function handleDemoForm(formId, toastId){
      const form = root.getElementById(formId);
      const toast = root.getElementById(toastId);
      if(!form) return;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        toast.classList.add('show');
        form.reset();
        setTimeout(() => toast.classList.remove('show'), 5000);
      });
    }
    handleDemoForm('volunteerForm', 'volunteerToast');
    handleDemoForm('contactForm', 'contactToast');
  }

  return { renderApp, initInteractions };
})();
