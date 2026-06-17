import { useState } from 'react';
import { submitContact } from '../api';
import toast from 'react-hot-toast';
import './Contact.css';

const EVENT_TYPES = [
  { value:'concert', label:'Concert / Festival' },
  { value:'corporate', label:'Corporate Event' },
  { value:'wedding', label:'Wedding' },
  { value:'state', label:'State Event' },
  { value:'social', label:'Social / Gala' },
  { value:'fashion', label:'Fashion Event' },
  { value:'theatre', label:'Theatre & Arts' },
  { value:'other', label:'Other' },
];

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', eventType:'other', message:'' });
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(form);
      toast.success('Inquiry sent! We\'ll be in touch soon.');
      setForm({ name:'', email:'', phone:'', eventType:'other', message:'' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <div className="contact-left reveal">
          <p className="eyebrow">Let's Create</p>
          <h2 className="section-title">BRING YOUR<br/>VISION<br/>TO LIFE</h2>
          <div className="contact-details">
            <div className="contact-row">
              <span>📱</span>
              <div>
                <div className="c-label">WhatsApp</div>
                <div className="c-value">+1 (332) 222-4827</div>
              </div>
            </div>
            <div className="contact-row">
              <span>✉️</span>
              <div>
                <div className="c-label">Email</div>
                <div className="c-value">info@infinityeventsint.com</div>
              </div>
            </div>
            <div className="contact-row">
              <span>🌐</span>
              <div>
                <div className="c-label">Web</div>
                <div className="c-value">www.infinityeventsint.com</div>
              </div>
            </div>
          </div>
          <div className="hub-badges">
            {['USA','Dubai','Maldives','Indonesia','Sri Lanka'].map(h => (
              <span key={h} className="hub-badge">{h}</span>
            ))}
          </div>
        </div>

        <div className="contact-right reveal">
          <form className="contact-form" onSubmit={submit}>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name *</label>
                <input name="name" value={form.name} onChange={handle} required placeholder="John Silva" />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handle} required placeholder="john@company.com" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input name="phone" value={form.phone} onChange={handle} placeholder="+94 77 000 0000" />
              </div>
              <div className="form-group">
                <label>Event Type</label>
                <select name="eventType" value={form.eventType} onChange={handle}>
                  {EVENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Message *</label>
              <textarea name="message" value={form.message} onChange={handle} required rows={5} placeholder="Tell us about your event..." />
            </div>
            <button type="submit" className="form-submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Inquiry →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
