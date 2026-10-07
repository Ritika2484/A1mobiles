'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  ShieldCheck,
  Zap,
  ArrowRight,
  ChevronLeft,
  IndianRupee,
  Sparkles,
  Info
} from 'lucide-react';
import {
  VALUATION_BRANDS,
  VALUATION_MODELS,
  CONDITION_DETAILS,
  calculateEstimatedValue
} from '@/data/valuation';
import { DeviceType, DeviceCondition } from '@/types';
import { formatINR } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';
import confetti from 'canvas-confetti';

function SellDeviceContent() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  // Query params prefill
  const paramBrand = searchParams.get('brand') || 'Apple';
  const paramModelId = searchParams.get('modelId') || 'iphone-15-pro-max';
  const paramStorage = searchParams.get('storage') || '256GB';
  const paramCondition = (searchParams.get('condition') as DeviceCondition) || 'like-new';
  const paramCategory = (searchParams.get('category') as DeviceType) || 'phone';

  // Wizard Step (1: Device & Model, 2: Condition & Quote, 3: Contact & Schedule Pickup, 4: Confirmed)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selections
  const [deviceType, setDeviceType] = useState<DeviceType>(paramCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>(paramBrand);
  const [selectedModelId, setSelectedModelId] = useState<string>(paramModelId);
  const [selectedStorage, setSelectedStorage] = useState<string>(paramStorage);
  const [selectedCondition, setSelectedCondition] = useState<DeviceCondition>(paramCondition);

  // Pickup Details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [pickupAddress, setPickupAddress] = useState('Basharatpur, Gorakhpur');
  const [pickupCity, setPickupCity] = useState('Gorakhpur');
  const [pickupPincode, setPickupPincode] = useState('273004');
  const [pickupDate, setPickupDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [pickupTimeSlot, setPickupTimeSlot] = useState('10:00 AM - 01:00 PM');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'bank'>('upi');
  const [upiId, setUpiId] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankIfsc, setBankIfsc] = useState('');
  const [bookingId, setBookingId] = useState('');

  // Brand Models
  const brandModels = useMemo(() => {
    return VALUATION_MODELS.filter((m) => m.brand === selectedBrand);
  }, [selectedBrand]);

  const activeModel = useMemo(() => {
    return (
      VALUATION_MODELS.find((m) => m.id === selectedModelId) ||
      brandModels[0] ||
      VALUATION_MODELS[0]
    );
  }, [selectedModelId, brandModels]);

  // Valuation
  const estimatedPrice = useMemo(() => {
    return calculateEstimatedValue(selectedModelId, selectedStorage, selectedCondition);
  }, [selectedModelId, selectedStorage, selectedCondition]);

  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(brandName);
    const firstModel = VALUATION_MODELS.find((m) => m.brand === brandName);
    if (firstModel) {
      setSelectedModelId(firstModel.id);
      setSelectedStorage(firstModel.storages[0]?.storage || '128GB');
    }
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModelId(modelId);
    const m = VALUATION_MODELS.find((item) => item.id === modelId);
    if (m && !m.storages.some((s) => s.storage === selectedStorage)) {
      setSelectedStorage(m.storages[0]?.storage || '128GB');
    }
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !pickupAddress) {
      showToast('Please fill in your name, phone number, and address', 'error');
      return;
    }
    if (paymentMethod === 'upi' && !upiId) {
      showToast('Please enter your UPI ID for instant payout', 'error');
      return;
    }

    const genId = `A1-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(genId);
    setCurrentStep(4);
    confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
    showToast('Pickup Scheduled Successfully! Our agent will call you shortly.', 'success');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white py-12 sm:py-16 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>A1 Recommerce • Gorakhpur</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Sell Your Old Device With A1
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl mx-auto">
            Get a fair price, free pickup and secure payment directly at your doorstep in Gorakhpur and surrounding areas.
          </p>

          {/* Quick Steps Progress Bar */}
          <div className="max-w-2xl mx-auto mt-8 grid grid-cols-3 gap-2 text-xs font-bold">
            <div
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 ${
                currentStep >= 1
                  ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center">
                1
              </span>
              <span>Select Device</span>
            </div>

            <div
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 ${
                currentStep >= 2
                  ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center">
                2
              </span>
              <span>Condition &amp; Quote</span>
            </div>

            <div
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 ${
                currentStep >= 3
                  ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center">
                3
              </span>
              <span>Pickup &amp; Payout</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN WIZARD CONTAINER */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
          {/* STEP 1: Select Device Type, Brand, Model & Storage */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in-50">
              {/* 1. Device Category */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">
                    1
                  </span>
                  <span>Select Device Category</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'phone', label: 'Sell Phone', icon: Smartphone },
                    { id: 'laptop', label: 'Sell Laptop', icon: Laptop },
                    { id: 'tablet', label: 'Sell Tablet', icon: Tablet },
                    { id: 'smartwatch', label: 'Sell Smartwatch', icon: Watch }
                  ].map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = deviceType === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setDeviceType(cat.id as DeviceType)}
                        className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50/50 text-orange-600 shadow-xs ring-2 ring-orange-100'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-xs font-bold">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Select Brand */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">
                    2
                  </span>
                  <span>Select Brand</span>
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                  {VALUATION_BRANDS.map((b) => {
                    const isSelected = selectedBrand === b.name;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => handleBrandSelect(b.name)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all border text-center ${
                          isSelected
                            ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300'
                        }`}
                      >
                        {b.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Select Model */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">
                      3
                    </span>
                    <span>Select Model</span>
                  </h3>
                  <span className="text-xs text-slate-500">{brandModels.length} models for {selectedBrand}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-1">
                  {brandModels.map((m) => {
                    const isSelected = selectedModelId === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleModelSelect(m.id)}
                        className={`p-3.5 rounded-xl text-left border transition-all ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50/40 shadow-xs ring-2 ring-orange-100'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <span className={`block text-xs font-bold ${isSelected ? 'text-orange-600' : 'text-slate-900'}`}>
                          {m.name}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">
                          Base Quote: {formatINR(m.basePrice)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Select Storage */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">
                    4
                  </span>
                  <span>Select Storage Variant</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {activeModel.storages.map((s) => {
                    const isSelected = selectedStorage === s.storage;
                    return (
                      <button
                        key={s.storage}
                        type="button"
                        onClick={() => setSelectedStorage(s.storage)}
                        className={`px-5 py-3 rounded-xl text-xs font-bold border transition-all ${
                          isSelected
                            ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300'
                        }`}
                      >
                        {s.storage}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 1 Actions */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Selected: <strong>{activeModel.name} ({selectedStorage})</strong>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/20 transition-all hover:-translate-y-0.5"
                >
                  <span>Select Device Condition</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Condition & Instant Estimated Price */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in-50">
              <div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-4"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Device Selection</span>
                </button>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Select Device Physical Condition
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Be honest about device condition for a seamless doorstep transaction without price renegotiation.
                </p>
              </div>

              {/* 4 Conditions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(['like-new', 'good', 'fair', 'damaged'] as DeviceCondition[]).map((cond) => {
                  const info = CONDITION_DETAILS[cond];
                  const isSelected = selectedCondition === cond;
                  return (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => setSelectedCondition(cond)}
                      className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50/50 shadow-md ring-2 ring-orange-200'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-base font-extrabold ${isSelected ? 'text-orange-600' : 'text-slate-900'}`}>
                            {info.name}
                          </span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            isSelected ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {info.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {info.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-400">Calculated Payout</span>
                        <span className="text-orange-600 font-black text-sm">
                          {formatINR(calculateEstimatedValue(selectedModelId, selectedStorage, cond))}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Valuation Summary Card */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-orange-400 block mb-1">
                    Verified Resale Quote
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black">
                    {activeModel.name} • {selectedStorage}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Condition: <strong className="text-slate-200">{CONDITION_DETAILS[selectedCondition].name}</strong> • Free pickup in Gorakhpur
                  </p>
                </div>

                <div className="text-center sm:text-right">
                  <span className="text-xs uppercase text-slate-400 font-semibold block">You Get</span>
                  <div className="text-3xl sm:text-4xl font-black text-orange-400">
                    {formatINR(estimatedPrice)}
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Instant UPI / Bank Transfer</span>
                </div>
              </div>

              {/* Step 2 Actions */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Change Device
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/20 transition-all hover:-translate-y-0.5"
                >
                  <span>Schedule Free Pickup</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Contact Details & Schedule Pickup */}
          {currentStep === 3 && (
            <form onSubmit={handleScheduleSubmit} className="space-y-6 animate-in fade-in-50">
              <div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-3"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Valuation Quote</span>
                </button>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Pickup &amp; Payment Details
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Our verified executive will arrive at your address, check your device, and transfer ₹{estimatedPrice.toLocaleString('en-IN')} instantly.
                </p>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Phone Number (For Pickup Verification) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Doorstep Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="House / Flat No., Landmark, Basharatpur"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupPincode}
                    onChange={(e) => setPickupPincode(e.target.value)}
                    placeholder="273004"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Preferred Time Slot *
                  </label>
                  <select
                    value={pickupTimeSlot}
                    onChange={(e) => setPickupTimeSlot(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-orange-500"
                  >
                    <option value="10:00 AM - 01:00 PM">Morning (10:00 AM - 01:00 PM)</option>
                    <option value="01:00 PM - 04:00 PM">Afternoon (01:00 PM - 04:00 PM)</option>
                    <option value="04:00 PM - 07:00 PM">Evening (04:00 PM - 07:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Payment Mode */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
                  How Would You Like to Receive Payment?
                </span>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    Instant UPI (GPay / PhonePe / Paytm)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                      paymentMethod === 'bank'
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    Direct Bank Transfer (NEFT / IMPS)
                  </button>
                </div>

                {paymentMethod === 'upi' ? (
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Enter UPI ID (e.g. mobile@upi)
                    </label>
                    <input
                      type="text"
                      required
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="9876543210@paytm"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-hidden focus:border-orange-500"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={bankAccount}
                      onChange={(e) => setBankAccount(e.target.value)}
                      placeholder="Account Number"
                      className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm"
                    />
                    <input
                      type="text"
                      required
                      value={bankIfsc}
                      onChange={(e) => setBankIfsc(e.target.value)}
                      placeholder="IFSC Code"
                      className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-9 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-sm sm:text-base shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-0.5"
                >
                  <span>CONFIRM PICKUP BOOKING</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Confirmed Success Screen */}
          {currentStep === 4 && (
            <div className="text-center py-8 space-y-6 animate-in zoom-in-95">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block">
                  Booking Confirmed
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  Pickup Scheduled Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                  Booking ID: <strong className="text-slate-900 font-mono">{bookingId}</strong>. Our Gorakhpur field executive will inspect your device and transfer the funds on the spot.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left max-w-md mx-auto space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Device</span>
                  <span className="font-bold text-slate-900">{activeModel.name} ({selectedStorage})</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Condition</span>
                  <span className="font-bold text-slate-900">{CONDITION_DETAILS[selectedCondition].name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Pickup Date &amp; Time</span>
                  <span className="font-bold text-slate-900">{pickupDate} ({pickupTimeSlot})</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Pickup Address</span>
                  <span className="font-bold text-slate-900">{pickupAddress}, {pickupCity}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-extrabold text-slate-900 text-sm">Amount to Receive</span>
                  <span className="font-black text-orange-600 text-base">{formatINR(estimatedPrice)}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors"
                >
                  Return to Home
                </Link>
                <Link
                  href="/shop?category=smartphones"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors"
                >
                  Explore New Smartphones →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SellDevicePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading Device Valuation...</div>}>
      <SellDeviceContent />
    </Suspense>
  );
}
