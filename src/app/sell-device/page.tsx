'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
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
  Sparkles,
  Package,
  Receipt,
  BatteryCharging,
  FileText,
  Check,
  HelpCircle
} from 'lucide-react';
import {
  VALUATION_BRANDS,
  VALUATION_MODELS,
  CONDITION_DETAILS
} from '@/data/valuation';
import { DeviceType, DeviceCondition } from '@/types';
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

  // Wizard Step (1: Device Selection, 2: Condition & Details, 3: Pickup & Payout, 4: Confirmed)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selections
  const [deviceType, setDeviceType] = useState<DeviceType>(paramCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>(paramBrand);
  const [selectedModelId, setSelectedModelId] = useState<string>(paramModelId);
  const [customModelName, setCustomModelName] = useState<string>('');
  const [selectedStorage, setSelectedStorage] = useState<string>(paramStorage);
  const [customStorage, setCustomStorage] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<DeviceCondition>(paramCondition);

  // Device Details & Accessories
  const [hasBox, setHasBox] = useState<boolean>(true);
  const [hasCharger, setHasCharger] = useState<boolean>(true);
  const [hasBill, setHasBill] = useState<boolean>(true);
  const [underWarranty, setUnderWarranty] = useState<boolean>(false);
  const [deviceAge, setDeviceAge] = useState<string>('3-11 months');
  const [deviceColor, setDeviceColor] = useState<string>('');
  const [batteryHealth, setBatteryHealth] = useState<string>('');
  const [deviceNotes, setDeviceNotes] = useState<string>('');

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

  // Display Name & Storage
  const deviceDisplayName = useMemo(() => {
    if (customModelName.trim()) {
      return customModelName.trim();
    }
    return activeModel?.name || 'Selected Device';
  }, [customModelName, activeModel]);

  const deviceDisplayStorage = useMemo(() => {
    if (customStorage.trim()) {
      return customStorage.trim();
    }
    return selectedStorage || 'Standard Variant';
  }, [customStorage, selectedStorage]);

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
    setCustomModelName('');
    const m = VALUATION_MODELS.find((item) => item.id === modelId);
    if (m && !m.storages.some((s) => s.storage === selectedStorage)) {
      setSelectedStorage(m.storages[0]?.storage || '128GB');
    }
  };

  const handleProceedToStep2 = () => {
    const model = customModelName.trim() || activeModel?.name;
    if (!model) {
      showToast('Please select or enter your device model name (Required)', 'error');
      return;
    }
    const storage = customStorage.trim() || selectedStorage;
    if (!storage) {
      showToast('Please select or enter your storage variant (Required)', 'error');
      return;
    }
    setCurrentStep(2);
  };

  const handleProceedToStep3 = () => {
    if (!deviceColor.trim()) {
      showToast('Please enter your device color (Required)', 'error');
      return;
    }
    if (!deviceAge.trim()) {
      showToast('Please select approximate device age (Required)', 'error');
      return;
    }
    if (!batteryHealth.trim()) {
      showToast('Please enter battery health % or condition (Required)', 'error');
      return;
    }
    if (!deviceNotes.trim()) {
      showToast('Please enter device condition notes or defect details (Required)', 'error');
      return;
    }
    setCurrentStep(3);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !customerName.trim() ||
      !customerPhone.trim() ||
      !customerEmail.trim() ||
      !pickupAddress.trim() ||
      !pickupPincode.trim() ||
      !pickupDate ||
      !pickupTimeSlot
    ) {
      showToast('Please fill in all required contact and pickup address fields', 'error');
      return;
    }
    if (paymentMethod === 'upi' && !upiId.trim()) {
      showToast('Please enter your UPI ID for instant payout (Required)', 'error');
      return;
    }
    if (paymentMethod === 'bank' && (!bankAccount.trim() || !bankIfsc.trim())) {
      showToast('Please enter your Bank Account Number and IFSC code (Required)', 'error');
      return;
    }

    const genId = `A1-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(genId);
    setCurrentStep(4);
    confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
    showToast('Pickup Scheduled Successfully! Our executive will inspect your device and transfer funds.', 'success');
  };

  // Compile accessories list
  const accessoriesList = useMemo(() => {
    const list: string[] = [];
    if (hasBox) list.push('Original Box');
    if (hasCharger) list.push('Original Charger & Cable');
    if (hasBill) list.push('Valid Purchase Bill');
    if (underWarranty) list.push('Under Warranty');
    return list;
  }, [hasBox, hasCharger, hasBill, underWarranty]);

  return (
    <div className="bg-[#F5EFE6] min-h-screen pb-16">
      {/* 1. HERO SECTION */}
      <section className="bg-[#564F46] text-[#F5EFE6] py-12 sm:py-16 border-b border-[#3E3831] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#48423A] border border-[#6E685F]/50 text-[#F5EFE6] text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>A1 Recommerce • Gorakhpur</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#F5EFE6]">
            Sell Your Old Device With A1
          </h1>

          <p className="text-sm sm:text-base text-[#E0D9CD] mt-2 max-w-xl mx-auto">
            Enter your device details, schedule a free doorstep pickup in Gorakhpur, and receive instant payment upon physical inspection.
          </p>

          {/* Quick Steps Progress Bar */}
          <div className="max-w-2xl mx-auto mt-8 grid grid-cols-3 gap-2 text-xs font-bold">
            <div
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 ${
                currentStep >= 1
                  ? 'bg-[#23201C] border-[#23201C] text-[#F5EFE6]'
                  : 'bg-[#48423A] border-[#3E3831] text-[#A0988E]'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#EAE4D9] text-[#23201C] text-[10px] flex items-center justify-center font-bold">
                1
              </span>
              <span>Select Device</span>
            </div>

            <div
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 ${
                currentStep >= 2
                  ? 'bg-[#23201C] border-[#23201C] text-[#F5EFE6]'
                  : 'bg-[#48423A] border-[#3E3831] text-[#A0988E]'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#EAE4D9] text-[#23201C] text-[10px] flex items-center justify-center font-bold">
                2
              </span>
              <span>Condition &amp; Details</span>
            </div>

            <div
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 ${
                currentStep >= 3
                  ? 'bg-[#23201C] border-[#23201C] text-[#F5EFE6]'
                  : 'bg-[#48423A] border-[#3E3831] text-[#A0988E]'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#EAE4D9] text-[#23201C] text-[10px] flex items-center justify-center font-bold">
                3
              </span>
              <span>Pickup &amp; Payout</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN WIZARD CONTAINER */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-[#EAE4D9]/80 rounded-3xl border border-[#E0D9CD] shadow-xl p-6 sm:p-10">
          {/* STEP 1: Select Device Type, Brand, Model & Storage */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in-50">
              {/* 1. Device Category */}
              <div>
                <h3 className="text-base font-extrabold text-[#23201C] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#23201C] text-[#F5EFE6] text-xs flex items-center justify-center">
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
                            ? 'border-[#23201C] bg-[#F5EFE6] text-[#23201C] shadow-xs ring-2 ring-[#23201C]/20'
                            : 'border-[#E0D9CD] bg-[#EAE4D9] hover:border-[#DED7CA] text-[#6E685F]'
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
                <h3 className="text-base font-extrabold text-[#23201C] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#23201C] text-[#F5EFE6] text-xs flex items-center justify-center">
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
                            ? 'bg-[#23201C] text-[#F5EFE6] border-[#23201C] shadow-xs'
                            : 'bg-[#F5EFE6] text-[#23201C] border-[#E0D9CD] hover:border-[#DED7CA]'
                        }`}
                      >
                        {b.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Select Model or Enter Manually */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-extrabold text-[#23201C] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#23201C] text-[#F5EFE6] text-xs flex items-center justify-center">
                      3
                    </span>
                    <span>Select Model</span>
                  </h3>
                  <span className="text-xs text-[#6E685F]">Choose from list or type below</span>
                </div>
                
                {/* Popular Models Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto p-1">
                  {brandModels.map((m) => {
                    const isSelected = selectedModelId === m.id && !customModelName;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleModelSelect(m.id)}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          isSelected
                            ? 'border-[#23201C] bg-[#F5EFE6] shadow-xs ring-2 ring-[#23201C]/20'
                            : 'border-[#E0D9CD] hover:border-[#DED7CA] bg-[#F5EFE6]'
                        }`}
                      >
                        <span className="block text-xs font-bold text-[#23201C]">
                          {m.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Option to enter custom model manually */}
                <div className="mt-3 p-3.5 rounded-2xl bg-[#F5EFE6] border border-[#E0D9CD]">
                  <label className="block text-xs font-bold text-[#23201C] mb-1.5">
                    Or Enter Exact Model / Device Name Manually
                  </label>
                  <input
                    type="text"
                    value={customModelName}
                    onChange={(e) => setCustomModelName(e.target.value)}
                    placeholder="e.g. iPhone 13 Pro 128GB Sierra Blue / OnePlus 11R 5G / Dell Inspiron 15..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DED7CA] bg-white text-xs text-[#23201C] placeholder-[#A0988E] focus:outline-hidden focus:border-[#23201C]"
                  />
                  <p className="text-[11px] text-[#6E685F] mt-1">
                    If your device is not listed above, type its full name and we will evaluate it for you.
                  </p>
                </div>
              </div>

              {/* 4. Select Storage Variant */}
              <div>
                <h3 className="text-base font-extrabold text-[#23201C] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#23201C] text-[#F5EFE6] text-xs flex items-center justify-center">
                    4
                  </span>
                  <span>Select Storage Variant</span>
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {(activeModel.storages.length > 0 ? activeModel.storages : [{ storage: '64GB' }, { storage: '128GB' }, { storage: '256GB' }, { storage: '512GB' }]).map((s) => {
                    const isSelected = selectedStorage === s.storage && !customStorage;
                    return (
                      <button
                        key={s.storage}
                        type="button"
                        onClick={() => {
                          setSelectedStorage(s.storage);
                          setCustomStorage('');
                        }}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                          isSelected
                            ? 'bg-[#23201C] text-[#F5EFE6] border-[#23201C] shadow-sm'
                            : 'bg-[#F5EFE6] text-[#23201C] border-[#E0D9CD] hover:border-[#DED7CA]'
                        }`}
                      >
                        {s.storage}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2.5 max-w-sm">
                  <input
                    type="text"
                    value={customStorage}
                    onChange={(e) => setCustomStorage(e.target.value)}
                    placeholder="Or enter custom RAM / Storage (e.g. 1TB / 16GB RAM)"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#DED7CA] bg-[#F5EFE6] text-xs text-[#23201C] placeholder-[#A0988E] focus:outline-hidden focus:border-[#23201C]"
                  />
                </div>
              </div>

              {/* Step 1 Actions */}
              <div className="pt-6 border-t border-[#E0D9CD] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-[#6E685F]">
                  Selected Device: <strong className="text-[#23201C]">{deviceDisplayName} ({deviceDisplayStorage})</strong>
                </div>
                <button
                  type="button"
                  onClick={handleProceedToStep2}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#23201C] hover:bg-[#151311] text-[#F5EFE6] font-bold text-sm shadow-sm transition-all"
                >
                  <span>Enter Details &amp; Condition</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Condition & Enter Device Details */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in-50">
              <div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#6E685F] hover:text-[#23201C] mb-4"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Device Selection</span>
                </button>
                <h3 className="text-lg font-extrabold text-[#23201C]">
                  Select Physical Condition &amp; Enter Details
                </h3>
                <p className="text-xs text-[#6E685F] mt-1">
                  Accurate details ensure smooth verification and immediate payment at your doorstep in Gorakhpur.
                </p>
              </div>

              {/* 4 Conditions Grid (No Calculated Price Displayed) */}
              <div>
                <label className="block text-xs font-bold text-[#23201C] uppercase tracking-wide mb-2.5">
                  1. Overall Physical Condition
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {(['like-new', 'good', 'fair', 'damaged'] as DeviceCondition[]).map((cond) => {
                    const info = CONDITION_DETAILS[cond];
                    const isSelected = selectedCondition === cond;
                    return (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => setSelectedCondition(cond)}
                        className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#23201C] bg-[#F5EFE6] shadow-md ring-2 ring-[#23201C]/20'
                            : 'border-[#E0D9CD] hover:border-[#DED7CA] bg-[#F5EFE6]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-extrabold text-[#23201C]">
                              {info.name}
                            </span>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                              isSelected ? 'bg-[#23201C] text-[#F5EFE6]' : 'bg-[#EAE4D9] text-[#6E685F]'
                            }`}>
                              {info.badge}
                            </span>
                          </div>
                          <p className="text-xs text-[#6E685F] leading-relaxed">
                            {info.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-[#E0D9CD] flex items-center justify-between text-xs text-[#6E685F]">
                          <span>Evaluation Standard</span>
                          <span className="text-[#23201C] font-bold">Doorstep Verification</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ENTER DEVICE DETAILS SECTION */}
              <div className="bg-[#F5EFE6] rounded-2xl p-5 sm:p-6 border border-[#E0D9CD] space-y-6">
                <div>
                  <h4 className="text-sm font-extrabold text-[#23201C] uppercase tracking-wide flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#564F46]" />
                    <span>2. Enter Device Details &amp; Accessories</span>
                  </h4>
                  <p className="text-xs text-[#6E685F] mt-0.5">
                    Select included accessories and provide information about your device.
                  </p>
                </div>

                {/* Accessories Checkboxes */}
                <div>
                  <label className="block text-xs font-bold text-[#23201C] mb-2">
                    Accessories Available With You:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { label: 'Original Box', state: hasBox, setter: setHasBox },
                      { label: 'Original Charger/Cable', state: hasCharger, setter: setHasCharger },
                      { label: 'Valid Invoice / Bill', state: hasBill, setter: setHasBill },
                      { label: 'Under Brand Warranty', state: underWarranty, setter: setUnderWarranty }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => item.setter(!item.state)}
                        className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                          item.state
                            ? 'bg-[#23201C] text-[#F5EFE6] border-[#23201C]'
                            : 'bg-white text-[#6E685F] border-[#DED7CA] hover:border-[#23201C]/40'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                          item.state ? 'bg-[#F5EFE6] text-[#23201C]' : 'border border-[#A0988E]'
                        }`}>
                          {item.state && <Check className="w-3 h-3" />}
                        </div>
                        <span className="truncate">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Device Specifications: Color, Age, Battery Health (All Required) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#23201C] mb-1">
                      Device Color *
                    </label>
                    <input
                      type="text"
                      required
                      value={deviceColor}
                      onChange={(e) => setDeviceColor(e.target.value)}
                      placeholder="e.g. Natural Titanium, Black"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DED7CA] bg-white text-xs text-[#23201C] placeholder-[#A0988E] focus:outline-hidden focus:border-[#23201C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#23201C] mb-1">
                      Approximate Age *
                    </label>
                    <select
                      required
                      value={deviceAge}
                      onChange={(e) => setDeviceAge(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DED7CA] bg-white text-xs text-[#23201C] focus:outline-hidden focus:border-[#23201C]"
                    >
                      <option value="Under 3 months">Under 3 months</option>
                      <option value="3-11 months">3 to 11 months</option>
                      <option value="1-2 years">1 to 2 years</option>
                      <option value="2+ years">More than 2 years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#23201C] mb-1">
                      Battery Health % *
                    </label>
                    <input
                      type="text"
                      required
                      value={batteryHealth}
                      onChange={(e) => setBatteryHealth(e.target.value)}
                      placeholder="e.g. 88% or Above 85%"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DED7CA] bg-white text-xs text-[#23201C] placeholder-[#A0988E] focus:outline-hidden focus:border-[#23201C]"
                    />
                  </div>
                </div>

                {/* Additional Notes / Defects (Required) */}
                <div>
                  <label className="block text-xs font-bold text-[#23201C] mb-1">
                    Device Condition &amp; Defect Details *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={deviceNotes}
                    onChange={(e) => setDeviceNotes(e.target.value)}
                    placeholder="Describe condition: minor scratches, screen repairs, camera/speaker status, or replaced parts..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DED7CA] bg-white text-xs text-[#23201C] placeholder-[#A0988E] focus:outline-hidden focus:border-[#23201C]"
                  />
                </div>
              </div>

              {/* Valuation Summary Card (No Calculated Price) */}
              <div className="bg-[#23201C] text-[#F5EFE6] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-[#C8BFB4] block mb-1">
                    Free Doorstep Inspection &amp; Valuation
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black">
                    {deviceDisplayName} • {deviceDisplayStorage}
                  </h4>
                  <p className="text-xs text-[#A0988E] mt-1.5 leading-relaxed">
                    Condition: <strong className="text-[#F5EFE6]">{CONDITION_DETAILS[selectedCondition].name}</strong>
                    {accessoriesList.length > 0 && (
                      <span> • With {accessoriesList.join(', ')}</span>
                    )}
                  </p>
                </div>

                <div className="text-center sm:text-right shrink-0">
                  <span className="text-xs uppercase text-[#C8BFB4] font-semibold block">Payout Method</span>
                  <div className="text-2xl sm:text-3xl font-black text-[#EAE4D9] mt-0.5">
                    Spot Payment
                  </div>
                  <span className="text-[11px] text-[#A0988E] block mt-0.5">Instant UPI / Bank Transfer at Doorstep</span>
                </div>
              </div>

              {/* Step 2 Actions */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-[#E0D9CD] text-xs font-bold text-[#6E685F] hover:bg-[#F5EFE6]"
                >
                  Change Device
                </button>
                <button
                  type="button"
                  onClick={handleProceedToStep3}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#23201C] hover:bg-[#151311] text-[#F5EFE6] font-bold text-sm shadow-sm transition-all"
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
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#6E685F] hover:text-[#23201C] mb-3"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Device Details</span>
                </button>
                <h3 className="text-lg font-extrabold text-[#23201C]">
                  Pickup &amp; Payment Details
                </h3>
                <p className="text-xs text-[#6E685F] mt-1">
                  Our verified executive will arrive at your address in Gorakhpur, inspect your device, and transfer payment instantly to your account.
                </p>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#23201C] uppercase tracking-wide mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DED7CA] bg-[#F5EFE6] text-sm focus:outline-hidden focus:border-[#23201C] text-[#23201C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#23201C] uppercase tracking-wide mb-1.5">
                    Phone Number (For Pickup Verification) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DED7CA] bg-[#F5EFE6] text-sm focus:outline-hidden focus:border-[#23201C] text-[#23201C]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#23201C] uppercase tracking-wide mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DED7CA] bg-[#F5EFE6] text-sm focus:outline-hidden focus:border-[#23201C] text-[#23201C]"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#23201C] uppercase tracking-wide mb-1.5">
                    Doorstep Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="House / Flat No., Landmark, Basharatpur"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DED7CA] bg-[#F5EFE6] text-sm focus:outline-hidden focus:border-[#23201C] text-[#23201C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#23201C] uppercase tracking-wide mb-1.5">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupPincode}
                    onChange={(e) => setPickupPincode(e.target.value)}
                    placeholder="273004"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DED7CA] bg-[#F5EFE6] text-sm focus:outline-hidden focus:border-[#23201C] text-[#23201C]"
                  />
                </div>
              </div>

              {/* Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#23201C] uppercase tracking-wide mb-1.5">
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DED7CA] bg-[#F5EFE6] text-sm focus:outline-hidden focus:border-[#23201C] text-[#23201C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#23201C] uppercase tracking-wide mb-1.5">
                    Preferred Time Slot *
                  </label>
                  <select
                    value={pickupTimeSlot}
                    onChange={(e) => setPickupTimeSlot(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DED7CA] bg-[#F5EFE6] text-sm focus:outline-hidden focus:border-[#23201C] text-[#23201C]"
                  >
                    <option value="10:00 AM - 01:00 PM">Morning (10:00 AM - 01:00 PM)</option>
                    <option value="01:00 PM - 04:00 PM">Afternoon (01:00 PM - 04:00 PM)</option>
                    <option value="04:00 PM - 07:00 PM">Evening (04:00 PM - 07:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Payment Mode */}
              <div className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#E0D9CD]">
                <span className="block text-xs font-bold text-[#23201C] uppercase tracking-wide mb-3">
                  How Would You Like to Receive Payment?
                </span>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-[#23201C] text-[#F5EFE6] border-[#23201C]'
                        : 'bg-[#EAE4D9] text-[#23201C] border-[#E0D9CD]'
                    }`}
                  >
                    Instant UPI (GPay / PhonePe / Paytm)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                      paymentMethod === 'bank'
                        ? 'bg-[#23201C] text-[#F5EFE6] border-[#23201C]'
                        : 'bg-[#EAE4D9] text-[#23201C] border-[#E0D9CD]'
                    }`}
                  >
                    Direct Bank Transfer (NEFT / IMPS)
                  </button>
                </div>

                {paymentMethod === 'upi' ? (
                  <div>
                    <label className="block text-xs font-bold text-[#23201C] mb-1">
                      Enter UPI ID (e.g. mobile@upi) *
                    </label>
                    <input
                      type="text"
                      required
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="8726942338@paytm"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DED7CA] bg-white text-sm focus:outline-hidden focus:border-[#23201C] text-[#23201C]"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#23201C] mb-1">
                        Bank Account Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}
                        placeholder="Account Number"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#DED7CA] bg-white text-sm text-[#23201C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#23201C] mb-1">
                        Bank IFSC Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={bankIfsc}
                        onChange={(e) => setBankIfsc(e.target.value)}
                        placeholder="e.g. SBIN0001234"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#DED7CA] bg-white text-sm text-[#23201C]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded-xl border border-[#E0D9CD] text-xs font-bold text-[#6E685F] hover:bg-[#F5EFE6]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-9 py-3.5 rounded-xl bg-[#23201C] hover:bg-[#151311] text-[#F5EFE6] font-black text-sm sm:text-base shadow-sm transition-all"
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
              <div className="w-20 h-20 rounded-full bg-[#E6EFE9] text-[#2E6B47] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2E6B47] block">
                  Booking Confirmed
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#23201C] mt-1">
                  Pickup Scheduled Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-[#6E685F] mt-1 max-w-md mx-auto">
                  Booking ID: <strong className="text-[#23201C] font-mono">{bookingId}</strong>. Our Gorakhpur field executive will inspect your device and transfer the funds on the spot.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#F5EFE6] rounded-2xl p-6 border border-[#E0D9CD] text-left max-w-md mx-auto space-y-3 text-xs">
                <div className="flex justify-between border-b border-[#E0D9CD] pb-2">
                  <span className="text-[#6E685F]">Device</span>
                  <span className="font-bold text-[#23201C]">{deviceDisplayName} ({deviceDisplayStorage})</span>
                </div>
                <div className="flex justify-between border-b border-[#E0D9CD] pb-2">
                  <span className="text-[#6E685F]">Condition</span>
                  <span className="font-bold text-[#23201C]">{CONDITION_DETAILS[selectedCondition].name}</span>
                </div>
                {accessoriesList.length > 0 && (
                  <div className="flex justify-between border-b border-[#E0D9CD] pb-2">
                    <span className="text-[#6E685F]">Accessories</span>
                    <span className="font-bold text-[#23201C]">{accessoriesList.join(', ')}</span>
                  </div>
                )}
                {(deviceColor || deviceAge || batteryHealth) && (
                  <div className="flex justify-between border-b border-[#E0D9CD] pb-2">
                    <span className="text-[#6E685F]">Details</span>
                    <span className="font-bold text-[#23201C]">
                      {[deviceColor, deviceAge, batteryHealth ? `Battery: ${batteryHealth}` : ''].filter(Boolean).join(' • ')}
                    </span>
                  </div>
                )}
                {deviceNotes && (
                  <div className="flex justify-between border-b border-[#E0D9CD] pb-2">
                    <span className="text-[#6E685F]">Notes</span>
                    <span className="font-medium text-[#23201C] truncate max-w-[200px]">{deviceNotes}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-[#E0D9CD] pb-2">
                  <span className="text-[#6E685F]">Pickup Schedule</span>
                  <span className="font-bold text-[#23201C]">{pickupDate} ({pickupTimeSlot})</span>
                </div>
                <div className="flex justify-between border-b border-[#E0D9CD] pb-2">
                  <span className="text-[#6E685F]">Pickup Address</span>
                  <span className="font-bold text-[#23201C]">{pickupAddress}, {pickupCity}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-extrabold text-[#23201C] text-sm">Payout Mode</span>
                  <span className="font-black text-[#23201C] text-sm">Instant Doorstep UPI / Bank Transfer</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#23201C] hover:bg-[#151311] text-[#F5EFE6] font-bold text-sm transition-colors"
                >
                  Return to Home
                </Link>
                <Link
                  href="/shop?category=smartphones"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#564F46] hover:bg-[#433D35] text-[#F5EFE6] font-bold text-sm transition-colors"
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
