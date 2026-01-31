import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaAndroid, FaApple, FaDownload, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      color: '#e2e8f0',
      padding: '3rem 0 1rem',
      marginTop: 'auto',
      borderTop: '1px solid rgba(148, 163, 184, 0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Company Info */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                <span style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>F</span>
              </div>
              <div>
                <h3 style={{
                  margin: 0,
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#f1f5f9'
                }}>
                  Fintradify
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  color: '#94a3b8'
                }}>
                  HR Portal Pro
                </p>
              </div>
            </div>
            <p style={{
              marginBottom: '1rem',
              lineHeight: 1.6,
              color: '#cbd5e1'
            }}>
              Simplifying workforce management with innovative HR solutions. Streamline your HR processes with our comprehensive portal.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <a href="#" style={{
                color: '#94a3b8',
                fontSize: '1.5rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#4f46e5'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                <FaFacebook />
              </a>
              <a href="#" style={{
                color: '#94a3b8',
                fontSize: '1.5rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#4f46e5'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                <FaTwitter />
              </a>
              <a href="#" style={{
                color: '#94a3b8',
                fontSize: '1.5rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#4f46e5'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                <FaInstagram />
              </a>
              <a href="#" style={{
                color: '#94a3b8',
                fontSize: '1.5rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#4f46e5'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                <FaLinkedin />
              </a>
              <a href="#" style={{
                color: '#94a3b8',
                fontSize: '1.5rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#4f46e5'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              marginBottom: '1rem',
              fontSize: '1.2rem',
              fontWeight: 600,
              color: '#f1f5f9'
            }}>
              Quick Links
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { label: 'Home', href: '/' },
                { label: 'Features', href: '/features' },
                { label: 'Solutions', href: '/solutions' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy-policy' }
              ].map((link, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <a href={link.href} style={{
                    color: '#cbd5e1',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    fontSize: '0.95rem'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#4f46e5'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{
              marginBottom: '1rem',
              fontSize: '1.2rem',
              fontWeight: 600,
              color: '#f1f5f9'
            }}>
              Contact Info
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <FaMapMarkerAlt style={{ color: '#4f46e5', fontSize: '1.1rem' }} />
                <span style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                  123 Business Street, Suite 100<br />
                  New York, NY 10001
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <FaPhone style={{ color: '#4f46e5', fontSize: '1.1rem' }} />
                <span style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                  +1 (555) 123-4567
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <FaEnvelope style={{ color: '#4f46e5', fontSize: '1.1rem' }} />
                <span style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                  support@fintradify.com
                </span>
              </div>
            </div>
          </div>

          {/* App Download Links */}
          <div>
            <h4 style={{
              marginBottom: '1rem',
              fontSize: '1.2rem',
              fontWeight: 600,
              color: '#f1f5f9'
            }}>
              Download App
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <a
                href="https://play.google.com/store/apps/details?id=com.hr.fintradify"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: '#1f2937',
                  color: 'white',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#4f46e5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1f2937';
                }}
              >
                <FaAndroid style={{ color: '#10B981', fontSize: '1.25rem' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Download on</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Google Play</div>
                </div>
                <FaDownload />
              </a>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: '#374151',
                  color: '#9ca3af',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  cursor: 'not-allowed',
                  opacity: 0.7
                }}
              >
                <FaApple style={{ fontSize: '1.25rem' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Coming Soon</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>App Store</div>
                </div>
                <FaDownload />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(148, 163, 184, 0.1)',
          paddingTop: '1.5rem',
          textAlign: 'center'
        }}>
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            color: '#94a3b8'
          }}>
            © {new Date().getFullYear()} Fintradify HR Portal Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer> 
  );
};

export default Footer;
