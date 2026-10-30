import { business, copy, href, type Locale, type Page } from "@/content/site";
import {
  EnquiryTemplate,
  LanguageSuggestion,
  LanguageSwitch,
  Modal,
} from "./interactions";

export function Arrow() {
  return (
    <svg className="icon-arrow" aria-hidden="true" viewBox="0 0 16 16">
      <path d="M3 13 13 3M3 3h10v10" />
    </svg>
  );
}
function Pod() {
  return (
    <svg aria-hidden="true" viewBox="0 0 34 44">
      <path d="M17 5C-1 15 0 32 17 39C34 32 35 15 17 5Zm0 1v32M17 7C6 17 6 29 17 37M17 7c11 10 11 22 0 30M17 5c0-2 1-3 4-4" />
    </svg>
  );
}

function DraftNotes({
  locale,
  footer = false,
}: {
  locale: Locale;
  footer?: boolean;
}) {
  const t = copy[locale];
  return (
    <Modal
      label={
        <>
          {footer ? t.beforeLaunch : t.draftNotes}
          <Arrow />
        </>
      }
      title={t.notesTitle}
      closeLabel={t.close}
    >
      <p>{t.notesText}</p>
      <ol className="draft-checklist">
        {t.checklist.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.text}</span>
          </li>
        ))}
      </ol>
      <p className="dialog-footnote">{t.privacyNote}</p>
    </Modal>
  );
}

function Header({ locale, page }: { locale: Locale; page: Page }) {
  const t = copy[locale];
  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <div className="draft-strip">
        <span>
          <i aria-hidden="true" />
          {t.draft}
        </span>
        <DraftNotes locale={locale} />
      </div>
      <header className="site-header wrap multipage-header">
        <a
          className="brand"
          href={href(locale)}
          aria-label={`Green Shield — ${t.nav.home}`}
        >
          <Pod />
          <span>
            <strong>Green Shield</strong>
            <small>{t.cocoaTrading}</small>
          </span>
        </a>
        <nav
          aria-label={
            locale === "fr" ? "Navigation principale" : "Main navigation"
          }
        >
          {(["home", "about", "cocoa", "contact"] as const).map((item) => (
            <a
              key={item}
              href={href(locale, item)}
              aria-current={page === item ? "page" : undefined}
            >
              <span className="nav-desktop">{t.nav[item]}</span>
              <span className="nav-mobile">
                {item === "cocoa"
                  ? locale === "fr"
                    ? "Produits"
                    : "Products"
                  : t.nav[item]}
              </span>
            </a>
          ))}
        </nav>
        <LanguageSwitch locale={locale} page={page} />
      </header>
    </>
  );
}

function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <footer className="site-footer wrap">
      <a className="footer-brand" href={href(locale)}>
        Green Shield<small>{t.cocoaTrading}</small>
      </a>
      <p>{t.footerDraft}</p>
      <DraftNotes locale={locale} footer />
    </footer>
  );
}

function PageTitle({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="page-title wrap">
      <p className="eyebrow">{eyebrow}</p>
      <div>
        <h1>{title}</h1>
        <p>{lead}</p>
      </div>
    </section>
  );
}

function Facts({
  locale,
  kind,
}: {
  locale: Locale;
  kind: "company" | "supply";
}) {
  const t = copy[locale];
  const keys =
    kind === "company"
      ? (["legalName", "location", "registration", "role"] as const)
      : (["product", "origins", "capacity", "documents"] as const);
  return (
    <dl className="fact-list">
      {keys.map((key) => (
        <div key={key}>
          <dt>{t.facts[key]}</dt>
          <dd className={business[key] ? "" : "pending-fact"}>
            {business[key] || t.pending[key]}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function FieldPhoto({ name, alt, width, height, priority = false }: {
  name: "cocoa-pod" | "field-cocoa" | "field-visit" | "cashew-warehouse" | "cashew-yard";
  alt: string; width: number; height: number; priority?: boolean;
}) {
  return (
    <picture>
      <source type="image/webp"
        srcSet={[480, 800, 1280].map(size => `/images/${name}-${size}.webp ${size}w`).join(", ")}
        sizes="(max-width: 800px) calc(100vw - 40px), (max-width: 1200px) 44vw, 620px" />
      <img src={`/images/${name}.jpg`} alt={alt} width={width} height={height}
        loading={priority ? "eager" : "lazy"} decoding="async"
        fetchPriority={priority ? "high" : "auto"} />
    </picture>
  );
}

function Home({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <section
        className={`hero wrap locale-${locale}`}
        aria-labelledby="hero-title"
      >
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="tiny-line" />
            {t.homeEyebrow}
          </p>
          <h1 id="hero-title">
            {t.homeTitle}
            <br />
            <em>{t.homeTitleEm}</em>
          </h1>
          <p className="hero-intro">{t.homeLead}</p>
          <p className="hero-note">{t.homeNote}</p>
          <a className="button button-dark" href={href(locale, "about")}>
            {t.readAbout}
            <Arrow />
          </a>
          <div className="hero-bottom">
            <span>{t.cocoaTrading}</span>
            <span className="dot" />
            <span>GREEN SHIELD</span>
          </div>
        </div>
        <figure className="hero-photograph">
          <FieldPhoto name="field-visit" alt={t.fieldVisitAlt} width={1500} height={844} priority />
          <figcaption>
            <span>{t.homeImageLabel}</span>
            <p>{t.fieldCaption}</p>
          </figcaption>
        </figure>
      </section>
      <section className="home-introduction">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.homeIntroLabel}</p>
              <h2>{t.homeIntroTitle}</h2>
            </div>
            <p>{t.homeIntroText}</p>
          </div>
          <div className="home-links">
            {t.homeLinks.map((item, index) => (
              <a key={item.page} href={href(locale, item.page as Page)}>
                <span className="link-number">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Arrow />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function About({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const founder = business.founder || t.founderPlaceholder;
  return (
    <>
      <PageTitle
        eyebrow={t.aboutEyebrow}
        title={t.aboutTitle}
        lead={t.aboutLead}
      />
      <section className="about-profile wrap">
        <div className="profile-portrait">
          {business.founderPhoto ? (
            <img
              className="founder-photo"
              src={business.founderPhoto}
              alt={founder}
              width="800"
              height="900"
            />
          ) : (
            <div
              className="portrait-placeholder"
              role="img"
              aria-label={t.portraitAlt}
            >
              <div className="portrait-grain" />
              <div className="portrait-frame">
                <svg aria-hidden="true" viewBox="0 0 48 48">
                  <rect x="6" y="9" width="36" height="30" rx="2" />
                  <circle cx="19" cy="19" r="4" />
                  <path d="m7 34 10-9 8 7 8-11 9 12" />
                </svg>
                <span>{t.portraitTitle}</span>
                <small>{t.portraitSmall}</small>
              </div>
            </div>
          )}
          <div className="portrait-caption">
            <div>
              <strong>{founder}</strong>
              <span>{t.founderRole}</span>
            </div>
          </div>
        </div>
        <div className="profile-copy">
          <p className="eyebrow">{t.founderLabel}</p>
          <p className="large-copy">
            {t.founderIntro.replace("{founder}", founder)}
          </p>
          <p>{t.founderText}</p>
          <div className="bio-placeholder">
            <span className="pending-tag">{t.toAdd}</span>
            <p>{t.bioPlaceholder}</p>
          </div>
          <div className="family-history">
            <h3>{t.familyTitle}</h3>
            <p>{t.familyText}</p>
            <p className="review-note">{t.familyNote}</p>
          </div>
          <div className="about-video">
            {business.introductionVideo ? (
              <video
                className="founder-video"
                src={business.introductionVideo}
                controls
                playsInline
                preload="metadata"
                aria-label={t.videoTitle}
              />
            ) : (
              <>
                <Modal
                  className="text-link"
                  label={
                    <>
                      {t.videoButton}
                      <Arrow />
                    </>
                  }
                  title={t.videoDialogTitle}
                  closeLabel={t.close}
                >
                  <p>{t.videoDialogText}</p>
                  <div className="video-outline">
                    {t.videoOutline.map((item) => (
                      <p key={item.title}>
                        <strong>{item.title}</strong>
                        <br />
                        {item.text}
                      </p>
                    ))}
                  </div>
                  <p className="dialog-footnote">{t.videoTip}</p>
                </Modal>
                <p className="media-note">{t.videoNote}</p>
              </>
            )}
          </div>
        </div>
      </section>
      <section className="company-block">
        <div className="wrap company-grid">
          <div>
            <p className="eyebrow">GREEN SHIELD</p>
            <h2>{t.companyTitle}</h2>
            <p>{t.companyIntro}</p>
          </div>
          <div>
            <Facts locale={locale} kind="company" />
            <p className="confirmation-note">{t.companyCaution}</p>
          </div>
        </div>
      </section>
    </>
  );
}

function Cocoa({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <PageTitle
        eyebrow={t.cocoaEyebrow}
        title={t.cocoaTitle}
        lead={t.cocoaLead}
      />
      <section className="supply-section wrap">
        <div className="supply-copy">
          <h2>{t.supplyTitle}</h2>
          <p>{t.supplyIntro}</p>
          <Facts locale={locale} kind="supply" />
          <p className="confirmation-note">{t.supplyCaution}</p>
          <aside className="shipment-options">
            <h3>{t.shippingTitle}</h3>
            <dl>{t.shippingLocations.map(location => <div key={location.country}><dt>{location.country}</dt><dd>{location.port}</dd></div>)}</dl>
            <p>{t.shippingNote}</p>
          </aside>
        </div>
        <figure className="supply-image">
          <FieldPhoto name="field-cocoa" alt={t.fieldAlt} width={1800} height={1125} />
          <figcaption>
            {t.fieldCaption}
            <small>{t.fieldCaution}</small>
          </figcaption>
        </figure>
      </section>
      <section className="conversation-section">
        <div className="wrap conversation-grid">
          <div>
            <p className="eyebrow">GREEN SHIELD</p>
            <h2>{t.requirementsTitle}</h2>
            <a href={href(locale, "contact")} className="text-link">
              {t.seeCocoa}
              <Arrow />
            </a>
          </div>
          <ol className="requirements">
            {t.requirements.map((item, index) => (
              <li key={item.title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="field-story wrap">
        <div>
          <p className="eyebrow">CÔTE D’IVOIRE</p>
          <h2>{t.photographsTitle}</h2>
          <p>{t.photographsIntro}</p>
          <p className="review-note">{t.fieldCaution}</p>
        </div>
        <figure>
          <FieldPhoto name="field-visit" alt={t.fieldVisitAlt} width={1500} height={844} />
          <figcaption>{t.fieldCaption}</figcaption>
        </figure>
      </section>
      <OperationsGallery locale={locale} />
    </>
  );
}

function OperationsGallery({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <section className="operations-section wrap">
    <div className="operations-intro"><p className="eyebrow">CÔTE D’IVOIRE / {locale === "fr" ? "ANACARDE" : "CASHEW"}</p><h2>{t.operationsTitle}</h2><p>{t.operationsIntro}</p></div>
    <div className="operations-gallery">
      <figure><FieldPhoto name="cashew-warehouse" alt={t.warehouseAlt} width={1280} height={853} /><figcaption>{t.warehouseCaption}</figcaption></figure>
      <figure><FieldPhoto name="cashew-yard" alt={t.yardAlt} width={1280} height={853} /><figcaption>{t.yardCaption}</figcaption></figure>
    </div>
    <p className="review-note">{t.operationsCaution}</p>
  </section>;
}

function Contact({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <section className="contact-section wrap contact-page">
        <div>
          <p className="eyebrow">{t.contactEyebrow}</p>
          <h1>{t.contactTitle}</h1>
          <p>{t.contactLead}</p>
          <div className="contact-person">
            <span className="person-initials" aria-hidden="true">
              GS
            </span>
            <div>
              <strong>{business.founder || t.founderPlaceholder}</strong>
              <span>
                {locale === "fr" ? "Basé à" : "Based in"} {business.founderBase}
              </span>
            </div>
          </div>
        </div>
        <div className="contact-box">
          <span className="contact-label">{t.directEmail}</span>
          <p className="contact-address">
            {business.email || t.emailPlaceholder}
          </p>
          <p className="contact-help">{business.email ? "" : t.emailHelp}</p>
          {business.email && (
            <a className="text-link" href={`mailto:${business.email}`}>
              {t.emailCta}
              <Arrow />
            </a>
          )}
          <div className="business-phones" aria-label={locale === "fr" ? "Téléphones professionnels" : "Business phone numbers"}>
            {business.phones.map((phone) => (
              <div key={phone.tel}>
                <span>{phone[locale]}</span>
                <a href={`tel:${phone.tel}`}>{phone.display}</a>
              </div>
            ))}
          </div>
          <EnquiryTemplate locale={locale} />
        </div>
      </section>
      <section className="contact-bottom wrap">
        <div>
          <h2>{t.contactAsideTitle}</h2>
          <p>{t.contactAside}</p>
        </div>
        <ol>
          {t.requirements.map((item) => (
            <li key={item.title}>{item.title}</li>
          ))}
        </ol>
      </section>
    </>
  );
}

export default function Website({
  locale,
  page,
  root = false,
}: {
  locale: Locale;
  page: Page;
  root?: boolean;
}) {
  return (
    <>
      <Header locale={locale} page={page} />
      <LanguageSuggestion enabled={root} />
      <main id="main">
        {page === "home" ? (
          <Home locale={locale} />
        ) : page === "about" ? (
          <About locale={locale} />
        ) : page === "cocoa" ? (
          <Cocoa locale={locale} />
        ) : (
          <Contact locale={locale} />
        )}
      </main>
      <Footer locale={locale} />
    </>
  );
}
