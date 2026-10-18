import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | A1 Mobile Shop',
  description: 'Learn about A1 Mobile Shop, our mission, values, and commitment to providing genuine mobile electronics across India.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#F5EFE6] min-h-screen py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6E685F]">
            About Our Company
          </span>
          <h1 className="text-4xl sm:text-5xl font-medium text-[#23201C] tracking-tight">
            Connecting India to <br />
            <span className="text-[#564F46]">Next-Generation Technology</span>
          </h1>
          <p className="text-base sm:text-lg text-[#6E685F] leading-relaxed font-normal">
            Founded with a passion for innovation, A1 Mobile Shop is India&apos;s trusted destination for authentic flagship smartphones, premium smart audio, wearables, and high-performance mobile gear.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: 'Happy Customers', val: '50,000+' },
            { label: 'Genuine Products', val: '100%' },
            { label: 'Authorized Brands', val: '25+' },
            { label: 'Pin Codes Served', val: '19,000+' },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[#EAE4D9]/80 border border-[#E0D9CD] text-center shadow-xs">
              <span className="text-3xl sm:text-4xl font-semibold text-[#23201C] block mb-1">
                {stat.val}
              </span>
              <span className="text-xs font-medium text-[#6E685F] uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Brand Mission & Story */}
        <div className="bg-[#EAE4D9]/80 rounded-3xl border border-[#E0D9CD] p-8 sm:p-12 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6E685F]">
              Our Vision
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#23201C]">
              Tech Retail Reimagined for Indian Consumers
            </h2>
            <p className="text-sm text-[#6E685F] leading-relaxed">
              We started A1 Mobile Shop with a straightforward belief: buying the latest smartphone or tech accessory should be exciting, transparent, and completely free of anxiety about counterfeit products or delayed deliveries.
            </p>
            <p className="text-sm text-[#6E685F] leading-relaxed">
              Every single device that leaves our warehouse comes in manufacturer-sealed packaging, backed by official brand warranties and prompt support via WhatsApp, phone, and email.
            </p>
          </div>

          <div className="space-y-3.5">
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
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#F4F0E8] border border-[#DED7CA]">
                <CheckCircle2 className="w-5 h-5 text-[#2E6B47] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm text-[#23201C]">{item.title}</h3>
                  <p className="text-xs text-[#6E685F] mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Store Spotlight */}
        <div className="bg-[#564F46] text-[#F5EFE6] rounded-3xl border border-[#48423A] p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 relative w-full aspect-16/10 rounded-2xl overflow-hidden shadow-md border border-[#6E685F]/50">
            <Image
              src="/images/store.jpg"
              alt="A1 Mobile Shop Basharatpur Gorakhpur Real Store"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#E0D9CD] block">
              Flagship Experience Store
            </span>
            <h3 className="text-xl sm:text-2xl font-medium text-white">
              Visit Us at Basharatpur, Gorakhpur
            </h3>
            <p className="text-sm text-[#EAE4D9]/80 leading-relaxed">
              Experience the latest smartphones in person with live demo units, hands-on audio stations, and instant doorstep trade-in evaluations.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href="https://instagram.com/a1mobileshop26"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto text-center px-6 py-2.5 rounded-full bg-[#F5EFE6] text-[#23201C] font-semibold text-xs hover:bg-white transition-colors"
              >
                Follow @a1mobileshop26
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto text-center px-6 py-2.5 rounded-full bg-[#48423A] border border-[#6E685F] text-[#F5EFE6] font-semibold text-xs hover:bg-[#3D3730] transition-colors"
              >
                Get Directions
              </Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#23201C] hover:bg-[#151311] text-[#F5EFE6] font-medium text-sm transition-colors"
          >
            <span>DISCOVER OUR STORE CATALOG</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
