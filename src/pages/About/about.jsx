const About = () => {
  return (
    <div className="page">
      <div className="badge">📖 About Us</div>
      <h1 className="hero-title">Who <span>We Are</span></h1>
      <p className="hero-subtitle">
        We're a small team focused on building clean, useful web experiences.
      </p>

      <div className="about-grid">
        <div className="about-card">
          <h3>🎯 Our Mission</h3>
          <p>To create simple, elegant solutions that solve real problems.</p>
        </div>
        <div className="about-card">
          <h3>🌟 Our Vision</h3>
          <p>A world where great design is accessible to everyone.</p>
        </div>
        <div className="about-card">
          <h3>🤝 Our Values</h3>
          <p>Honesty, quality, and putting users first — always.</p>
        </div>
      </div>
    </div>
  );
}

export default About;