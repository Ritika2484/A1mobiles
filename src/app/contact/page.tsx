'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function ContactPage() {
  const { showToast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });

  const [ticketNumber, setTicketNumber] = useState<number>(10001);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill all required fields', 'error');
      return;
    }
    setTicketNumber(Math.floor(10000 + Math.random() * 90000));
    setIsSubmitted(true);
    showToast('Your message has been sent successfully! Our team will respond within 4 business hours.', 'success');
  };

  return (
    <div className="bg-[#F5EFE6] min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6E685F] block mb-1">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-medium text-[#23201C] tracking-tight">
            Contact A1 Mobile Shop
          </h1>
          <p className="text-sm text-[#6E685F] mt-2">
            Have questions about a smartphone, your order status, or warranty claims? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards & Stores */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Info */}
            <div className="bg-[#EAE4D9]/80 rounded-3xl border border-[#E0D9CD] p-6 sm:p-7 shadow-sm space-y-5">
              <h3 className="text-lg font-medium text-[#23201C] pb-3 border-b border-[#DED7CA]">
                Customer Support
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <a
                  href="tel:+918726942338"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#F4F0E8] border border-[#DED7CA] text-[#23201C] hover:bg-[#EAE4D9] transition-colors group"
                >
                  <Phone className="w-5 h-5 text-[#23201C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#23201C] font-semibold">Phone Support</strong>
                    <span className="text-[#6E685F]">+91 87269 42338</span>
                    <span className="block text-[11px] text-[#8E867C] mt-0.5">Mon - Sat, 10:00 AM - 8:00 PM IST</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/918726942338"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#E6EFE9] border border-[#C2DEC8] text-[#2E6B47] hover:bg-[#D8EADB] transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-[#2E6B47] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#2E6B47] font-semibold">WhatsApp Direct Chat</strong>
                    <span className="text-[#2E6B47]/90">Instant assistance &amp; live video verification</span>
                    <span className="block text-[11px] text-[#2E6B47] font-medium mt-0.5">Typically replies in 5 minutes</span>
                  </div>
                </a>

                <a
                  href="https://instagram.com/a1mobileshop26"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#F4F0E8] border border-[#DED7CA] text-[#23201C] hover:bg-[#EAE4D9] transition-colors"
                >
                  <div className="w-5 h-5 rounded-lg bg-[#23201C] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <div>
                    <strong className="block text-[#23201C] font-semibold">Official Instagram</strong>
                    <span className="text-[#6E685F]">@a1mobileshop26</span>
                    <span className="block text-[11px] text-[#8E867C] mt-0.5">Follow for daily unboxings &amp; flash offers</span>
                  </div>
                </a>

                <a
                  href="mailto:Jaikishanhome1998@gmail.com"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#F4F0E8] border border-[#DED7CA] text-[#23201C] hover:bg-[#EAE4D9] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#23201C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#23201C] font-semibold">Email Inquiries</strong>
                    <span className="text-[#6E685F]">Jaikishanhome1998@gmail.com</span>
                    <span className="block text-[11px] text-[#8E867C] mt-0.5">Response within 4 business hours</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Flagship Store Locations */}
            <div className="bg-[#EAE4D9]/80 rounded-3xl border border-[#E0D9CD] p-6 sm:p-7 shadow-sm space-y-4">
              <h3 className="text-lg font-medium text-[#23201C] pb-3 border-b border-[#DED7CA] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#23201C]" />
                <span>Our Retail Store Locations</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-4 bg-[#564F46] text-[#F5EFE6] border border-[#48423A] rounded-2xl">
                  <div className="flex items-center justify-between mb-1">
                    <strong className="block text-white font-semibold text-sm">Gorakhpur Flagship Store</strong>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F5EFE6] text-[#23201C]">Main Center</span>
                  </div>
                  <p className="text-xs text-[#EAE4D9]/90 font-medium">Basharatpur, Gorakhpur, Uttar Pradesh - 273004</p>
                  <p className="text-[11px] text-[#DED7CA] mt-1">Open 7 Days: 10:00 AM – 9:00 PM IST</p>
                </div>

                <div className="p-3.5 bg-[#F4F0E8] border border-[#DED7CA] rounded-xl text-[#6E685F]">
                  <strong className="block text-[#23201C] font-semibold text-sm">Lucknow Partner Center</strong>
                  <p className="mt-0.5">Hazratganj Main Road, Lucknow, Uttar Pradesh 226001</p>
                </div>

                <div className="p-3.5 bg-[#F4F0E8] border border-[#DED7CA] rounded-xl text-[#6E685F]">
                  <strong className="block text-[#23201C] font-semibold text-sm">Mumbai Distribution Hub</strong>
                  <p className="mt-0.5">Linking Road, Bandra West, Mumbai, Maharashtra 400050</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#EAE4D9]/80 rounded-3xl border border-[#E0D9CD] p-6 sm:p-10 shadow-sm">
            <h3 className="text-xl font-medium text-[#23201C] mb-1">
              Send Us a Message
            </h3>
            <p className="text-xs text-[#6E685F] mb-6">
              Fill out the form below and an A1 tech specialist will reach out shortly.
            </p>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-[#E6EFE9] border border-[#C2DEC8] text-center space-y-3 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-[#D8EADB] flex items-center justify-center mx-auto text-[#2E6B47]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-medium text-[#23201C]">Message Received!</h4>
                <p className="text-xs text-[#6E685F] max-w-sm mx-auto">
                  Thank you for contacting A1 Mobile Shop. Your ticket number is <strong>#TK-{ticketNumber}</strong>. We will reply to {form.email} soon.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#23201C] text-[#F5EFE6] font-medium text-xs hover:bg-[#151311] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#23201C] block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Priya Singh"
                      className="w-full px-4 py-3 rounded-xl border border-[#DED7CA] bg-[#F4F0E8] text-[#23201C] text-sm focus:border-[#23201C] focus:outline-hidden transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#23201C] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. priya@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#DED7CA] bg-[#F4F0E8] text-[#23201C] text-sm focus:border-[#23201C] focus:outline-hidden transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#23201C] block mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 00000"
                      className="w-full px-4 py-3 rounded-xl border border-[#DED7CA] bg-[#F4F0E8] text-[#23201C] text-sm focus:border-[#23201C] focus:outline-hidden transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#23201C] block mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#DED7CA] bg-[#F4F0E8] text-[#23201C] text-sm focus:border-[#23201C] focus:outline-hidden cursor-pointer"
                    >
                      <option value="general">Product Inquiries &amp; Stock</option>
                      <option value="order">Order Tracking &amp; Delivery</option>
                      <option value="warranty">Warranty &amp; Returns</option>
                      <option value="corporate">Bulk / Corporate Purchase</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#23201C] block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what you need help with..."
                    className="w-full px-4 py-3 rounded-xl border border-[#DED7CA] bg-[#F4F0E8] text-[#23201C] text-sm focus:border-[#23201C] focus:outline-hidden resize-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-[#23201C] hover:bg-[#151311] text-[#F5EFE6] font-medium text-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>SEND MESSAGE</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
