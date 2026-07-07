import { Link } from 'react-router-dom'
import logoFooter from '../assets/logoOriginal.png'
import playStoreBadge from '../assets/playstore.png'
import appleLogoBadge from '../assets/apple-logo.png'
import './BottomSection.css'

function BottomSection() {
  return (
    <div className="bottom-section">
      {/* List Your Property CTA */}
      <section className="cta-section">
        <div className="cta-banner">
          <div className="cta-inner">
            <div className="cta-left">
              <h2 className="cta-title">List your property in minutes</h2>
              <p className="cta-subtitle">Reach thousands of verified buyers and tenants.</p>
              <div className="cta-features">
                <span className="cta-feature">
                  <span className="cta-feature-icon">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M5 12l5 5L19 7" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  100% Free Listing
                </span>
                <span className="cta-feature-divider"></span>
                <span className="cta-feature">
                  <span className="cta-feature-icon">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round"/><circle cx="10" cy="7" r="4" stroke="#0f172a" strokeWidth="2.5"/></svg>
                  </span>
                  Verified Buyers
                </span>
                <span className="cta-feature-divider"></span>
                <span className="cta-feature">
                  <span className="cta-feature-icon">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="#0f172a" strokeWidth="2" fill="#0f172a"/></svg>
                  </span>
                  Quick Responses
                </span>
              </div>
            </div>
            <div className="cta-center">
              <svg className="cta-building-svg" width="260" height="220" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Main tall building */}
                <rect x="80" y="20" width="60" height="200" rx="4" fill="#1e3a5f"/>
                <rect x="80" y="20" width="60" height="200" rx="4" stroke="#2a5080" strokeWidth="1"/>
                {/* Windows on main building */}
                <rect x="88" y="32" width="12" height="14" rx="2" fill="#4a90d9" opacity="0.8"/>
                <rect x="108" y="32" width="12" height="14" rx="2" fill="#f9a825" opacity="0.9"/>
                <rect x="128" y="32" width="8" height="14" rx="2" fill="#4a90d9" opacity="0.6"/>
                <rect x="88" y="54" width="12" height="14" rx="2" fill="#f9a825" opacity="0.7"/>
                <rect x="108" y="54" width="12" height="14" rx="2" fill="#4a90d9" opacity="0.8"/>
                <rect x="128" y="54" width="8" height="14" rx="2" fill="#4a90d9" opacity="0.5"/>
                <rect x="88" y="76" width="12" height="14" rx="2" fill="#4a90d9" opacity="0.6"/>
                <rect x="108" y="76" width="12" height="14" rx="2" fill="#f9a825" opacity="0.8"/>
                <rect x="128" y="76" width="8" height="14" rx="2" fill="#f9a825" opacity="0.6"/>
                <rect x="88" y="98" width="12" height="14" rx="2" fill="#f9a825" opacity="0.9"/>
                <rect x="108" y="98" width="12" height="14" rx="2" fill="#4a90d9" opacity="0.7"/>
                <rect x="128" y="98" width="8" height="14" rx="2" fill="#4a90d9" opacity="0.8"/>
                <rect x="88" y="120" width="12" height="14" rx="2" fill="#4a90d9" opacity="0.7"/>
                <rect x="108" y="120" width="12" height="14" rx="2" fill="#f9a825" opacity="0.6"/>
                <rect x="128" y="120" width="8" height="14" rx="2" fill="#f9a825" opacity="0.7"/>
                <rect x="88" y="142" width="12" height="14" rx="2" fill="#f9a825" opacity="0.6"/>
                <rect x="108" y="142" width="12" height="14" rx="2" fill="#4a90d9" opacity="0.9"/>
                <rect x="88" y="164" width="12" height="14" rx="2" fill="#4a90d9" opacity="0.8"/>
                <rect x="108" y="164" width="12" height="14" rx="2" fill="#f9a825" opacity="0.7"/>
                {/* Door on main building */}
                <rect x="100" y="192" width="20" height="28" rx="3" fill="#4a90d9" opacity="0.9"/>

                {/* Left shorter building */}
                <rect x="20" y="80" width="52" height="140" rx="4" fill="#1a3050"/>
                <rect x="20" y="80" width="52" height="140" rx="4" stroke="#24456a" strokeWidth="1"/>
                {/* Windows on left building */}
                <rect x="28" y="92" width="10" height="12" rx="2" fill="#4a90d9" opacity="0.7"/>
                <rect x="44" y="92" width="10" height="12" rx="2" fill="#f9a825" opacity="0.8"/>
                <rect x="28" y="112" width="10" height="12" rx="2" fill="#f9a825" opacity="0.6"/>
                <rect x="44" y="112" width="10" height="12" rx="2" fill="#4a90d9" opacity="0.8"/>
                <rect x="28" y="132" width="10" height="12" rx="2" fill="#4a90d9" opacity="0.9"/>
                <rect x="44" y="132" width="10" height="12" rx="2" fill="#f9a825" opacity="0.7"/>
                <rect x="28" y="152" width="10" height="12" rx="2" fill="#f9a825" opacity="0.8"/>
                <rect x="44" y="152" width="10" height="12" rx="2" fill="#4a90d9" opacity="0.6"/>
                <rect x="28" y="172" width="10" height="12" rx="2" fill="#4a90d9" opacity="0.7"/>
                <rect x="44" y="172" width="10" height="12" rx="2" fill="#f9a825" opacity="0.9"/>
                {/* Door on left building */}
                <rect x="36" y="196" width="16" height="24" rx="2" fill="#4a90d9" opacity="0.8"/>

                {/* Right medium building */}
                <rect x="148" y="55" width="50" height="165" rx="4" fill="#1c3555"/>
                <rect x="148" y="55" width="50" height="165" rx="4" stroke="#275080" strokeWidth="1"/>
                {/* Windows on right building */}
                <rect x="156" y="66" width="10" height="12" rx="2" fill="#f9a825" opacity="0.8"/>
                <rect x="172" y="66" width="10" height="12" rx="2" fill="#4a90d9" opacity="0.7"/>
                <rect x="156" y="86" width="10" height="12" rx="2" fill="#4a90d9" opacity="0.9"/>
                <rect x="172" y="86" width="10" height="12" rx="2" fill="#f9a825" opacity="0.6"/>
                <rect x="156" y="106" width="10" height="12" rx="2" fill="#f9a825" opacity="0.7"/>
                <rect x="172" y="106" width="10" height="12" rx="2" fill="#4a90d9" opacity="0.8"/>
                <rect x="156" y="126" width="10" height="12" rx="2" fill="#4a90d9" opacity="0.6"/>
                <rect x="172" y="126" width="10" height="12" rx="2" fill="#f9a825" opacity="0.9"/>
                <rect x="156" y="146" width="10" height="12" rx="2" fill="#f9a825" opacity="0.8"/>
                <rect x="172" y="146" width="10" height="12" rx="2" fill="#4a90d9" opacity="0.7"/>
                <rect x="156" y="166" width="10" height="12" rx="2" fill="#4a90d9" opacity="0.8"/>
                <rect x="172" y="166" width="10" height="12" rx="2" fill="#f9a825" opacity="0.7"/>
                {/* Door on right building */}
                <rect x="162" y="196" width="16" height="24" rx="2" fill="#f9a825" opacity="0.8"/>

                {/* Far right small building */}
                <rect x="206" y="110" width="40" height="110" rx="4" fill="#162d48"/>
                <rect x="206" y="110" width="40" height="110" rx="4" stroke="#1e3d5e" strokeWidth="1"/>
                <rect x="214" y="120" width="8" height="10" rx="1.5" fill="#4a90d9" opacity="0.7"/>
                <rect x="228" y="120" width="8" height="10" rx="1.5" fill="#f9a825" opacity="0.8"/>
                <rect x="214" y="138" width="8" height="10" rx="1.5" fill="#f9a825" opacity="0.6"/>
                <rect x="228" y="138" width="8" height="10" rx="1.5" fill="#4a90d9" opacity="0.9"/>
                <rect x="214" y="156" width="8" height="10" rx="1.5" fill="#4a90d9" opacity="0.8"/>
                <rect x="228" y="156" width="8" height="10" rx="1.5" fill="#f9a825" opacity="0.7"/>
                <rect x="214" y="174" width="8" height="10" rx="1.5" fill="#f9a825" opacity="0.9"/>
                <rect x="228" y="174" width="8" height="10" rx="1.5" fill="#4a90d9" opacity="0.6"/>
                <rect x="218" y="196" width="14" height="24" rx="2" fill="#4a90d9" opacity="0.8"/>

                {/* Antenna on main building */}
                <line x1="110" y1="4" x2="110" y2="20" stroke="#3a7bc8" strokeWidth="2"/>
                <circle cx="110" cy="4" r="2" fill="#f26522"/>
              </svg>
            </div>
            <div className="cta-right">
              <Link to="/post-property" className="cta-btn">Post Property Now &rarr;</Link>
              <span className="cta-note">It's quick, easy and free!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose CASAX */}
      <section className="why-section">
        <div className="why-inner">
          <h2 className="why-section-title">Why Choose <span className="why-highlight">CASAX</span>?</h2>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">
                <svg width="40" height="40" fill="#0f172a" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
              </div>
              <h3 className="why-title">Trusted Listings</h3>
              <p className="why-desc">All properties are verified for your safety.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <svg width="40" height="40" fill="#0f172a" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
              </div>
              <h3 className="why-title">Verified Agents</h3>
              <p className="why-desc">Deal with experienced and trusted agents.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <svg width="40" height="40" fill="#0f172a" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
              </div>
              <h3 className="why-title">Easy Search</h3>
              <p className="why-desc">Advanced filters to find perfect property.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <svg width="40" height="40" fill="#0f172a" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
              </div>
              <h3 className="why-title">Fast Deals</h3>
              <p className="why-desc">Quick connections and faster transactions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Become an Agent with CASAX */}
      <section className="agent-section">
        <div className="agent-inner">
          <div className="agent-content">
            <div className="agent-left">
              <h2 className="agent-title">Become an Agent<br/>with CASAX</h2>
              <p className="agent-subtitle">Be a part of CASAX and grow with us!</p>
              <ul className="agent-bullets">
                <li>Post Properties</li>
                <li>Earn Attractive Commission</li>
                <li>Work Part Time or Full Time</li>
                <li>Best Opportunity for Everyone</li>
              </ul>
            </div>
            <div className="agent-center">
              <div className="agent-categories">
                <div className="agent-category">
                  <svg width="32" height="32" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  <span>Students</span>
                </div>
                <div className="agent-category-divider"></div>
                <div className="agent-category">
                  <svg width="32" height="32" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                  <span>Un-employed</span>
                </div>
                <div className="agent-category-divider"></div>
                <div className="agent-category">
                  <svg width="32" height="32" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>Part Time</span>
                </div>
                <div className="agent-category-divider"></div>
                <div className="agent-category">
                  <svg width="32" height="32" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
                  <span>Full Time</span>
                </div>
              </div>
              <Link to="/become-agent" className="agent-btn">Join Now &rarr;</Link>
            </div>
            <div className="agent-right">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop" alt="Agent" className="agent-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          {/* Newsletter / Subscribe Bar */}
          <div className="newsletter-bar">
            <div className="newsletter-bar-inner">
              <div className="newsletter-icon">
                <svg width="36" height="36" fill="none" stroke="#f26522" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div className="newsletter-text">
                <h2 className="newsletter-title">Subscribe to our Newsletter</h2>
                <p className="newsletter-subtitle">Get updates on new properties and offers.</p>
              </div>
              <div className="newsletter-form">
                <input type="email" placeholder="Enter your email address" className="newsletter-input" />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>
          </div>

          <div className="footer-grid">
            <div className="footer-brand">
              <img src={logoFooter} alt="CASAX" className="footer-logo" />
              <p className="footer-brand-text">Your trusted partner in finding the perfect property. We connect buyers, sellers, and renters with their dream spaces.</p>
              <div className="footer-social">
                <a href="#" className="social-link" aria-label="Facebook">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" className="social-link" aria-label="YouTube">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#0f172a"/></svg>
                </a>
              </div>
            </div>
            <div className="footer-links-col">
              <h4 className="footer-col-title">Company</h4>
              <a href="#" className="footer-link">About Us</a>
              <a href="#" className="footer-link">Careers</a>
              <a href="#" className="footer-link">Blog</a>
              <a href="#" className="footer-link">Contact Us</a>
            </div>
            <div className="footer-links-col">
              <h4 className="footer-col-title">Properties</h4>
              <a href="#" className="footer-link">Buy Property</a>
              <a href="#" className="footer-link">Rent Property</a>
              <a href="#" className="footer-link">Sell Property</a>
              <a href="#" className="footer-link">Commercial</a>
            </div>
            <div className="footer-links-col">
              <h4 className="footer-col-title">Resources</h4>
              <a href="#" className="footer-link">Help Center</a>
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">FAQs</a>
            </div>
            <div className="footer-links-col footer-contact-col">
              <h4 className="footer-col-title">Contact Us</h4>
              <p className="footer-contact-item">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                +91 7997 805 805
              </p>
              <p className="footer-contact-item">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                casaxsupport@gmail.com
              </p>
              <p className="footer-contact-item">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Plot 176, Street 4, Road No. 2, Maruthi Nagar, Raghavendra Colony, Beeramguda, Hyderabad, Telangana 502032
              </p>
            </div>
            <div className="footer-app-col">
              <h4 className="footer-col-title">EXPERIENCE CASAX APP ON MOBILE</h4>
              <div className="footer-app-badges">
                <a href="#" className="footer-app-badge">
                  <img src={playStoreBadge} alt="Get it on Google Play" />
                </a>
                <a href="#" className="footer-app-badge">
                  <img src={appleLogoBadge} alt="Download on App Store" />
                </a>
              </div>
              <div className="footer-qr-wrap">
                <div className="footer-qr-placeholder">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <rect width="80" height="80" rx="8" fill="#fff"/>
                    <rect x="8" y="8" width="24" height="24" rx="2" stroke="#0f172a" strokeWidth="2" fill="none"/>
                    <rect x="12" y="12" width="16" height="16" rx="1" fill="#0f172a"/>
                    <rect x="48" y="8" width="24" height="24" rx="2" stroke="#0f172a" strokeWidth="2" fill="none"/>
                    <rect x="52" y="12" width="16" height="16" rx="1" fill="#0f172a"/>
                    <rect x="8" y="48" width="24" height="24" rx="2" stroke="#0f172a" strokeWidth="2" fill="none"/>
                    <rect x="12" y="52" width="16" height="16" rx="1" fill="#0f172a"/>
                    <rect x="36" y="8" width="8" height="8" fill="#0f172a"/>
                    <rect x="36" y="36" width="8" height="8" fill="#0f172a"/>
                    <rect x="48" y="36" width="8" height="8" fill="#0f172a"/>
                    <rect x="60" y="36" width="12" height="8" fill="#0f172a"/>
                    <rect x="36" y="48" width="8" height="8" fill="#0f172a"/>
                    <rect x="48" y="48" width="8" height="12" fill="#0f172a"/>
                    <rect x="60" y="52" width="12" height="8" fill="#0f172a"/>
                    <rect x="48" y="64" width="24" height="8" fill="#0f172a"/>
                    <rect x="36" y="60" width="8" height="12" fill="#0f172a"/>
                  </svg>
                </div>
                <span className="footer-qr-label">Scan to download</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <p>&copy; 2026 CASAX. All rights reserved.</p>
            </div>
            <div className="footer-bottom-right">
              <span className="footer-follow-label">FOLLOW US</span>
              <div className="footer-bottom-social">
                <a href="#" className="social-link-sm" aria-label="Facebook">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="#" className="social-link-sm" aria-label="Twitter">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                </a>
                <a href="#" className="social-link-sm" aria-label="Instagram">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="#" className="social-link-sm" aria-label="LinkedIn">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" className="social-link-sm" aria-label="YouTube">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#1e293b"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default BottomSection
