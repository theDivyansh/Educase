import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './App.css';


function Acc() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    company: '',
    agency: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle account creation logic here
    console.log('Account creation form submitted:', form);
    // Navigate to account settings after successful creation
    navigate('/account-settings', { state: { name: form.fullName, email: form.email } });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-content">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate('/')}
          >
            ← Back
          </button>
          <h1 className="welcome-title" style={{ marginBottom: 0, marginTop: 8 }}>
            Create your<br />PopX account
          </h1>
          <form className="popx-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="popx-input"
              placeholder=" "
              required
             />
              <label htmlFor="fullName">Full Name<span>*</span>
               </label>
            </div>
            <div className="input-group">
              <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="popx-input"
              placeholder=" "
              required
              />
              <label htmlFor="phone">Phone Number<span>*</span>
              </label>
              </div>
              <div className="input-group">
                <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="popx-input"
                placeholder=" "
                required
                />
                <label htmlFor="email">Email Address<span>*</span>
                </label>
                </div>
                <div className="input-group">
                  <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="popx-input"
                  placeholder=" "
                  required
                  />
                  <label htmlFor="password">Password<span>*</span>
                  </label>
                  </div>
                  <div className="input-group">
                    <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="popx-input"
                    placeholder=" "
                    />
                    <label htmlFor="company">Company Name</label>
                  </div>
            <div className="popx-radio-group">
              <span className="popx-label radio-question">
                Are you an Agency?<sup className="radio-span">*</sup>
              </span>
              <div className="popx-radio-options">
                <label className="popx-radio-label">
                  <input type="radio" name="agency" value="yes" checked={form.agency === 'yes'} onChange={handleChange} />
                  <span className="custom-radio"></span> Yes
                </label>
                <label className="popx-radio-label">
                  <input type="radio" name="agency" value="no" checked={form.agency === 'no'} onChange={handleChange} />
                  <span className="custom-radio"></span> No
                </label>
              </div>
            </div>
            <button className="primary-btn" type="submit" style={{ marginTop: 24 }}>
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="card">
        <div className="card-content">
          <h1 className="welcome-title">Welcome to PopX</h1>
          <p className="welcome-desc">
            Lorem ipsum dolor sit amet,<br />
            consectetur adipiscing elit,
          </p>
          <button className="primary-btn" onClick={() => navigate('/create-account')}>Create Account</button>
          <button className="secondary-btn" onClick={() => navigate('/login')}>Already Registered? Login</button>
        </div>
      </div>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isEmailValid, setIsEmailValid] = useState(false);

  // Simple email validation function
  const validateEmail = (email) => {
    // Basic regex for email validation
    const emailRegex = /.+@.+\..+/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    // Validate email on change
    if (name === 'email') {
      setIsEmailValid(validateEmail(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only proceed with login if email is valid (you might want to add password validation too)
    if (isEmailValid) {
        console.log('Login form submitted:', form);
        // Navigate to account settings after successful login
        navigate('/account-settings', { state: { name: 'User', email: form.email } }); // Assuming a placeholder name for now
    } else {
        console.log('Login failed: Invalid email');
        // Optionally show an error message to the user
    }
  };

  return (
    <div className="container">
      <div className="card-signin">
        <div className="card-content">
          <h1 className="welcome-title">SignIn to your<br />PopX account</h1>
          <p className="welcome-desc">Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit,</p>
          <form className="popx-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="popx-input"
                placeholder=" "
                required
              />
              <label htmlFor="email">Email Address</label>
            </div>
            <div className="input-group">
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="popx-input"
                placeholder=" "
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <button
              className={`primary-btn login-btn ${isEmailValid ? 'valid-email' : ''}`}
              type="submit"
              style={{ marginTop: 20 }}
              disabled={!isEmailValid} // Disable button if email is not valid
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function AccSettings() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email } = location.state || { name: 'N/A', email: 'N/A' }; // Default values if state is not passed

  return (
    <div className="container">
      <div className="card-account-settings">
        <div className="card-settings-content">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
          <h1 className="settings-title">Account Settings</h1>
          <div className="profile-section">
            <img src={profile} alt="Profile" className="profile-img" /> {/* Placeholder image */}
            <div className="profile-info">
              <h2 className="profile-name">{name}</h2>
              <p className="profile-email">{email}</p>
            </div>
          </div>
          <p className="profile-description">
            Lorem ipsum dolor sit amet, consectetur Sadipscing<br />
            Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut<br />
            Labore Et Dolore Magna Aliquyam Erat, Sed Diam
          </p>
          {/* Additional settings content can go here */}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-account" element={<Acc />} />
      <Route path="/login" element={<Login />} />
      <Route path="/account-settings" element={<AccSettings />} />
    </Routes>
  );
}

export default App;