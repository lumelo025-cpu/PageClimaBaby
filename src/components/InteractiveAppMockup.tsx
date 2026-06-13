/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shirt, 
  Footprints, 
  Layers, 
  Moon, 
  Sun, 
  Heart, 
  Sparkles, 
  Wind, 
  Baby, 
  Compass, 
  Gamepad2, 
  Check, 
  Smartphone,
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';
import { WeatherCondition, BabyActivity, DayMoment } from '../types';
import { getClimaRecommendation } from '../lib/climaEngine';

export default function InteractiveAppMockup() {
  const [temp, setTemp] = useState<number>(20);
  const [moment, setMoment] = useState<DayMoment>('noite');
  const [activity, setActivity] = useState<BabyActivity>('dormindo');
  const [hasAC, setHasAC] = useState<boolean>(false);

  // Compute recommendation
  const condition: WeatherCondition = useMemo(() => ({
    temp,
    moment,
    activity,
    hasAC
  }), [temp, moment, activity, hasAC]);

  const rec = useMemo(() => getClimaRecommendation(condition), [condition]);

  // Color mapping based on comfort status
  const comfortColorMap = {
    frio_intenso: { bg: 'bg-[#E1EAF4]', text: 'text-[#4A729D]', border: 'border-[#CADAEB]', name: 'Frio Intenso ❄️' },
    frio: { bg: 'bg-[#EAF1F8]', text: 'text-[#5B88B5]', border: 'border-[#D4E3F1]', name: 'Frio ☁️' },
    fresco: { bg: 'bg-[#F2F6ED]', text: 'text-[#6D8158]', border: 'border-[#DFE7D8]', name: 'Fresco 🍃' },
    agradavel: { bg: 'bg-[#FDFBF7]', text: 'text-[#8E8276]', border: 'border-[#F2EEE7]', name: 'Agradável ✨' },
    quente: { bg: 'bg-[#FAF0EC]', text: 'text-[#C97D65]', border: 'border-[#F4DFD8]', name: 'Quente ☀️' },
    muito_quente: { bg: 'bg-[#F7EBE6]', text: 'text-[#BD5B3E]', border: 'border-[#ECD5CD]', name: 'Muito Quente 🔥' }
  };

  const statusStyle = comfortColorMap[rec.comfortStatus];

  // Helper to dynamically render Lucide icons by name
  const renderItemIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-[#5F5A55]/80" };
    switch (iconName) {
      case 'Shirt': return <Shirt {...props} />;
      case 'Footprints': return <Footprints {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Moon': return <Moon {...props} className="w-5 h-5 text-indigo-400" />;
      case 'Sun': return <Sun {...props} className="w-5 h-5 text-amber-400" />;
      case 'Heart': return <Heart {...props} className="w-5 h-5 text-rose-300 fill-rose-100" />;
      default: return <Shirt {...props} />;
    }
  };

  return (
    <div id="simulator-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-soft-cream/60 p-6 md:p-10 rounded-[32px] border border-[#F2EEE7] relative overflow-hidden shadow-premium">
      {/* Decorative cloud backgrounds */}
      <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-peach-baby/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-sage-green/10 rounded-full blur-3xl pointer-events-none" />

      {/* Simulator Inputs Left Side (5 Cols) */}
      <div className="lg:col-span-5 flex flex-col space-y-6 z-10">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-peach-baby/20 text-[#5F5A55] text-xs font-medium tracking-tight font-display mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C97D65]" />
            Simulador ClimaBaby
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-brand-text leading-tight">
            Veja a mágica acontecer em tempo real
          </h3>
          <p className="text-[#5F5A55]/80 text-sm mt-2">
            Altere as condições climáticas e do quarto abaixo para ver as recomendações de roupinha mudarem no smartphone.
          </p>
        </div>

        {/* Temp Slider */}
        <div className="bg-warm-white p-5 rounded-2xl border border-[#F2EEE7] shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-medium uppercase tracking-wider text-[#5F5A55]/70 font-display">Temperatura do Ambiente</span>
            <span className="text-2xl font-bold font-display text-brand-text">{temp}°C</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="35" 
            value={temp} 
            onChange={(e) => setTemp(parseInt(e.target.value))}
            className="w-full h-1.5 bg-[#F2EEE7] rounded-all appearance-none cursor-pointer accent-[#C97D65] focus:outline-none focus:ring-0 active:accent-[#BFC8B2]"
          />
          <div className="flex justify-between text-[10px] text-brand-text-light mt-1.5 font-display font-medium">
            <span>Frio Extremo (10°C)</span>
            <span>Agradável (22°C)</span>
            <span>Calor (35°C)</span>
          </div>
        </div>

        {/* Moment of day Selector */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setMoment('dia')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-display font-medium text-sm transition-all duration-300 ${
              moment === 'dia' 
                ? 'bg-warm-white border-[#C97D65] text-[#C97D65] shadow-sm' 
                : 'bg-warm-white/40 border-[#F2EEE7] text-[#5F5A55]/70 hover:bg-warm-white hover:border-[#E8E2D8]'
            }`}
          >
            <Sun className={`w-4 h-4 transition-colors ${moment === 'dia' ? 'text-amber-500 fill-amber-50' : ''}`} />
            Período do Dia
          </button>
          <button 
            onClick={() => setMoment('noite')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-display font-medium text-sm transition-all duration-300 ${
              moment === 'noite' 
                ? 'bg-warm-white border-[#C97D65] text-[#C97D65] shadow-sm' 
                : 'bg-warm-white/40 border-[#F2EEE7] text-[#5F5A55]/70 hover:bg-warm-white hover:border-[#E8E2D8]'
            }`}
          >
            <Moon className={`w-4 h-4 transition-colors ${moment === 'noite' ? 'text-indigo-400 fill-indigo-50' : ''}`} />
            Período da Noite
          </button>
        </div>

        {/* Activity Choice */}
        <div className="bg-warm-white p-5 rounded-2xl border border-[#F2EEE7] shadow-sm space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#5F5A55]/70 font-display block mb-1">O que o bebê estará fazendo?</span>
          
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'dormindo', label: 'Sono no berço', icon: Moon },
              { id: 'brincando', label: 'Brincadeiras', icon: Gamepad2 },
              { id: 'passeando', label: 'Passeio fora', icon: Compass },
              { id: 'colo_sling', label: 'No Colo / Sling', icon: Baby }
            ].map((actObj) => {
              const ActionIcon = actObj.icon;
              const isSelected = activity === actObj.id;
              return (
                <button
                  key={actObj.id}
                  onClick={() => setActivity(actObj.id as BabyActivity)}
                  className={`flex items-center gap-2.5 p-2 px-3 rounded-lg border text-left text-xs transition-all duration-200 ${
                    isSelected
                      ? 'bg-peach-baby/10 border-peach-baby/60 text-[#BD5B3E] font-medium'
                      : 'bg-transparent border-[#F2EEE7] text-[#5F5A55]/80 hover:bg-[#FDFBF7] hover:border-peach-baby/20'
                  }`}
                >
                  <ActionIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#C97D65]' : 'text-[#8E857C]'}`} />
                  {actObj.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Room configuration with Toggle Switch */}
        <div className="flex justify-between items-center bg-warm-white p-4 px-5 rounded-2xl border border-[#F2EEE7] shadow-sm">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${hasAC ? 'bg-indigo-50 text-[#5B88B5]' : 'bg-brand-text/5 text-brand-text-light'}`}>
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold font-display text-brand-text">Ar condicionado ligado?</p>
              <p className="text-xs text-brand-text-light">Estabiliza o clima, reduzindo umidade.</p>
            </div>
          </div>
          <button 
            onClick={() => setHasAC(!hasAC)}
            className={`w-12 h-6 flex items-center rounded-full p-0.5 transition-colors duration-300 outline-none ${
              hasAC ? 'bg-sage-green' : 'bg-zinc-200'
            }`}
          >
            <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
              hasAC ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>

      {/* Decorative Center elements (1 Col) */}
      <div className="hidden lg:flex lg:col-span-1 items-center justify-center flex-col text-[#C97D65]/40 text-center">
        <ChevronRight className="w-8 h-8 animate-pulse" />
      </div>

      {/* Phone Mockup Right Side (6 Cols) */}
      <div className="lg:col-span-6 flex justify-center items-center z-10 w-full">
        {/* Smartphone Wrapper Frame */}
        <div className="relative w-[310px] sm:w-[325px] h-[640px] bg-slate-900 rounded-[50px] shadow-premium-lg p-2.5 border-[4px] border-[#8E857C]/40 relative">
          
          {/* Dynamic soft background elements sticking out of the smartphone frame layout */}
          <div className="absolute top-10 -right-8 w-12 h-12 bg-warm-white rounded-full flex items-center justify-center shadow-md border border-[#F2EEE7] animate-[bounce_5s_infinite]">
            <span className="text-lg">⭐</span>
          </div>
          <div className="absolute bottom-24 -left-8 w-14 h-14 bg-warm-white rounded-full flex items-center justify-center shadow-md border border-[#F2EEE7] rotate-12">
            <span className="text-xl">🧸</span>
          </div>
          <div className="absolute top-1/2 -right-12 w-14 h-14 bg-warm-white rounded-full flex items-center justify-center shadow-md border border-[#F2EEE7] -rotate-6">
            <span className="text-xl font-medium text-peach-baby">❤️</span>
          </div>

          {/* Smartphone Ear speaker Notch */}
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-3xl z-40 flex items-center justify-center">
            {/* Camera dot & speaker line */}
            <div className="w-2 h-2 bg-slate-800 rounded-full mr-2" />
            <div className="w-12 h-1 bg-slate-800 rounded" />
          </div>

          {/* Phone Inner Screen Screen Screen */}
          <div className="w-full h-full bg-[#FFFDF9] rounded-[42px] overflow-hidden flex flex-col relative border border-slate-950 font-sans text-brand-text select-none">
            
            {/* Clock & Status top bar inside the iOS screen */}
            <div className="pt-6 px-7 pb-2 flex justify-between items-center text-[11px] font-semibold text-[#8E857C] font-display">
              <span>09:41</span>
              <div className="flex items-center gap-1.5 pt-1">
                <div className="w-3 h-2 bg-brand-text/50 rounded-sm" />
                <div className="w-2.5 h-2.5 bg-brand-text/50 rounded-full" />
              </div>
            </div>

            {/* App Nav Bar */}
            <div className="px-5 py-2.5 flex items-center justify-between border-b border-[#F2EEE7] bg-[#FFFDF9]/80 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-peach-baby/30 rounded-lg flex items-center justify-center">
                  <span className="text-xs">🧸</span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs tracking-tight text-brand-text">ClimaBaby</h4>
                  <p className="text-[9px] text-[#8E857C] font-semibold uppercase tracking-wider">Premium Care</p>
                </div>
              </div>
              
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} font-display`}>
                {statusStyle.name}
              </span>
            </div>

            {/* App main container (Scrollable mimicking real app experience) */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-left scrollbar-thin">
              
              {/* Screen Top Header: Current active Temperature display in App */}
              <div className="bg-[#F8F4EE] rounded-2xl p-4 border border-[#F2EEE7] relative overflow-hidden">
                <p className="text-[10px] uppercase font-bold tracking-wider text-[#8E857C] font-display">Ambiente Detectado</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold font-display text-brand-text">{temp}°C</span>
                  <span className="text-xs text-[#8E857C] font-medium">no quarto</span>
                </div>
                <p className="text-xs font-semibold mt-1.5 text-[#5F5A55]/90 font-display flex items-center gap-1">
                  <span className="text-xs">🌡️</span> {rec.tempRange}
                </p>
                
                {/* Micro illustration of baby state inside app */}
                <div className="absolute right-4 bottom-2 bg-white/70 p-2 rounded-xl border border-white flex flex-col items-center">
                  <span className="text-base">
                    {activity === 'dormindo' ? '😴' : activity === 'brincando' ? '🧸' : activity === 'passeando' ? '🌤️' : '🤱'}
                  </span>
                  <span className="text-[8px] font-bold text-[#8E857C] capitalize">{activity.replace('_', ' ')}</span>
                </div>
              </div>

              {/* Recommendation Title */}
              <div>
                <span className="text-[10px] font-bold text-brand-text-light uppercase tracking-wider font-display block">
                  Combinação Recomendada
                </span>
                <p className="text-xs text-brand-text-light leading-snug">
                  Toque para ver detalhes de cada camada.
                </p>
              </div>

              {/* Reactive Recommended items stack */}
              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {rec.clothingCombination.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, delay: index * 0.05 }}
                      className="p-3 bg-[#FFFDF9] rounded-xl border border-[#F2EEE7] flex items-center gap-3 shadow-none hover:border-peach-baby/40 transition-colors"
                    >
                      <div className="bg-[#F8F4EE] p-2 rounded-lg flex items-center justify-center shrink-0">
                        {renderItemIcon(item.icon)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h5 className="font-display font-bold text-xs text-brand-text truncate">{item.name}</h5>
                          <span className={`text-[8px] px-1.5 py-0.2 rounded-full font-medium ${
                            item.category === 'base' ? 'bg-[#FDFBF7] text-amber-600 border border-amber-100' :
                            item.category === 'middle' ? 'bg-[#F2F6ED] text-emerald-600 border border-emerald-100' :
                            item.category === 'outer' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                            'bg-rose-50 text-rose-600 border border-rose-100'
                          }`}>
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[9px] text-brand-text-light truncate">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Fabric Suggestions badge bundle */}
              <div className="bg-[#FAF8F5] rounded-xl p-3 border border-[#F2EEE7]">
                <p className="text-[9px] font-bold text-brand-text-light uppercase tracking-wider font-display mb-1.5">
                  Tecidos Ideais Recomendados
                </p>
                <div className="flex flex-wrap gap-1">
                  {rec.recommendedFabrics.map((fabric) => (
                    <span key={fabric} className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-[#F2EEE7] text-brand-text font-medium font-display shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                      🌿 {fabric}
                    </span>
                  ))}
                </div>
              </div>

              {/* Safe sleep advisory quote block */}
              <div className="bg-[#BFC8B2]/10 rounded-xl p-3 border.2 border-dashed border-[#BFC8B2]/30 text-left">
                <div className="flex gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-[#5F5A55] leading-relaxed">
                    <strong>Padrão de Segurança:</strong> {rec.safeSleepTip}
                  </p>
                </div>
              </div>

              {/* Tiny Mock pricing block to secure conversion in user interactive journey */}
              <div className="pt-2 text-center">
                <p className="text-[8px] text-brand-text-light font-medium tracking-tight">
                  ClimaBaby Premium • Atualizado com Diretrizes Reais 2026
                </p>
              </div>

            </div>

            {/* Simulated Smartphone Bottom indicator bar */}
            <div className="py-2.5 text-center bg-white border-t border-[#F2EEE7] shrink-0">
              <div className="w-24 h-1 bg-[#8E857C]/40 mx-auto rounded-full" />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
