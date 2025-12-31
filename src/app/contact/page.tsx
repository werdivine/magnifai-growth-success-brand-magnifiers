'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setSubmitted(true);
    };

    return (
        <>
            <Header />
            <main style={{ minHeight: '100vh', background: '#0A0A0B' }}>

                <section style={{ padding: '8rem 2rem 6rem' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                        {/* Header */}
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <span style={{
                                color: '#6366f1',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                                fontSize: '0.875rem',
                                marginBottom: '1rem',
                                display: 'block'
                            }}>Get In Touch</span>
                            <h1 style={{
                                fontSize: '3.5rem',
                                fontFamily: 'var(--font-playfair)',
                                fontWeight: 700,
                                color: '#fff',
                                marginBottom: '1rem'
                            }}>Let&apos;s Build Something Amazing</h1>
                            <p style={{
                                color: '#94a3b8',
                                fontSize: '1.25rem',
                                maxWidth: '600px',
                                margin: '0 auto'
                            }}>
                                Ready to transform your business? We&apos;d love to hear from you.
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                            gap: '4rem'
                        }}>

                            {/* Contact Info */}
                            <div>
                                <h2 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    color: '#fff',
                                    marginBottom: '2rem'
                                }}>Contact Information</h2>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '0.75rem',
                                            background: 'rgba(99, 102, 241, 0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#6366f1'
                                        }}>
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Email</div>
                                            <div style={{ color: '#fff', fontWeight: 600 }}>hello@wemagnifai.com</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '0.75rem',
                                            background: 'rgba(99, 102, 241, 0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#6366f1'
                                        }}>
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Phone</div>
                                            <div style={{ color: '#fff', fontWeight: 600 }}>+1 (555) 123-4567</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '0.75rem',
                                            background: 'rgba(99, 102, 241, 0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#6366f1'
                                        }}>
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Location</div>
                                            <div style={{ color: '#fff', fontWeight: 600 }}>Remote-First | Global</div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    marginTop: '3rem',
                                    padding: '2rem',
                                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                                    borderRadius: '1rem',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Response Time</h3>
                                    <p style={{ color: '#cbd5e1' }}>
                                        We typically respond within 2-4 business hours during weekdays. For urgent matters, please mention &quot;URGENT&quot; in your subject.
                                    </p>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div style={{
                                background: 'rgba(18, 18, 20, 0.95)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '1.5rem',
                                padding: '2.5rem'
                            }}>
                                {submitted ? (
                                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                                        <CheckCircle size={64} style={{ color: '#10b981', marginBottom: '1.5rem' }} />
                                        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>
                                            Message Sent!
                                        </h2>
                                        <p style={{ color: '#94a3b8' }}>
                                            We&apos;ll get back to you within 24 hours.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <h2 style={{
                                            fontSize: '1.5rem',
                                            fontWeight: 700,
                                            color: '#fff',
                                            marginBottom: '2rem'
                                        }}>Send Us a Message</h2>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                            <div>
                                                <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontWeight: 600 }}>Name *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.875rem 1rem',
                                                        borderRadius: '0.5rem',
                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                        background: 'rgba(0,0,0,0.3)',
                                                        color: '#fff',
                                                        fontSize: '1rem'
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontWeight: 600 }}>Email *</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.875rem 1rem',
                                                        borderRadius: '0.5rem',
                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                        background: 'rgba(0,0,0,0.3)',
                                                        color: '#fff',
                                                        fontSize: '1rem'
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontWeight: 600 }}>Company</label>
                                                <input
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.875rem 1rem',
                                                        borderRadius: '0.5rem',
                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                        background: 'rgba(0,0,0,0.3)',
                                                        color: '#fff',
                                                        fontSize: '1rem'
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontWeight: 600 }}>Service Interested In</label>
                                                <select
                                                    value={formData.service}
                                                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.875rem 1rem',
                                                        borderRadius: '0.5rem',
                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                        background: 'rgba(0,0,0,0.3)',
                                                        color: '#fff',
                                                        fontSize: '1rem'
                                                    }}
                                                >
                                                    <option value="">Select a service...</option>
                                                    <option value="creative">Creative Design</option>
                                                    <option value="marketing">Digital Marketing</option>
                                                    <option value="ai">AI Automation</option>
                                                    <option value="development">Web Development</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontWeight: 600 }}>Message *</label>
                                                <textarea
                                                    required
                                                    rows={4}
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.875rem 1rem',
                                                        borderRadius: '0.5rem',
                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                        background: 'rgba(0,0,0,0.3)',
                                                        color: '#fff',
                                                        fontSize: '1rem',
                                                        resize: 'vertical'
                                                    }}
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '0.5rem',
                                                    width: '100%',
                                                    padding: '1rem',
                                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                                    border: 'none',
                                                    borderRadius: '0.75rem',
                                                    color: '#fff',
                                                    fontSize: '1rem',
                                                    fontWeight: 700,
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Send Message <Send size={18} />
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>

                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
