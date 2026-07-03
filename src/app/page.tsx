import { ContactForm } from "./contact-form";

const services = [
  {
    title: "AI Product Development",
    text: "We design and build AI-powered web apps from idea to launch. PRTA is our first product.",
    tag: "Build",
  },
  {
    title: "Web Design",
    text: "Clean, fast, custom websites built for businesses that want to make an impression.",
    tag: "Design",
  },
  {
    title: "Social Media & Advertising",
    text: "AI-generated graphics, carousels, and content that stops the scroll.",
    tag: "Create",
  },
];

const projects = [
  {
    name: "DFB Coaching",
    href: "https://dfbcoaching.com",
    category: "Client Website",
    text: "Premium client website for Danny Bermeo, an NYC personal trainer focused on body composition, coaching funnels, and sustainable results.",
  },
  {
    name: "PRTA",
    href: "https://prta.io",
    category: "AI Product",
    text: "AI-powered job readiness platform. Helping job seekers prepare smarter and land faster.",
  },
  {
    name: "Tesla Remodeling",
    href: "https://teslaremodeling.com",
    category: "Web Design",
    text: "Website design and build for a NYC-based construction company.",
  },
];

function PeachLogo({ large = false }: { large?: boolean }) {
  return <img className={large ? "peach-logo large" : "peach-logo"} src="/icon.svg" alt="Adam's Software Services peach logo" />;
}

function AccentIcon({ label }: { label: string }) {
  return <div className="accent-icon" aria-hidden="true">{label.slice(0, 1)}</div>;
}

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top"><PeachLogo /><span><strong>ASS</strong><small>Adam&apos;s Software Services</small></span></a>
        <div className="nav-links"><a href="#work">Work</a><a href="#services">Services</a><a href="#contact">Contact</a></div>
      </nav>

      <section id="top" className="hero section-shell">
        <div className="hero-copy">
          <p className="eyebrow">Adam&apos;s Software Services</p>
          <h1>Digital work for businesses that want to stand out.</h1>
          <p className="lede">AI-powered apps, custom websites, and social content built with taste, speed, and a little personality.</p>
          <div className="hero-actions"><a className="btn" href="#contact">Let&apos;s work together</a><a className="text-cta" href="#work">See the work</a></div>
        </div>
        <div className="hero-mark"><PeachLogo large /><div className="mark-card"><strong>ASS</strong><span>Creative tech studio</span></div></div>
      </section>

      <section id="services" className="section-shell services-section">
        <p className="eyebrow">What we do</p>
        <h2>Useful tech. Better taste. Faster output.</h2>
        <div className="cards three">
          {services.map((service) => <article className="card service-card" key={service.title}><AccentIcon label={service.title} /><span>{service.tag}</span><h3>{service.title}</h3><p>{service.text}</p></article>)}
        </div>
      </section>

      <section id="work" className="section-shell work-section">
        <div className="section-head"><div><p className="eyebrow">Selected work</p><h2>Built to be seen, used, and remembered.</h2></div><p>More projects will be added as they ship.</p></div>
        <div className="cards two">
          {projects.map((project) => <article className="card project-card" key={project.name}><div><span>{project.category}</span><h3>{project.name}</h3><p>{project.text}</p></div><a href={project.href} target="_blank" rel="noreferrer">View project →</a></article>)}
        </div>
      </section>

      <section className="about-wrap"><div className="section-shell about-section">
        <p className="eyebrow">About</p>
        <h2>Small studio energy. Big agency taste.</h2>
        <p>Adam&apos;s Software Services is a one-person creative and tech studio based in New York. I build AI products, design websites, and help businesses show up better online — with a little help from my AI agents.</p>
      </div></section>

      <section className="cheeky section-shell">
        <h2>If you like what you see from Adam&apos;s Software Services, then come get some ASS!</h2>
        <p>Seriously though — let&apos;s build something great together.</p>
      </section>

      <section id="contact" className="section-shell contact-section">
        <div>
          <p className="eyebrow">Let&apos;s work together</p>
          <h2>Got a project in mind? Let&apos;s talk.</h2>
          <p className="contact-note">Tell me what you&apos;re building, launching, or trying to make look better online.</p>
          <p className="direct-email">Prefer email? <a href="mailto:adam@getsomeass.com">adam@getsomeass.com</a></p>
        </div>
        <ContactForm />
      </section>

      <footer className="footer">
        <a className="brand" href="#top"><PeachLogo /><span><strong>ASS</strong><small>Adam&apos;s Software Services</small></span></a>
        <div><a href="https://dfbcoaching.com">DFB Coaching</a><a href="https://prta.io">PRTA</a><a href="https://teslaremodeling.com">Tesla Remodeling</a><a href="https://www.instagram.com/adamssoftwareservices" target="_blank" rel="noreferrer">Instagram</a></div>
        <p>© 2025 Adam&apos;s Software Services</p>
      </footer>
    </main>
  );
}
