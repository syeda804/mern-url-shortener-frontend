const Home = () => {
  return (
    <div className="page hero-page">
      <div className="badge">🚀 Welcome</div>
      <h1 className="hero-title">Build Something <span>Amazing</span></h1>
      <p className="hero-subtitle">
        This is your Home page — clean, fast, and ready to customize.
      </p>
      <div className="hero-actions">
        <button className="btn-primary">Get Started</button>
        <button className="btn-secondary">Learn More</button>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Fast</h3>
          <p>Optimized performance out of the box.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎨</div>
          <h3>Beautiful</h3>
          <p>Modern design that just works.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure</h3>
          <p>Built with best practices in mind.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;