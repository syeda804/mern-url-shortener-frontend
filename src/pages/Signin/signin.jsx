import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Signin failed.');
        setLoading(false);
        return;
      }

      localStorage.setItem('user', JSON.stringify(data.user));

      setSuccess(true);

      setFormData({
        email: '',
        password: ''
      });

    } catch (error) {
      console.error(error);
      setError('Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-page">

      <div className="split-visual">
        <div className="split-visual-content">
          <h2>Welcome back 👋</h2>
          <p>Log in to pick up right where you left off.</p>
          <div className="split-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className="split-form-side">
        <div className="auth-card">

          <div className="badge">🔐 Sign In</div>

          <h1 className="hero-title">
            Access Your <span>Account</span>
          </h1>

          <p className="hero-subtitle">
            Enter your credentials below to continue.
          </p>

          {error && (
            <div className="error-msg">
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div className="success-msg">
              ✅ Logged in successfully!
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="auth-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>

              <a href="/" className="forgot-link">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <span className="btn-loader"></span>
              ) : (
                'Sign In 🔑'
              )}
            </button>

          </form>

          <p className="auth-switch">
            Don't have an account?{' '}
            <Link to="/signup">Sign Up</Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Signin;