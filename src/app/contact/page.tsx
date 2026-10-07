'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  HelpCircle
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill all required fields', 'error');
      return;
    }
    setIsSubmitted(true);
    showToast('Your message has been sent successfully! Our team will respond within 4 business hours.', 'success');
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Contact A1 Mobile Shop
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Have questions about a smartphone, your order status, or warranty claims? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards & Stores */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Info */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-5">
              <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
                Customer Support
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <a
                  href="tel:+919876543210"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-indigo-900 hover:bg-indigo-100/70 transition-colors group"
                >
                  <Phone className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Phone Support</strong>
                    <span>+91 98765 43210</span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">Mon - Sat, 10:00 AM - 8:00 PM IST</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-emerald-900 hover:bg-emerald-100/70 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">WhatsApp Direct Chat</strong>
                    <span>Instant assistance &amp; live video verification</span>
                    <span className="block text-[11px] text-emerald-700 font-semibold mt-0.5">Typically replies in 5 minutes</span>
                  </div>
                </a>

                <a
                  href="https://instagram.com/a1mobileshop26"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-gradient-to-r from-purple-50 via-pink-50 to-white border border-pink-200/80 text-pink-900 hover:bg-pink-100/50 transition-colors"
                >
                  <div className="w-5 h-5 rounded-lg bg-pink-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold">Official Instagram</strong>
                    <span>@a1mobileshop26</span>
                    <span className="block text-[11px] text-pink-700 font-semibold mt-0.5">Follow for daily unboxings &amp; flash offers</span>
                  </div>
                </a>

                <a
                  href="mailto:support@a1mobileshop.in"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Mail className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Email Inquiries</strong>
                    <span>support@a1mobileshop.in</span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">Response within 4 business hours</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Flagship Store Locations */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                <span>Our Retail Store Locations</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl">
                  <div className="flex items-center justify-between mb-1">
                    <strong className="block text-slate-900 font-bold text-sm">Gorakhpur Flagship Store</strong>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white">Main Center</span>
                  </div>
                  <p className="text-xs text-slate-800 font-semibold">Basharatpur, Gorakhpur, Uttar Pradesh - 273004</p>
                  <p className="text-[11px] text-slate-500 mt-1">Open 7 Days: 10:00 AM – 9:00 PM IST</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <strong className="block text-slate-900 font-bold text-sm">Lucknow Partner Center</strong>
                  <p className="mt-0.5">Hazratganj Main Road, Lucknow, Uttar Pradesh 226001</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <strong className="block text-slate-900 font-bold text-sm">Mumbai Distribution Hub</strong>
                  <p className="mt-0.5">Linking Road, Bandra West, Mumbai, Maharashtra 400050</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm">
            <h3 className="text-xl font-black text-slate-950 mb-1">
              Send Us a Message
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill out the form below and an A1 tech specialist will reach out shortly.
            </p>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Message Received!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you for contacting A1 Mobile Shop. Your ticket number is <strong>#TK-{Math.floor(10000 + Math.random() * 90000)}</strong>. We will reply to {form.email} soon.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Priya Singh"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. priya@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 00000"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-indigo-600 focus:outline-none bg-white cursor-pointer"
                    >
                      <option value="general">Product Inquiries &amp; Stock</option>
                      <option value="order">Order Tracking &amp; Delivery</option>
                      <option value="warranty">Warranty &amp; Returns</option>
                      <option value="corporate">Bulk / Corporate Purchase</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what you need help with..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-indigo-600 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/25"
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
