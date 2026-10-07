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
    <section id="device-valuation" className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Price Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find Out What Your Device Is Worth
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Get an instant cash quote in 4 simple steps and schedule free doorstep pickup anywhere in Gorakhpur.
          </p>
        </div>

        {/* Interactive Valuation Flow Card */}
        <div className="bg-slate-50/80 rounded-3xl border border-slate-200 p-5 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Steps Left: Form inputs */}
            <div className="lg:col-span-8 space-y-7">
              {/* Step 1: Select Brand */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[11px] font-bold flex items-center justify-center">
                      1
                    </span>
                    <span>Select Brand</span>
                  </label>
                  <span className="text-xs text-orange-600 font-bold">{selectedBrand}</span>
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
                            ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300 hover:bg-orange-50/30'
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
                  <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[11px] font-bold flex items-center justify-center">
                      2
                    </span>
                    <span>Select Model</span>
                  </label>
                  <span className="text-xs text-slate-500">{brandModels.length} models available</span>
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
                            ? 'bg-white border-orange-500 shadow-sm ring-2 ring-orange-100'
                            : 'bg-white/80 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className={`block text-xs font-bold ${isSelected ? 'text-orange-600' : 'text-slate-900'}`}>
                          {m.name}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">
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
                  <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[11px] font-bold flex items-center justify-center">
                      3
                    </span>
                    <span>Select Storage</span>
                  </label>
                  <span className="text-xs text-orange-600 font-bold">{selectedStorage}</span>
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

              {/* Step 4: Select Condition */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[11px] font-bold flex items-center justify-center">
                      4
                    </span>
                    <span>Select Condition</span>
                  </label>
                  <span className="text-xs text-orange-600 font-bold">
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
                            ? 'bg-white border-orange-500 shadow-sm ring-2 ring-orange-100'
                            : 'bg-white/80 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className={`text-xs font-bold ${isSelected ? 'text-orange-600' : 'text-slate-900'}`}>
                            {info.name}
                          </span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                            isSelected ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {info.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {info.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 5 Right: Estimated Value Output & CTA */}
            <div className="lg:col-span-4 bg-white rounded-2xl border-2 border-orange-400 p-6 sm:p-7 shadow-lg flex flex-col justify-between sticky top-28">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 text-[10px] font-black uppercase tracking-wider mb-3">
                  <Zap className="w-3.5 h-3.5 text-orange-500" />
                  <span>Instant Resale Quote</span>
                </div>

                <div className="border-b border-slate-100 pb-4 mb-4">
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">
                    Selected Device
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-0.5">
                    {activeModel.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <span>{selectedStorage}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700">
                      {CONDITION_DETAILS[selectedCondition].name}
                    </span>
                  </div>
                </div>

                {/* Estimated Value Card */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4 text-center">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500 block mb-1">
                    Estimated Value
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-orange-500 tracking-tight">
                    {formatINR(estimatedValue)}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">
                    Get this value after verification
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Free Doorstep Pickup in Gorakhpur</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant Payment via UPI / Bank</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Zero deduction if condition matches</span>
                  </div>
                </div>
              </div>

              {/* Continue CTA */}
              <button
                type="button"
                onClick={handleContinue}
                className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-orange-500/25 transition-all hover:-translate-y-0.5"
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
