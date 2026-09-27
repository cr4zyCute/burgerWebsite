import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, Send } from 'lucide-react';
import { AnnouncementBar } from '../../components/layout/AnnouncementBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { CartDrawer } from '../../components/cart/CartDrawer';
import { useSettingsStore } from '../../stores/useSettingsStore';

export const ContactPage: React.FC = () => {
  const { settings } = useSettingsStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
    message: '',
  });

  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setIsSent(true);
      setForm({ name: '', email: '', phone: '', subject: 'General Question', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#171717]">
      <AnnouncementBar />
      <Navbar />

      <section className="bg-[#171717] text-white py-14 border-b-4 border-[#A82D24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-block bg-[#E9B949] text-[#171717] font-display font-extrabold uppercase text-xs tracking-[0.2em] px-3 py-1">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-display uppercase text-white leading-none">
            Contact Kitchen & Catering
          </h1>
          <p className="text-sm sm:text-base font-body text-[#FAF8F3]/75 max-w-xl mx-auto">
            Questions regarding private events, catering trailers, allergen precautions, or media inquiries?
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl font-black font-display uppercase text-[#171717] mb-2">
                We'd Love to Hear From You
              </h2>
              <p className="text-sm font-body text-[#77736E] leading-relaxed">
                Our kitchen managers check messages continuously throughout service hours. For immediate pickup order issues, please call the store location directly.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white border-2 border-[#171717]">
                <div className="w-10 h-10 bg-[#F5F0E6] border border-[#171717] flex items-center justify-center text-[#A82D24] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base uppercase text-[#171717]">
                    Headquarters
                  </h4>
                  <p className="text-xs text-[#77736E] font-body mt-0.5">{settings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white border-2 border-[#171717]">
                <div className="w-10 h-10 bg-[#F5F0E6] border border-[#171717] flex items-center justify-center text-[#A82D24] flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base uppercase text-[#171717]">
                    Direct Telephone
                  </h4>
                  <p className="text-xs text-[#77736E] font-body mt-0.5">{settings.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white border-2 border-[#171717]">
                <div className="w-10 h-10 bg-[#F5F0E6] border border-[#171717] flex items-center justify-center text-[#A82D24] flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base uppercase text-[#171717]">
                    Email Inquiries
                  </h4>
                  <p className="text-xs text-[#77736E] font-body mt-0.5">{settings.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border-4 border-[#171717] p-8 shadow-[8px_8px_0px_0px_#171717]">
            {isSent ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-[#F5F0E6] border-2 border-[#171717] flex items-center justify-center mx-auto text-[#A82D24]">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-display font-black text-3xl uppercase text-[#171717]">
                  Message Dispatched!
                </h3>
                <p className="text-xs text-[#77736E] font-body max-w-sm mx-auto">
                  Thank you for reaching out. Our general manager will respond to your inquiry within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#171717] text-xs font-display uppercase font-bold focus:outline-none cursor-pointer"
                    >
                      <option value="General Question">General Question</option>
                      <option value="Event Catering">Event Catering & Large Orders</option>
                      <option value="Allergen Question">Allergen / Dietary Clarification</option>
                      <option value="Feedback">Feedback on Recent Order</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase font-display text-[#171717] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your event, feedback, or inquiry..."
                    className="w-full p-3 bg-[#FAF8F3] border border-[#171717] text-xs font-body focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#A82D24] hover:bg-[#8C231B] text-white font-display font-black uppercase text-base tracking-wider flex items-center justify-center gap-2 border border-[#A82D24] transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};
