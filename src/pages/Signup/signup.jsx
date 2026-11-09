import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MAX_SIZE_MB = 2;

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef(null);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // preview URL cleanup
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image must be smaller than ${MAX_SIZE_MB}MB.`);
      return;
    }

    setError('');
    setProfilePicture(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setProfilePicture(null);
    setPreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const body = new FormData();
      body.append('name', formData.name);
      body.append('email', formData.email);
      body.append('password', formData.password);
      if (profilePicture) {
        // field name backend route ke upload.single('profilePicture') se match hona chahiye
        body.append('profilePicture', profilePicture);
      }

      // NOTE: Content-Type header manually set na karein, browser boundary khud lagata hai
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        body
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Signup failed.');
        setLoading(false);
        return;
      }

      setSuccess(true);

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      removeImage();

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
          <h2>Join us today 🚀</h2>
          <p>Create an account and start building something great.</p>
          <div className="split-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className="split-form-side">
        <div className="auth-card">

          <div className="badge">🔐 Sign Up</div>

          <h1 className="hero-title">
            Create Your <span>Account</span>
          </h1>

          <p className="hero-subtitle">
            Fill in your details below to get started.
          </p>

          {error && (
            <div className="error-msg">
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div className="success-msg">
              ✅ Account created successfully!
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>

            <div className="avatar-upload">
              <div
                className="avatar-placeholder"
                onClick={() => fileInputRef.current.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current.click()}
              >
                {preview ? (
                  <img src={preview} alt="Profile preview" />
                ) : (
                  <div className="avatar-empty">
                    <span className="avatar-icon">📷</span>
                    <small>Upload photo</small>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />

              {preview && (
                <button type="button" className="avatar-remove" onClick={removeImage}>
                  ✕ Remove
                </button>
              )}
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

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

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <span className="btn-loader"></span>
              ) : (
                'Create Account 🚀'
              )}
            </button>

          </form>

          <p className="auth-switch">
            Already have an account?{' '}
            <Link to="/signin">Sign In</Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Signup;