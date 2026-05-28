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
  return <div className={large ? "peach-logo large" : "peach-logo"} aria-label="Adam's Software Services peach logo"><span /></div>;
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
          <p className="eyebrow">AI products · Websites · Social content</p>
          <h1>We build products and experiences that actually work.</h1>
          <p className="lede">AI-powered apps, websites, and social media content for businesses that want to stand out.</p>
          <a className="btn" href="#contact">Let&apos;s work together</a>
        </div>
        <div className="hero-mark"><PeachLogo large /><div className="orb one" /><div className="orb two" /><p>Creative tech studio<br />based in New York.</p></div>
      </section>

      <section id="services" className="section-shell services-section">
        <p className="eyebrow">What we do</p>
        <h2>Useful tech with personality.</h2>
        <div className="cards three">
          {services.map((service) => <article className="card service-card" key={service.title}><span>{service.tag}</span><h3>{service.title}</h3><p>{service.text}</p></article>)}
        </div>
      </section>

      <section id="work" className="section-shell work-section">
        <div className="section-head"><div><p className="eyebrow">Selected work</p><h2>Built to be seen, used, and remembered.</h2></div><p>More projects will be added as they ship.</p></div>
        <div className="cards two">
          {projects.map((project) => <article className="card project-card" key={project.name}><div><span>{project.category}</span><h3>{project.name}</h3><p>{project.text}</p></div><a href={project.href} target="_blank" rel="noreferrer">View project →</a></article>)}
        </div>
      </section>

      <section className="section-shell about-section">
        <p className="eyebrow">About</p>
        <h2>One-person studio. AI-assisted output. Real business taste.</h2>
        <p>Adam&apos;s Software Services is a one-person creative and tech studio based in New York. I build AI products, design websites, and help businesses show up better online — with a little help from my AI agents.</p>
      </section>

      <section className="cheeky section-shell">
        <h2>If you like what you see from Adam&apos;s Software Services, then come get some ASS!</h2>
        <p>Seriously though — let&apos;s build something great together.</p>
      </section>

      <section id="contact" className="section-shell contact-section">
        <div>
          <p className="eyebrow">Let&apos;s work together</p>
          <h2>Got a project in mind? Let&apos;s talk.</h2>
          <p className="contact-note">Tell me what you&apos;re building, launching, fixing, or trying to make look less boring.</p>
          <p className="direct-email">Prefer email? <a href="mailto:hello@getsomeass.com">hello@getsomeass.com</a></p>
        </div>
        <form className="contact-card" action="mailto:hello@getsomeass.com" method="post" encType="text/plain">
          <label>Name<input name="name" required /></label>
          <label>Email<input name="email" type="email" required /></label>
          <label>Company <small>optional</small><input name="company" /></label>
          <label>What do you need help with?<select name="service" defaultValue=""><option value="" disabled>Choose one</option><option>AI Product Development</option><option>Web Design</option><option>Social Media & Advertising</option><option>Not sure yet</option></select></label>
          <label>Message<textarea name="message" required /></label>
          <button className="btn full" type="submit">Send the idea</button>
        </form>
      </section>

      <footer className="footer">
        <a className="brand" href="#top"><PeachLogo /><span><strong>ASS</strong><small>Adam&apos;s Software Services</small></span></a>
        <div><a href="https://prta.io">PRTA</a><a href="https://teslaremodeling.com">Tesla Remodeling</a><a href="#">Instagram</a></div>
        <p>© 2025 Adam&apos;s Software Services</p>
      </footer>
    </main>
  );
}
