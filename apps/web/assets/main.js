(function () {
  const data = window.siteData;
  const page = document.body.dataset.page || "home";

  const navLinks = [
    { key: "home", label: "Home", href: "index.html" },
    { key: "about", label: "About", href: "about.html" },
    { key: "departments", label: "Departments", href: "departments.html" },
    { key: "gallery", label: "Gallery", href: "gallery.html" },
    { key: "staff", label: "Staff", href: "staff.html" },
    { key: "executives", label: "Executives", href: "executives.html" },
    { key: "contact", label: "Contact", href: "contact.html" },
  ];

  const pageRoot = document.getElementById("page-content");
  const headerRoot = document.getElementById("site-header");
  const footerRoot = document.getElementById("site-footer");

  headerRoot.innerHTML = renderHeader();
  footerRoot.innerHTML = renderFooter();
  pageRoot.innerHTML = renderPage(page);

  bindNavigation();
  initPage(page);

  function renderHeader() {
    return `
      <div class="utility-bar">
        <div class="container utility-bar__inner">
          <span>Delta State University, Abraka - College of Health Sciences</span>
          <div class="utility-bar__meta">
            <span>${data.site.admissionsEmail}</span>
            <span>${data.site.phone}</span>
          </div>
        </div>
      </div>
      <nav class="site-nav">
        <div class="container site-nav__inner">
          <a class="brand brand--header" href="index.html">
            ${renderBrandMark("header")}
            <span class="brand__text">
              <span class="brand__name">${data.site.name}</span>
              <span class="brand__sub">${data.site.university}</span>
            </span>
          </a>
          <div class="nav-links">
            ${navLinks
              .map(
                (link) => `
                  <a class="nav-link${link.key === page ? " is-active" : ""}" href="${link.href}">
                    ${link.label}
                  </a>
                `
              )
              .join("")}
            <a class="button nav-cta" href="contact.html">Apply Now <span class="button-arrow">-></span></a>
          </div>
          <button class="nav-toggle" type="button" aria-label="Toggle menu" data-menu-toggle>
            <span class="nav-toggle__bars"></span>
          </button>
        </div>
        <div class="mobile-menu" data-mobile-menu>
          <div class="container">
            <div class="mobile-menu__links">
              ${navLinks
                .map(
                  (link) => `
                    <a class="mobile-link${link.key === page ? " is-active" : ""}" href="${link.href}">
                      ${link.label}
                    </a>
                  `
                )
                .join("")}
            </div>
            <a class="button" href="contact.html">Apply Now <span class="button-arrow">-></span></a>
          </div>
        </div>
      </nav>
    `;
  }

  function renderFooter() {
    const departmentLinks = [
      "Anatomy",
      "Physiology",
      "Biochemistry",
      "Pharmacology",
      "Microbiology & Parasitology",
      "Haematology",
    ];

    return `
      <footer class="footer">
        <div class="container">
          <div class="footer__top">
            <div>
              <div class="brand brand--footer">
                ${renderBrandMark("footer")}
                <span class="brand__text">
                  <span class="brand__name">${data.site.name}</span>
                  <span class="brand__sub">${data.site.university}</span>
                </span>
              </div>
              <p class="footer__text">
                Producing world-class graduates in the basic medical sciences through excellence in teaching,
                research, and community service since 1992.
              </p>
            </div>
            <div>
              <h3 class="footer__heading">Quick Links</h3>
              <div class="footer__links">
                ${navLinks
                  .map((link) => `<a href="${link.href}">${link.label === "Home" ? "Home" : link.label}</a>`)
                  .join("")}
              </div>
            </div>
            <div>
              <h3 class="footer__heading">Departments</h3>
              <div class="footer__links">
                ${departmentLinks.map((name) => `<a href="departments.html">${name}</a>`).join("")}
              </div>
            </div>
            <div>
              <h3 class="footer__heading">Contact Us</h3>
              <div class="footer__links">
                <span>${data.site.address}</span>
                <span>${data.site.phone}</span>
                <span>${data.site.email}</span>
              </div>
            </div>
          </div>
          <div class="footer__bottom">
            <p>&copy; 2026 ${data.site.name}, ${data.site.university}. All rights reserved.</p>
            <div class="social-links">
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  function renderBrandMark(context) {
    const markVariant = context ? " brand__mark--" + context : "";

    if (data.site.logoUrl) {
      return `
        <span class="brand__mark${markVariant} brand__mark--image">
          <img class="brand__logo" src="${data.site.logoUrl}" alt="${data.site.logoAlt || data.site.university}" />
        </span>
      `;
    }

    return `<span class="brand__mark${markVariant}">FB</span>`;
  }

  function renderPage(currentPage) {
    switch (currentPage) {
      case "about":
        return renderAboutPage();
      case "departments":
        return renderDepartmentsPage();
      case "gallery":
        return renderGalleryPage();
      case "staff":
        return renderStaffPage();
      case "executives":
        return renderExecutivesPage();
      case "contact":
        return renderContactPage();
      case "home":
      default:
        return renderHomePage();
    }
  }

  function renderPageHero(eyebrow, title, description) {
    return `
      <section class="page-hero">
        <div class="container">
          <div class="page-hero__inner">
            <span class="page-hero__eyebrow">${eyebrow}</span>
            <h1 class="page-hero__title">${title}</h1>
            <p class="page-hero__text">${description}</p>
          </div>
        </div>
      </section>
    `;
  }

  function isPexelsImage(url) {
    return typeof url === "string" && url.indexOf("images.pexels.com/") !== -1;
  }

  function optimizeImageUrl(url, width, quality) {
    if (!url || !isPexelsImage(url)) {
      return url || "";
    }

    try {
      const parsed = new URL(url);
      parsed.searchParams.set("auto", "compress");
      parsed.searchParams.set("cs", "tinysrgb");
      parsed.searchParams.set("fm", "webp");
      parsed.searchParams.set("q", String(quality || 70));
      parsed.searchParams.set("w", String(width));
      parsed.searchParams.set("dpr", "1");
      return parsed.toString();
    } catch (error) {
      return url;
    }
  }

  function getResponsiveImageSource(imageLike, options) {
    const source = typeof imageLike === "string" ? { url: imageLike } : imageLike || {};
    const url = source.url || source.imageUrl || "";
    const widths = (options && options.widths) || [];
    const defaultWidth =
      (options && options.defaultWidth) || (widths.length ? widths[widths.length - 1] : 1200);
    const quality = (options && options.quality) || 70;

    return {
      src: optimizeImageUrl(url, defaultWidth, quality),
      srcset: isPexelsImage(url)
        ? widths
            .map(function (width) {
              return optimizeImageUrl(url, width, quality) + " " + width + "w";
            })
            .join(", ")
        : "",
      sizes: (options && options.sizes) || "100vw",
      alt: source.alt || source.imageAlt || "",
    };
  }

  function renderResponsiveImage(imageLike, options) {
    const config = options || {};
    const source = getResponsiveImageSource(imageLike, config);
    const className = config.className ? ` class="${config.className}"` : "";
    const alt = source.alt || config.alt || "";
    const loading = config.loading ? ` loading="${config.loading}"` : "";
    const decoding = config.decoding ? ` decoding="${config.decoding}"` : ` decoding="async"`;
    const fetchPriority = config.fetchpriority ? ` fetchpriority="${config.fetchpriority}"` : "";
    const srcset = source.srcset ? ` srcset="${source.srcset}"` : "";
    const sizes = source.srcset ? ` sizes="${source.sizes}"` : "";

    return `<img${className} src="${source.src}"${srcset}${sizes} alt="${alt}"${loading}${decoding}${fetchPriority} />`;
  }

  function renderHeroSlides() {
    const images =
      data.heroImages && data.heroImages.length
        ? data.heroImages
        : [{ url: data.heroImageUrl, alt: data.site.name + " hero image" }];

    return images
      .map(function (image, index) {
        const source = getResponsiveImageSource(image, {
          widths: [640, 960, 1280, 1600],
          defaultWidth: 1280,
          quality: 68,
          sizes: "100vw",
        });

        return `
          <div class="home-hero__slide${index === 0 ? " is-active" : ""}" data-hero-slide>
            <img
              class="home-hero__slide-image"
              alt="${source.alt || data.site.name + " hero image"}"
              ${index === 0 ? `src="${source.src}"` : `data-src="${source.src}"`}
              ${source.srcset ? (index === 0 ? `srcset="${source.srcset}"` : `data-srcset="${source.srcset}"`) : ""}
              ${source.srcset ? (index === 0 ? `sizes="${source.sizes}"` : `data-sizes="${source.sizes}"`) : ""}
              loading="${index === 0 ? "eager" : "lazy"}"
              decoding="async"
              ${index === 0 ? 'fetchpriority="high"' : ""}
            />
          </div>
        `;
      })
      .join("");
  }

  function renderHomePage() {
    return `
      <section class="home-hero">
        <div class="home-hero__media" data-hero-slider aria-hidden="true">
          ${renderHeroSlides()}
        </div>
        <div class="container home-hero__content">
          <div class="home-hero__shell">
            <span class="badge badge--hero">
              <span class="badge__dot"></span>
              Now Accepting Applications for 2026/2027
            </span>
            <h1
              class="home-hero__title js-typing"
              data-typing-order="1"
              data-typing-text="Faculty of Basic Medical Sciences"
              aria-label="Faculty of Basic Medical Sciences"
            >
              Faculty of Basic Medical Sciences
            </h1>
            <p
              class="home-hero__subtitle js-typing"
              data-typing-order="2"
              data-typing-text="College of Health Sciences, Delta State University, Abraka"
              aria-label="College of Health Sciences, Delta State University, Abraka"
            >
              College of Health Sciences, Delta State University, Abraka
            </p>
            <p class="home-hero__text">
              Producing world-class graduates through excellence in teaching, research, and community service
              across six dynamic departments.
            </p>
            <div class="button-row">
              <a class="button" href="departments.html">Explore Departments <span class="button-arrow">-></span></a>
              <a class="button-secondary" href="about.html">About the Faculty</a>
            </div>
            <div class="hero-stats">
              ${data.homeStats
                .slice(0, 3)
                .map(
                  (stat) => `
                    <article class="hero-stat">
                      <div class="hero-stat__value" data-count-value="${stat.value}">${stat.value}</div>
                      <div class="hero-stat__label">${stat.label}</div>
                      <div class="hero-stat__desc">${stat.desc}</div>
                    </article>
                  `
                )
                .join("")}
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container home-overview">
          <article class="panel-card home-overview__intro">
            <span class="badge badge--light">About the Faculty</span>
            <h2 class="section-heading">Advancing Health Through Education & Research</h2>
            <p class="section-copy">
              Established in 1992, the Faculty of Basic Medical Sciences is one of the foundational faculties within
              the College of Health Sciences at Delta State University, Abraka. We provide comprehensive training in
              the sciences that underpin clinical medicine and public health.
            </p>
            <p class="section-copy">
              Our six departments offer undergraduate and postgraduate programmes designed to prepare students for
              careers in medicine, biomedical research, diagnostic sciences, and healthcare administration.
            </p>
            <a class="button-soft" href="about.html">Read More <span class="button-arrow">-></span></a>
          </article>
          <div class="home-overview__links">
            ${data.homeQuickLinks
              .map(
                (link) => `
                  <a class="card-link card" href="${link.href}">
                    <div class="card-link__head">
                      <div>
                        <h3 class="card-link__title">${link.title}</h3>
                        <p class="card-link__desc">${link.desc}</p>
                      </div>
                      <span class="small-text">-></span>
                    </div>
                  </a>
                `
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="section section-alt">
        <div class="container">
          <div class="stats-header">
            <span class="badge badge--light">Faculty Snapshot</span>
            <h2 class="section-heading">Faculty at a Glance</h2>
            <p class="section-subtitle">Key figures that define our academic community.</p>
          </div>
          <div class="grid-four">
            ${data.homeStats
              .map(
                (stat) => `
                  <article class="stats-card card">
                    <span class="feature-icon">${stat.icon}</span>
                    <div class="stats-card__value" data-count-value="${stat.value}">${stat.value}</div>
                    <div class="stats-card__label">${stat.label}</div>
                    <p class="small-text">${stat.desc}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="news-header">
            <div>
              <span class="badge badge--light">Latest Updates</span>
              <h2 class="section-heading">Latest News & Announcements</h2>
              <p class="section-subtitle">Stay updated with the latest from the faculty.</p>
            </div>
            <a class="button-soft" href="contact.html">View All <span class="button-arrow">-></span></a>
          </div>
          <div class="news-list">
            ${data.newsItems
              .slice(0, 4)
              .map(
                (item) => `
                  <article class="news-row">
                    <div class="small-text"><strong>${item.date}</strong></div>
                    <div>
                      <div class="news-row__head">
                        <span class="chip">${item.category}</span>
                      </div>
                      <h3 class="news-row__title">${item.title}</h3>
                      <p class="news-row__text">${item.excerpt}</p>
                    </div>
                    <div class="small-text">-></div>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="section section-alt">
        <div class="container">
          <div class="news-header">
            <div>
              <span class="badge badge--light">Student Leadership</span>
              <h2 class="section-heading">Faculty Student Executives</h2>
              <p class="section-subtitle">
                Meet the student leaders coordinating welfare, communication, and academic representation for the faculty.
              </p>
            </div>
            <a class="button-soft" href="executives.html">Meet the Team <span class="button-arrow">-></span></a>
          </div>
          <div class="executives-grid executives-grid--preview">
            ${data.studentExecutives.slice(0, 3).map(renderExecutiveCard).join("")}
          </div>
        </div>
      </section>

      <section class="section cta-band">
        <div class="container">
          <h2 class="section-heading">Ready to Begin Your Journey?</h2>
          <p class="cta-band__text">
            Join over 1,400 students pursuing excellence in the basic medical sciences at Delta State University.
          </p>
          <div class="button-row">
            <a class="button" href="contact.html">Apply Now <span class="button-arrow">-></span></a>
            <a class="button-secondary" href="contact.html">Contact Us</a>
          </div>
        </div>
      </section>

      ${renderExecutiveModal()}
    `;
  }

  function renderAboutPage() {
    return `
      ${renderPageHero(
        "About Us",
        "About the Faculty",
        "Discover our history, leadership, and commitment to advancing basic medical sciences education in Nigeria."
      )}
      <section class="section">
        <div class="container grid-two">
          <div>
            <span class="badge badge--light">Dean's Welcome</span>
            <h2 class="section-heading">Welcome from the Dean</h2>
            <p class="section-copy">
              It gives me great pleasure to welcome you to the Faculty of Basic Medical Sciences, one of the foremost
              faculties in the College of Health Sciences at Delta State University, Abraka.
            </p>
            <p class="section-copy">
              Since our establishment in 1992, we have remained committed to producing graduates who are not only
              academically excellent but also morally upright and socially responsible. Our faculty is home to six
              dynamic departments, each staffed with experienced academics and researchers who are dedicated to
              advancing knowledge in the biomedical sciences.
            </p>
            <p class="section-copy">
              We have invested significantly in our laboratory infrastructure, and our teaching methods blend
              traditional pedagogy with modern approaches to ensure our students are well-prepared for careers in
              medicine, research, and allied health professions.
            </p>
            <p class="section-copy">
              I invite prospective students, collaborators, and partners to explore our website and discover the
              opportunities that await at our Faculty.
            </p>
            <p><strong>Prof. Ejiro O. Akpogheneta</strong><br /><span class="small-text">Dean, Faculty of Basic Medical Sciences</span></p>
          </div>
          <div class="panel-card dean-photo">
            ${renderResponsiveImage(
              {
                url: data.deanImageUrl,
                alt: "Dean of the Faculty of Basic Medical Sciences",
              },
              {
                className: "dean-photo__image",
                loading: "lazy",
                widths: [480, 720, 960],
                defaultWidth: 720,
                quality: 72,
                sizes: "(max-width: 1024px) 100vw, 42vw",
              }
            )}
            <div class="dean-photo__caption">
              <strong>Prof. E.O. Akpogheneta</strong>
              <div class="small-text">Dean, Faculty of Basic Medical Sciences</div>
            </div>
          </div>
        </div>
      </section>

      <section class="section section-alt">
        <div class="container grid-two">
          <article class="panel-card">
            <span class="feature-icon">MS</span>
            <h3 class="section-heading">Our Mission</h3>
            <p class="section-copy">
              To provide quality education and training in the basic medical sciences that equips graduates with the
              knowledge, skills, and ethical grounding necessary for careers in medicine, biomedical research, and
              healthcare; and to contribute meaningfully to national and global health through impactful research and
              community engagement.
            </p>
          </article>
          <article class="panel-card">
            <span class="feature-icon">VS</span>
            <h3 class="section-heading">Our Vision</h3>
            <p class="section-copy">
              To be a leading centre of excellence in basic medical sciences education and research in Africa,
              recognized internationally for the quality of our graduates, the relevance of our research, and our
              contributions to health and well-being of communities in Nigeria and beyond.
            </p>
          </article>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2 class="section-heading">Core Values</h2>
          <p class="section-subtitle">The principles that guide our academic and research pursuits.</p>
          <div class="values-grid">
            ${data.aboutValues
              .map(
                (value) => `
                  <article class="panel-card">
                    <span class="feature-icon">${value.icon}</span>
                    <h3>${value.title}</h3>
                    <p class="section-copy">${value.desc}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="section section-alt">
        <div class="container">
          <h2 class="section-heading">Faculty History</h2>
          <p class="section-subtitle">Key milestones in our journey of academic excellence.</p>
          <div class="timeline">
            ${data.aboutMilestones
              .map(
                (item) => `
                  <div class="timeline-row">
                    <span class="timeline-year">${item.year}</span>
                    <p class="section-copy">${item.event}</p>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderDepartmentsPage() {
    return `
      ${renderPageHero(
        "Academics",
        "Our Departments",
        "Six departments offering undergraduate and postgraduate programmes across the full spectrum of basic medical sciences."
      )}
      <section class="section">
        <div class="container">
          <div class="departments-grid">
            ${data.departments.map(renderDepartmentCard).join("")}
          </div>
        </div>
      </section>
      <section class="section section-alt">
        <div class="container">
          <div class="summary-grid">
            ${data.departmentsSummary
              .map(
                (item) => `
                  <div class="summary-tile">
                    <div class="summary-tile__value" data-count-value="${item.value}">${item.value}</div>
                    <div class="summary-tile__label">${item.label}</div>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderExecutivesPage() {
    return `
      ${renderPageHero(
        "Student Leadership",
        "Faculty Student Executives",
        "Meet the elected student representatives serving the Faculty of Basic Medical Sciences through advocacy, welfare, and student-focused leadership."
      )}
      <section class="section">
        <div class="container grid-two">
          <article class="panel-card">
            <span class="badge badge--light">Executive Council</span>
            <h2 class="section-heading">Leadership that keeps students informed, represented, and supported</h2>
            <p class="section-copy">
              The Faculty Student Executive Council works with class leaders, staff advisers, and departmental
              representatives to improve academic engagement, student welfare, and faculty community life.
            </p>
            <p class="section-copy">
              From orientation support to academic advocacy and campus-wide programmes, this team helps ensure that
              student voices are organized, visible, and meaningfully represented.
            </p>
            <div class="executive-metrics">
              ${data.executiveHighlights
                .map(
                  (item) => `
                    <div class="executive-metric">
                      <div class="executive-metric__value" data-count-value="${item.value}">${item.value}</div>
                      <div class="executive-metric__label">${item.label}</div>
                      <div class="executive-metric__desc">${item.desc}</div>
                    </div>
                  `
                )
                .join("")}
            </div>
          </article>
          <article class="panel-card executive-side-panel">
            <span class="feature-icon">EC</span>
            <h3 class="section-heading">What the team focuses on</h3>
            <div class="executive-focus-list">
              <div class="executive-focus-item">
                <strong>Academic Representation</strong>
                <p class="section-copy">Interface with faculty management on student concerns, schedules, and academic guidance.</p>
              </div>
              <div class="executive-focus-item">
                <strong>Welfare & Support</strong>
                <p class="section-copy">Coordinate welfare responses, orientation, peer support, and responsive student communication.</p>
              </div>
              <div class="executive-focus-item">
                <strong>Community Life</strong>
                <p class="section-copy">Drive events, awareness campaigns, and programmes that strengthen the student experience.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="section section-alt">
        <div class="container">
          <div class="news-header">
            <div>
              <span class="badge badge--light">Current Officers</span>
              <h2 class="section-heading">Executive Team</h2>
              <p class="section-subtitle">A snapshot of the student leaders currently serving the faculty community.</p>
            </div>
          </div>
          <div class="executives-grid">
            ${data.studentExecutives.map(renderExecutiveCard).join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="contact-panel executive-cta">
            <h2 class="section-heading">Need to reach the student executive council?</h2>
            <p class="section-subtitle">
              Students can contact the council for welfare concerns, programme ideas, collaboration requests, and faculty-level feedback.
            </p>
            <div class="button-row">
              <a class="button" href="contact.html">Contact the Faculty <span class="button-arrow">-></span></a>
              <a class="button-soft" href="mailto:president.fbms@delsu.edu.ng">Email the President</a>
            </div>
          </div>
        </div>
      </section>

      ${renderExecutiveModal()}
    `;
  }

  function renderDepartmentCard(department) {
    const initials = department.hod
      .replace("Prof.", "")
      .replace("Dr.", "")
      .trim()
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return `
      <article class="department-card">
        <div class="department-card__body">
          <div class="department-card__head">
            <span class="avatar">${initials}</span>
            <div>
              <div class="small-text">Head of Department</div>
              <strong>${department.hod}</strong>
            </div>
          </div>
          <h3 class="department-card__title">${department.name}</h3>
          <p class="department-card__desc">${department.description}</p>
          <div class="programme-list">
            ${department.programmes.map((programme) => `<span class="chip">${programme}</span>`).join("")}
          </div>
        </div>
        <div class="department-card__footer">
          <div class="department-card__stats">
            <span class="small-text">${department.staffCount} Staff</span>
            <span class="small-text">${department.studentCount} Students</span>
          </div>
          <a class="button-soft" href="contact.html">Contact</a>
        </div>
      </article>
    `;
  }

  function renderExecutiveCard(executive) {
    const palette = ["#0F2554", "#1D4ED8", "#1E3A5F", "#2563EB", "#1B3A6B", "#1945A0"];
    const color = palette[executive.id % palette.length];

    return `
      <article class="executive-card">
        <div class="executive-card__top">
          <span class="avatar" style="background:${color};">${executive.initials}</span>
          <span class="chip executive-card__role">${executive.role}</span>
        </div>
        <button class="executive-card__trigger" type="button" data-executive-trigger="${executive.id}">
          <h3 class="executive-card__name">${executive.name}</h3>
          <p class="executive-card__meta">${executive.level}</p>
          <p class="executive-card__focus">${executive.focus}</p>
        </button>
        <div class="executive-card__contact">
          <a href="mailto:${executive.email}">${executive.email}</a>
        </div>
      </article>
    `;
  }

  function renderExecutiveModal() {
    return `
      <div class="executive-modal" data-executive-modal hidden>
        <div class="executive-modal__backdrop" data-executive-close></div>
        <div class="executive-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="executive-modal-title">
          <button class="executive-modal__close" type="button" aria-label="Close profile" data-executive-close>
            <span aria-hidden="true">x</span>
          </button>
          <div class="executive-modal__media">
            <img class="executive-modal__image" src="" alt="" data-executive-modal-image />
          </div>
          <div class="executive-modal__content">
            <span class="chip" data-executive-modal-role></span>
            <h3 class="executive-modal__title" id="executive-modal-title" data-executive-modal-name></h3>
            <p class="executive-modal__meta" data-executive-modal-level></p>
            <p class="executive-modal__text" data-executive-modal-focus></p>
            <p class="executive-modal__text" data-executive-modal-bio></p>
            <a class="button-soft executive-modal__button" href="#" data-executive-modal-email>Send Email</a>
          </div>
        </div>
      </div>
    `;
  }

  function renderGalleryPage() {
    return `
      ${renderPageHero(
        "Media",
        "Photo Gallery",
        "Explore our campus, laboratories, lecture halls, and faculty events through our photo gallery."
      )}
      <section class="section">
        <div class="container">
          <div class="filter-row" id="gallery-filters">
            ${data.galleryFilters
              .map(
                (filter, index) => `
                  <button class="filter-button${index === 0 ? " is-active" : ""}" type="button" data-filter="${filter}">
                    ${filter}
                  </button>
                `
              )
              .join("")}
          </div>
          <div id="gallery-grid">${renderGalleryItems("All")}</div>
        </div>
      </section>
    `;
  }

  function renderGalleryItems(filter) {
    const items =
      filter === "All"
        ? data.galleryItems
        : data.galleryItems.filter((item) => item.category === filter);

    if (!items.length) {
      return `<div class="empty-state">No photos found for this category.</div>`;
    }

    return `
      <div class="gallery-grid">
        ${items
          .map((item) => {
            const height = item.aspect === "portrait" ? 360 : 240;
            return `
              <article class="gallery-card">
                <div class="gallery-card__media" style="min-height:${height}px;">
                  ${
                    item.imageUrl
                      ? `
                        ${renderResponsiveImage(item, {
                          className: "gallery-card__image",
                          loading: "lazy",
                          widths: [420, 640, 900, 1200],
                          defaultWidth: 640,
                          quality: 68,
                          sizes: "(max-width: 720px) 100vw, (max-width: 1180px) 50vw, 33vw",
                        })}
                        ${item.isPlaceholder ? '<span class="gallery-card__badge">Placeholder</span>' : ""}
                      `
                      : `
                        <div class="gallery-card__fallback" style="background:${item.color};">
                          <div>
                            <div class="gallery-card__symbol">${item.category.toUpperCase().slice(0, 3)}</div>
                            <p class="small-text">${item.title}</p>
                          </div>
                        </div>
                      `
                  }
                </div>
                <div class="gallery-card__body">
                  <h3 class="gallery-card__title">${item.title}</h3>
                  <span class="chip gallery-card__tag">${item.category}</span>
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderStaffPage() {
    return `
      ${renderPageHero(
        "People",
        "Staff Directory",
        "Browse our academic and administrative staff across all departments."
      )}
      <section class="section">
        <div class="container">
          <div class="search-filter-bar">
            <input class="search-input" id="staff-search" type="text" placeholder="Search by name, title, or department..." />
            <select class="select-input" id="staff-department">
              ${data.staffDepartmentFilters.map((dept) => `<option value="${dept}">${dept}</option>`).join("")}
            </select>
            <select class="select-input" id="staff-type">
              ${data.staffTypeFilters.map((type) => `<option value="${type}">${type}</option>`).join("")}
            </select>
          </div>
          <p class="staff-count" id="staff-count"></p>
          <div id="staff-grid"></div>
        </div>
      </section>
    `;
  }

  function renderStaffCards(items) {
    if (!items.length) {
      return `<div class="empty-state">No staff members match your search criteria.</div>`;
    }

    return `
      <div class="staff-grid">
        ${items
          .map((person) => {
            const colors = ["#0F2554", "#1D4ED8", "#1E3A5F", "#2563EB", "#1B3A6B", "#1945A0"];
            const color = colors[person.id % colors.length];
            return `
              <article class="staff-card">
                <span class="avatar" style="background:${color};">${person.initials}</span>
                <h3 class="staff-card__name">${person.name}</h3>
                <p class="staff-card__meta">${person.title}</p>
                <span class="chip staff-card__pill">${person.department}</span>
                <div class="staff-card__email">
                  <a href="mailto:${person.email}">${person.email}</a>
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderContactPage() {
    return `
      ${renderPageHero(
        "Get in Touch",
        "Contact Us",
        "Have a question or enquiry? Reach out to us and we'll respond as soon as possible."
      )}
      <section class="section">
        <div class="container contact-grid">
          <div>
            <h2 class="section-heading">Send Us a Message</h2>
            <p class="section-subtitle">Fill out the form below and we'll get back to you shortly.</p>
            <div class="form-status" id="contact-status">
              Thank you for your message. This static form is ready to be connected to Supabase.
            </div>
            <form class="contact-form" id="contact-form">
              <div class="contact-form__two">
                <div>
                  <label class="form-label" for="contact-name">Full Name</label>
                  <input class="text-input" id="contact-name" name="name" type="text" placeholder="e.g. John Okafor" required />
                </div>
                <div>
                  <label class="form-label" for="contact-email">Email Address</label>
                  <input class="text-input" id="contact-email" name="email" type="email" placeholder="john@example.com" required />
                </div>
              </div>
              <div>
                <label class="form-label" for="contact-subject">Subject</label>
                <input class="text-input" id="contact-subject" name="subject" type="text" placeholder="What is your enquiry about?" required />
              </div>
              <div>
                <label class="form-label" for="contact-message">Message</label>
                <textarea class="textarea-input" id="contact-message" name="message" placeholder="Type your message here..." required></textarea>
              </div>
              <div class="button-row">
                <button class="button" type="submit">Send Message <span class="button-arrow">-></span></button>
              </div>
              <p class="form-note">
                Frontend only for now. Replace the submit handler in <code>assets/main.js</code> with your Supabase insert or edge function later.
              </p>
            </form>
          </div>
          <div class="contact-stack">
            <div class="panel-card map-placeholder">
              <div>
                <strong>Map Placeholder</strong>
                <p class="small-text">Add your embedded map or Supabase-powered location content here later.</p>
              </div>
            </div>
            <div class="contact-panel">
              <h3>Contact Information</h3>
              <div class="contact-list">
                <div class="contact-item">
                  <span class="contact-item__icon">ADR</span>
                  <div>
                    <div class="small-text">Address</div>
                    <div class="contact-text">${data.site.address}</div>
                  </div>
                </div>
                <div class="contact-item">
                  <span class="contact-item__icon">TEL</span>
                  <div>
                    <div class="small-text">Phone</div>
                    <div class="contact-text">${data.site.phone}</div>
                  </div>
                </div>
                <div class="contact-item">
                  <span class="contact-item__icon">EML</span>
                  <div>
                    <div class="small-text">Email</div>
                    <div class="contact-text">${data.site.email}</div>
                  </div>
                </div>
                <div class="contact-item">
                  <span class="contact-item__icon">HRS</span>
                  <div>
                    <div class="small-text">Office Hours</div>
                    <div class="contact-text">Monday - Friday: 8:00 AM - 4:00 PM</div>
                    <div class="small-text">Closed on weekends and public holidays</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function bindNavigation() {
    const menuButton = document.querySelector("[data-menu-toggle]");
    const mobileMenu = document.querySelector("[data-mobile-menu]");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    if (!menuButton || !mobileMenu) {
      return;
    }

    menuButton.addEventListener("click", function () {
      menuButton.classList.toggle("is-open");
      mobileMenu.classList.toggle("is-open");
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        menuButton.classList.remove("is-open");
        mobileMenu.classList.remove("is-open");
      });
    });
  }

  function initPage(currentPage) {
    initCountAnimations();
    initExecutiveProfiles();

    if (currentPage === "gallery") {
      initGalleryPage();
    }

    if (currentPage === "staff") {
      initStaffPage();
    }

    if (currentPage === "contact") {
      initContactPage();
    }

    if (currentPage === "home") {
      initHeroSlider();
      initTypingAnimations();
    }
  }

  function initGalleryPage() {
    const filterRoot = document.getElementById("gallery-filters");
    const gridRoot = document.getElementById("gallery-grid");

    if (!filterRoot || !gridRoot) {
      return;
    }

    filterRoot.addEventListener("click", function (event) {
      const button = event.target.closest("[data-filter]");
      if (!button) {
        return;
      }

      const nextFilter = button.getAttribute("data-filter");
      filterRoot.querySelectorAll("[data-filter]").forEach(function (node) {
        node.classList.toggle("is-active", node === button);
      });
      gridRoot.innerHTML = renderGalleryItems(nextFilter);
    });
  }

  function initStaffPage() {
    const searchInput = document.getElementById("staff-search");
    const departmentSelect = document.getElementById("staff-department");
    const typeSelect = document.getElementById("staff-type");
    const countRoot = document.getElementById("staff-count");
    const gridRoot = document.getElementById("staff-grid");

    if (!searchInput || !departmentSelect || !typeSelect || !countRoot || !gridRoot) {
      return;
    }

    function updateStaff() {
      const query = searchInput.value.trim().toLowerCase();
      const department = departmentSelect.value;
      const type = typeSelect.value;

      const filtered = data.staffMembers.filter(function (person) {
        const matchesQuery =
          !query ||
          person.name.toLowerCase().includes(query) ||
          person.title.toLowerCase().includes(query) ||
          person.department.toLowerCase().includes(query);

        const matchesDepartment = department === "All Departments" || person.department === department;
        const matchesType = type === "All Staff" || person.type === type.toLowerCase();

        return matchesQuery && matchesDepartment && matchesType;
      });

      countRoot.textContent =
        "Showing " + filtered.length + " of " + data.staffMembers.length + " staff members";
      gridRoot.innerHTML = renderStaffCards(filtered);
    }

    searchInput.addEventListener("input", updateStaff);
    departmentSelect.addEventListener("change", updateStaff);
    typeSelect.addEventListener("change", updateStaff);

    updateStaff();
  }

  function initContactPage() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("contact-status");

    if (!form || !status) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      form.reset();
      status.classList.add("is-visible");
      window.setTimeout(function () {
        status.classList.remove("is-visible");
      }, 4000);
    });
  }

  function initHeroSlider() {
    const slider = document.querySelector("[data-hero-slider]");
    const slides = slider ? Array.from(slider.querySelectorAll("[data-hero-slide]")) : [];

    if (!slider || slides.length < 2) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      slides.forEach(function (slide, index) {
        slide.classList.toggle("is-active", index === 0);
      });
      return;
    }

    let activeIndex = 0;
    const transitionDuration = 2800;
    const cycleDuration = 11000;

    function hydrateHeroSlide(slide) {
      const image = slide ? slide.querySelector(".home-hero__slide-image") : null;

      if (!image || image.dataset.isHydrated === "true") {
        return;
      }

      const src = image.getAttribute("data-src");
      const srcset = image.getAttribute("data-srcset");
      const sizes = image.getAttribute("data-sizes");

      if (src) {
        image.src = src;
      }

      if (srcset) {
        image.srcset = srcset;
      }

      if (sizes) {
        image.sizes = sizes;
      }

      image.dataset.isHydrated = "true";
    }

    slides.forEach(function (slide, index) {
      slide.classList.toggle("is-active", index === 0);
      slide.classList.remove("is-leaving");

      if (index === 0) {
        const image = slide.querySelector(".home-hero__slide-image");
        if (image) {
          image.dataset.isHydrated = "true";
        }
      }
    });

    hydrateHeroSlide(slides[1]);

    window.setInterval(function () {
      const currentSlide = slides[activeIndex];
      const nextIndex = (activeIndex + 1) % slides.length;
      const nextSlide = slides[nextIndex];
      const upcomingSlide = slides[(nextIndex + 1) % slides.length];

      hydrateHeroSlide(nextSlide);

      currentSlide.classList.add("is-leaving");
      currentSlide.classList.remove("is-active");

      nextSlide.classList.remove("is-leaving");
      nextSlide.classList.add("is-active");

      window.setTimeout(function () {
        currentSlide.classList.remove("is-leaving");
      }, transitionDuration);

      hydrateHeroSlide(upcomingSlide);
      activeIndex = nextIndex;
    }, cycleDuration);
  }

  function initExecutiveProfiles() {
    const modal = document.querySelector("[data-executive-modal]");
    const triggers = document.querySelectorAll("[data-executive-trigger]");

    if (!modal || !triggers.length) {
      return;
    }

    const image = modal.querySelector("[data-executive-modal-image]");
    const role = modal.querySelector("[data-executive-modal-role]");
    const name = modal.querySelector("[data-executive-modal-name]");
    const level = modal.querySelector("[data-executive-modal-level]");
    const focus = modal.querySelector("[data-executive-modal-focus]");
    const bio = modal.querySelector("[data-executive-modal-bio]");
    const email = modal.querySelector("[data-executive-modal-email]");
    const closeButtons = modal.querySelectorAll("[data-executive-close]");

    function closeModal() {
      modal.hidden = true;
      document.body.classList.remove("modal-open");
    }

    function openModal(executive) {
      if (!executive) {
        return;
      }

      const source = getResponsiveImageSource(executive, {
        widths: [420, 640, 900],
        defaultWidth: 640,
        quality: 70,
        sizes: "(max-width: 1024px) 100vw, 45vw",
      });

      image.src = source.src;
      image.srcset = source.srcset;
      image.sizes = source.srcset ? source.sizes : "";
      image.alt = executive.imageAlt || executive.name;
      role.textContent = executive.role;
      name.textContent = executive.name;
      level.textContent = executive.level;
      focus.textContent = executive.focus;
      bio.textContent = executive.bio || "";
      email.href = "mailto:" + executive.email;
      email.textContent = "Email " + executive.name.split(" ")[0];

      modal.hidden = false;
      document.body.classList.add("modal-open");
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        const id = Number(trigger.getAttribute("data-executive-trigger"));
        const executive = data.studentExecutives.find(function (item) {
          return item.id === id;
        });

        openModal(executive);
      });
    });

    closeButtons.forEach(function (button) {
      button.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !modal.hidden) {
        closeModal();
      }
    });
  }

  function initCountAnimations() {
    const counters = Array.from(document.querySelectorAll("[data-count-value]"));

    if (!counters.length) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function finalizeCounter(counter) {
      counter.textContent = counter.getAttribute("data-count-value");
    }

    if (prefersReducedMotion) {
      counters.forEach(finalizeCounter);
      return;
    }

    counters.forEach(function (counter) {
      counter.textContent = formatCountValue(0, counter.getAttribute("data-count-value"));
    });

    function animateCounter(counter) {
      if (counter.dataset.countAnimated === "true") {
        return;
      }

      counter.dataset.countAnimated = "true";

      const targetText = counter.getAttribute("data-count-value");
      const targetNumber = parseInt(targetText.replace(/[^\d]/g, ""), 10);

      if (!targetNumber) {
        counter.textContent = targetText;
        return;
      }

      const duration = 1600;
      const startTime = performance.now();

      function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(targetNumber * eased);

        counter.textContent = formatCountValue(value, targetText);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          counter.textContent = targetText;
        }
      }

      window.requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  function formatCountValue(value, targetText) {
    const prefix = (targetText.match(/^[^\d]*/) || [""])[0];
    const suffix = (targetText.match(/[^\d]*$/) || [""])[0];
    return prefix + value.toLocaleString() + suffix;
  }

  function initTypingAnimations() {
    const typingNodes = Array.from(document.querySelectorAll(".js-typing")).sort(function (left, right) {
      return Number(left.getAttribute("data-typing-order") || "0") - Number(right.getAttribute("data-typing-order") || "0");
    });

    if (!typingNodes.length) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      typingNodes.forEach(function (node) {
        node.textContent = node.getAttribute("data-typing-text") || node.textContent;
      });
      return;
    }

    typingNodes.forEach(function (node) {
      node.textContent = "";
      node.classList.remove("is-typing", "is-complete");
    });

    function typeNode(index) {
      const node = typingNodes[index];

      if (!node) {
        return;
      }

      const fullText = node.getAttribute("data-typing-text") || "";
      const delay = index === 0 ? 28 : 18;
      let charIndex = 0;

      node.classList.add("is-typing");

      function typeNextCharacter() {
        node.textContent = fullText.slice(0, charIndex + 1);
        charIndex += 1;

        if (charIndex < fullText.length) {
          window.setTimeout(typeNextCharacter, delay);
          return;
        }

        node.classList.remove("is-typing");
        node.classList.add("is-complete");

        if (index + 1 < typingNodes.length) {
          window.setTimeout(function () {
            typeNode(index + 1);
          }, 160);
        }
      }

      if (!fullText.length) {
        node.classList.remove("is-typing");
        typeNode(index + 1);
        return;
      }

      window.setTimeout(typeNextCharacter, 180);
    }

    typeNode(0);
  }
})();
