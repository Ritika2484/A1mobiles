import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ShieldCheck,
  Award,
  Users,
  Truck,
  Building,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | A1 Mobile Shop',
  description: 'Learn about A1 Mobile Shop, our mission, values, and commitment to providing genuine mobile electronics across India.',
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            About Our Company
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Connecting India to <br />
            <span className="text-indigo-600">Next-Generation Technology</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Founded with a passion for innovation, A1 Mobile Shop is India&apos;s trusted destination for authentic flagship smartphones, premium smart audio, wearables, and high-performance mobile gear.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Happy Customers', val: '50,000+' },
            { label: 'Genuine Products', val: '100%' },
            { label: 'Authorized Brands', val: '25+' },
            { label: 'Pin Codes Served', val: '19,000+' },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200/80 text-center shadow-xs">
              <span className="text-3xl sm:text-4xl font-black text-indigo-600 block mb-1">
                {stat.val}
              </span>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Brand Mission & Story */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Our Vision
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
              Tech Retail Reimagined for Indian Consumers
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We started A1 Mobile Shop with a straightforward belief: buying the latest smartphone or tech accessory should be exciting, transparent, and completely free of anxiety about counterfeit products or delayed deliveries.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every single device that leaves our warehouse comes in manufacturer-sealed packaging, backed by official brand warranties and prompt support via WhatsApp, phone, and email.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Direct Brand Sourcing',
                desc: 'Official direct partnerships with Apple, Samsung, OnePlus, Google, and top global brands.',
              },
              {
                title: 'Tamper-Evident Packaging',
                desc: 'Specialized high-security shipping packaging ensures your valuable device arrives pristine.',
              },
              {
                title: 'Fair & Transparent Pricing',
                desc: 'Zero hidden fees, instant bank discounts, and the best exchange value for your older phone.',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Store Spotlight */}
        <div className="bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/50 rounded-3xl border border-indigo-100 p-8 sm:p-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block">
              Flagship Experience Store
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Visit Us at Basharatpur, Gorakhpur
            </h3>
            <p className="text-sm text-slate-600 max-w-xl">
              Experience the latest smartphones in person with live demo units, hands-on audio stations, and instant doorstep trade-in evaluations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="https://instagram.com/a1mobileshop26"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs hover:from-purple-700 hover:to-pink-700 transition-all shadow-md shadow-pink-500/20"
            >
              <span>Follow @a1mobileshop26</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-xs hover:bg-slate-50 transition-all"
            >
              <span>Get Directions</span>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30"
          >
            <span>DISCOVER OUR STORE CATALOG</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
