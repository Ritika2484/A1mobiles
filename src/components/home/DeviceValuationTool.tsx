'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Smartphone,
  Check,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Info
} from 'lucide-react';
import {
  VALUATION_BRANDS,
  VALUATION_MODELS,
  CONDITION_DETAILS,
  calculateEstimatedValue
} from '@/data/valuation';
import { DeviceCondition } from '@/types';
import { formatINR } from '@/lib/utils';

export function DeviceValuationTool() {
  const router = useRouter();

  // State
  const [selectedBrand, setSelectedBrand] = useState<string>('Apple');
  const [selectedModelId, setSelectedModelId] = useState<string>('iphone-15-pro-max');
  const [selectedStorage, setSelectedStorage] = useState<string>('256GB');
  const [selectedCondition, setSelectedCondition] = useState<DeviceCondition>('like-new');

  // Filter models based on selected brand
  const brandModels = useMemo(() => {
    return VALUATION_MODELS.filter((m) => m.brand === selectedBrand);
  }, [selectedBrand]);

  // Current active model
  const activeModel = useMemo(() => {
    return (
      VALUATION_MODELS.find((m) => m.id === selectedModelId) ||
      brandModels[0] ||
      VALUATION_MODELS[0]
    );
  }, [selectedModelId, brandModels]);

  // When brand changes, switch to its first model and that model's first storage
  const handleBrandChange = (brandName: string) => {
    setSelectedBrand(brandName);
    const firstModel = VALUATION_MODELS.find((m) => m.brand === brandName);
    if (firstModel) {
      setSelectedModelId(firstModel.id);
      setSelectedStorage(firstModel.storages[0]?.storage || '128GB');
    }
  };

  // When model changes, update storage if necessary
  const handleModelChange = (modelId: string) => {
    setSelectedModelId(modelId);
    const model = VALUATION_MODELS.find((m) => m.id === modelId);
    if (model && !model.storages.some((s) => s.storage === selectedStorage)) {
      setSelectedStorage(model.storages[0]?.storage || '128GB');
    }
  };

  // Calculate estimated price
  const estimatedValue = useMemo(() => {
    return calculateEstimatedValue(selectedModelId, selectedStorage, selectedCondition);
  }, [selectedModelId, selectedStorage, selectedCondition]);

  const handleContinue = () => {
    const params = new URLSearchParams({
      brand: selectedBrand,
      modelId: selectedModelId,
      modelName: activeModel.name,
      storage: selectedStorage,
      condition: selectedCondition,
      estimate: estimatedValue.toString()
    });
    router.push(`/sell-device?${params.toString()}`);
  };

  const conditionsList: DeviceCondition[] = ['like-new', 'good', 'fair', 'damaged'];

  return (
    <section id="device-valuation" className="py-14 sm:py-20 bg-[#F5EFE6] border-b border-[#E0D9CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE4D9] border border-[#DED7CA] text-[#564F46] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Price Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#23201C] tracking-tight">
            Find Out What Your Device Is Worth
          </h2>
          <p className="text-xs sm:text-sm text-[#6E685F] mt-2">
            Get an instant cash quote in 4 simple steps and schedule free doorstep pickup anywhere in Gorakhpur.
          </p>
        </div>

        {/* Interactive Valuation Flow Card */}
        <div className="bg-[#EAE4D9]/70 rounded-3xl border border-[#E0D9CD] p-5 sm:p-8 lg:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Steps Left: Form inputs */}
            <div className="lg:col-span-8 space-y-7">
              {/* Step 1: Select Brand */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#23201C] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#23201C] text-[#F5EFE6] text-[11px] font-bold flex items-center justify-center">
                      1
                    </span>
                    <span>Select Brand</span>
                  </label>
                  <span className="text-xs text-[#564F46] font-bold">{selectedBrand}</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                  {VALUATION_BRANDS.map((b) => {
                    const isSelected = selectedBrand === b.name;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => handleBrandChange(b.name)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center border ${
                          isSelected
                            ? 'bg-[#23201C] text-[#F5EFE6] border-[#23201C] shadow-xs'
                            : 'bg-[#F5EFE6] text-[#23201C] border-[#E0D9CD] hover:border-[#564F46]'
                        }`}
                      >
                        {b.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Select Model */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#23201C] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#23201C] text-[#F5EFE6] text-[11px] font-bold flex items-center justify-center">
                      2
                    </span>
                    <span>Select Model</span>
                  </label>
                  <span className="text-xs text-[#6E685F]">{brandModels.length} models available</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto pr-1">
                  {brandModels.map((m) => {
                    const isSelected = selectedModelId === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleModelChange(m.id)}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          isSelected
                            ? 'bg-[#F5EFE6] border-[#23201C] shadow-xs ring-2 ring-[#23201C]/15'
                            : 'bg-[#F5EFE6]/80 border-[#E0D9CD] hover:border-[#564F46]'
                        }`}
                      >
                        <span className={`block text-xs font-bold ${isSelected ? 'text-[#23201C]' : 'text-[#23201C]'}`}>
                          {m.name}
                        </span>
                        <span className="text-[10px] text-[#6E685F] mt-0.5 block">
                          Base: {formatINR(m.basePrice)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Select Storage */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#23201C] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#23201C] text-[#F5EFE6] text-[11px] font-bold flex items-center justify-center">
                      3
                    </span>
                    <span>Select Storage</span>
                  </label>
                  <span className="text-xs text-[#564F46] font-bold">{selectedStorage}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {activeModel.storages.map((s) => {
                    const isSelected = selectedStorage === s.storage;
                    return (
                      <button
                        key={s.storage}
                        type="button"
                        onClick={() => setSelectedStorage(s.storage)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                          isSelected
                            ? 'bg-[#23201C] text-[#F5EFE6] border-[#23201C] shadow-xs'
                            : 'bg-[#F5EFE6] text-[#23201C] border-[#E0D9CD] hover:border-[#564F46]'
                        }`}
                      >
                        {s.storage}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Select Condition */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#23201C] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#23201C] text-[#F5EFE6] text-[11px] font-bold flex items-center justify-center">
                      4
                    </span>
                    <span>Select Condition</span>
                  </label>
                  <span className="text-xs text-[#564F46] font-bold">
                    {CONDITION_DETAILS[selectedCondition].badge}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {conditionsList.map((cond) => {
                    const info = CONDITION_DETAILS[cond];
                    const isSelected = selectedCondition === cond;
                    return (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => setSelectedCondition(cond)}
                        className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#F5EFE6] border-[#23201C] shadow-xs ring-2 ring-[#23201C]/15'
                            : 'bg-[#F5EFE6]/80 border-[#E0D9CD] hover:border-[#564F46]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className={`text-xs font-bold ${isSelected ? 'text-[#23201C]' : 'text-[#23201C]'}`}>
                            {info.name}
                          </span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                            isSelected ? 'bg-[#23201C] text-[#F5EFE6]' : 'bg-[#EAE4D9] text-[#6E685F]'
                          }`}>
                            {info.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6E685F] leading-relaxed">
                          {info.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 5 Right: Estimated Value Output & CTA */}
            <div className="lg:col-span-4 bg-[#F5EFE6] rounded-2xl border border-[#E0D9CD] p-6 sm:p-7 shadow-md flex flex-col justify-between sticky top-28">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EAE4D9] text-[#564F46] text-[10px] font-black uppercase tracking-wider mb-3">
                  <Zap className="w-3.5 h-3.5 text-[#564F46]" />
                  <span>Instant Resale Quote</span>
                </div>

                <div className="border-b border-[#E0D9CD] pb-4 mb-4">
                  <span className="text-xs text-[#6E685F] uppercase font-bold tracking-wider block">
                    Selected Device
                  </span>
                  <h3 className="text-lg font-black text-[#23201C] mt-0.5">
                    {activeModel.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#6E685F] mt-1">
                    <span>{selectedStorage}</span>
                    <span>•</span>
                    <span className="font-semibold text-[#23201C]">
                      {CONDITION_DETAILS[selectedCondition].name}
                    </span>
                  </div>
                </div>

                {/* Estimated Value Card */}
                <div className="bg-[#EAE4D9]/60 p-4 rounded-xl border border-[#E0D9CD] mb-4 text-center">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-[#6E685F] block mb-1">
                    Estimated Value
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#23201C] tracking-tight">
                    {formatINR(estimatedValue)}
                  </div>
                  <p className="text-[11px] text-[#6E685F] mt-1 font-medium">
                    Get this value after verification
                  </p>
                </div>

                <div className="space-y-2 text-xs text-[#6E685F] mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E6B47] shrink-0" />
                    <span>Free Doorstep Pickup in Gorakhpur</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E6B47] shrink-0" />
                    <span>Instant Payment via UPI / Bank</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E6B47] shrink-0" />
                    <span>Zero deduction if condition matches</span>
                  </div>
                </div>
              </div>

              {/* Continue CTA */}
              <button
                type="button"
                onClick={handleContinue}
                className="w-full py-3.5 px-4 rounded-xl bg-[#23201C] hover:bg-[#151311] text-[#F5EFE6] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all hover:-translate-y-0.5"
              >
                <span>CONTINUE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
