'use client'

import styles from "../page.module.css";
import HomeHeader from "../components/home-page-header";
import Footer from "../components/footer";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    
    // Add your form submission logic here (API call, email service, etc.)
    console.log('Form submitted:', formData);
    
    // Simulate success
    setTimeout(() => {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <main>
      <HomeHeader/>
      <div className={styles.mainContainer}>
        <div className={styles.mainWrapper}>
          <section className={styles.verticalContainer}>
            <div className={styles.titleBox}>
              <h1>Contact Us</h1>
              <p>Have questions? We would love to hear from you.</p>
            </div>
            
            <form onSubmit={handleSubmit} style={{ maxWidth: '600px', width: '100%', margin: '2rem auto' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="subject" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button type="submit" className="primary-btn" style={{ width: '100%' }}>
                Send Message
              </button>

              {status && (
                <p style={{ marginTop: '1rem', textAlign: 'center', color: status.includes('success') ? 'green' : 'orange' }}>
                  {status}
                </p>
              )}
            </form>
          </section>
        </div>
      </div>
      <Footer/>
    </main>
  );
}