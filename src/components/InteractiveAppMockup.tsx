/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Moon, 
  Wind, 
  Baby, 
  Compass, 
  Gamepad2, 
  ChevronRight,
  Menu,
  Bell,
  Heart,
  Sparkles,
  Check
} from 'lucide-react';
import { WeatherCondition, BabyActivity, DayMoment } from '../types';
import { getClimaRecommendation } from '../lib/climaEngine';

export default function InteractiveAppMockup() {
  const [temp, setTemp] = useState<number>(22);
  const [moment, setMoment] = useState<DayMoment>('dia');
  const [activity, setActivity] = useState<BabyActivity>('brincando');
  const [hasAC, setHasAC] = useState<boolean>(false);

  // Compute recommendation
  const condition: WeatherCondition = useMemo(() => ({
    temp,
    moment,
    activity,
    hasAC
  }), [temp, moment, activity, hasAC]);

  const rec = useMemo(() => getClimaRecommendation(condition), [condition]);

  // Map temperature to human terms matching screenshots
  const climateTerm = useMemo(() => {
    if (temp < 16) return { name: 'Frio Intenso', emoji: '🥶', desc: 'Clima exige atenção redobrada com as extremidades do bebê.' };
    if (temp >= 16 && temp < 19) return { name: 'Clima Frio', emoji: '☁️', desc: 'Ideal reforçar com calça justa e casaquinho confortável.' };
    if (temp >= 19 && temp < 22) return { name: 'Clima Fresquinho', emoji: '🍃', desc: 'Temperatura agradável com leve brisa fria.' };
    if (temp >= 22 && temp < 25) return { name: 'Clima Agradável', emoji: '😊', desc: 'O clima está ótimo, muito gostoso e equilibrado.' };
    if (temp >= 25 && temp < 28) return { name: 'Clima Quente', emoji: '☀️', desc: 'Clima bem quente, prefira algodão ultra leve e fino.' };
    return { name: 'Calor Intenso', emoji: '🔥', desc: 'Evite excesso de tecidos para prevenir brotoejas e desconforto.' };
  }, [temp]);

  // Layers calculation
  const layerNum = useMemo(() => {
    if (temp < 16) return '3 Camadas';
    if (temp >= 16 && temp < 21) return '2 Camadas';
    return '1 Camada';
  }, [temp]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-soft-cream/60 p-5 md:p-8 rounded-[32px] border border-[#F2EEE7] relative overflow-hidden shadow-premium">
      
      {/* Decorative gradients */}
      <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-peach-baby/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-sage-green/10 rounded-full blur-3xl pointer-events-none" />

      {/* LEFT COLUMN: Simulator Controls (5 Cols) */}
      <div className="lg:col-span-5 flex flex-col space-y-4.5 z-10 text-left">
        <div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-peach-baby/20 text-[#5F5A55] text-[10px] font-bold tracking-tight font-display mb-2 border border-peach-baby/30 uppercase">
            ✨ SIMULADOR CLIMABABY Live
          </span>
          <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-brand-text leading-tight">
            Experimente o app real
          </h3>
          <p className="text-[#5F5A55]/85 text-xs mt-1">
            Simule o quarto do seu bebê abaixo para ver o recomendador inteligente atualizar a roupa instantly no celular ao lado.
          </p>
        </div>

        {/* Temp Selector Form item */}
        <div className="bg-warm-white p-4 rounded-xl border border-[#F2EEE7] shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5F5A55]/70 font-display">Temperatura do Quarto</span>
            <span className="text-xl font-bold font-display text-brand-text">{temp}°C</span>
          </div>
          <input 
            type="range" 
            min="12" 
            max="32" 
            value={temp} 
            onChange={(e) => setTemp(parseInt(e.target.value))}
            className="w-full h-1 bg-[#F2EEE7] rounded-full appearance-none cursor-pointer accent-[#C97D65]"
          />
          <div className="flex justify-between text-[9px] text-[#8E857C] font-semibold mt-1 font-display">
            <span>Frio (12°C)</span>
            <span>Agradável (22°C)</span>
            <span>Quente (32°C)</span>
          </div>
        </div>

        {/* Moment of day */}
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => setMoment('dia')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border font-display font-semibold text-xs transition-all duration-300 ${
              moment === 'dia' 
                ? 'bg-warm-white border-[#C97D65] text-[#C97D65] shadow-sm' 
                : 'bg-warm-white/45 border-[#F2EEE7] text-[#5F5A55]/70 hover:bg-warm-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            Durante o Dia
          </button>
          <button 
            onClick={() => setMoment('noite')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border font-display font-semibold text-xs transition-all duration-300 ${
              moment === 'noite' 
                ? 'bg-warm-white border-[#C97D65] text-[#C97D65] shadow-sm' 
                : 'bg-warm-white/45 border-[#F2EEE7] text-[#5F5A55]/70 hover:bg-warm-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-indigo-400" />
            Durante a Noite
          </button>
        </div>

        {/* Activity Buttons Grid */}
        <div className="bg-warm-white p-4 rounded-xl border border-[#F2EEE7] shadow-sm space-y-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#5F5A55]/70 font-display block">O bebê estará:</span>
          
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: 'brincando', label: 'Acordado', icon: Gamepad2 },
              { id: 'dormindo', label: 'Dormindo', icon: Moon },
              { id: 'colo_sling', label: 'Colo ou Sling', icon: Baby },
              { id: 'passeando', label: 'Passeando', icon: Compass }
            ].map((actObj) => {
              const ActionIcon = actObj.icon;
              const isSelected = activity === actObj.id;
              return (
                <button
                  key={actObj.id}
                  onClick={() => setActivity(actObj.id as BabyActivity)}
                  className={`flex items-center gap-1.5 p-2 rounded-lg border text-left text-[11px] transition-all duration-200 ${
                    isSelected
                      ? 'bg-peach-baby/10 border-[#C97D65] text-[#C97D65] font-bold'
                      : 'bg-transparent border-[#F2EEE7] text-[#5F5A55]/80 hover:bg-[#FDFBF7]'
                  }`}
                >
                  <ActionIcon className="w-3.5 h-3.5 shrink-0" />
                  {actObj.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Air conditioning option */}
        <div className="flex justify-between items-center bg-warm-white p-3.2 px-4 rounded-xl border border-[#F2EEE7] shadow-sm">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-[#C97D65]" />
            <div className="text-left">
              <p className="text-xs font-bold font-display text-brand-text">Ar Condicionado?</p>
              <p className="text-[10px] text-brand-text-light">Ative se houver vento/draft</p>
            </div>
          </div>
          <button 
            onClick={() => setHasAC(!hasAC)}
            className={`w-10 h-5.5 flex items-center rounded-full p-0.5 transition-colors duration-300 outline-none ${
              hasAC ? 'bg-sage-green' : 'bg-zinc-200'
            }`}
          >
            <div className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform duration-300 ${
              hasAC ? 'translate-x-4.5' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>

      {/* CENTER DECORATION: Chevron pulse (1 Col) */}
      <div className="hidden lg:flex lg:col-span-1 items-center justify-center text-[#C97D65]/40 text-center">
        <ChevronRight className="w-6 h-6 animate-pulse" />
      </div>

      {/* RIGHT COLUMN: Realistic high-fidelity smartphone mockup matching user's real screenshots (6 Cols) */}
      <div className="lg:col-span-6 flex justify-center items-center z-10 w-full">
        
        {/* Smartphone Outer Frame */}
        <div className="relative w-[305px] h-[610px] bg-slate-900 rounded-[45px] p-2.5 border-[4.5px] border-[#8E857C]/40 shadow-premium-lg">
          
          {/* External visual elements out of frame for luxury premium tech startup style */}
          <div className="absolute top-10 -right-7 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md border border-[#F2EEE7]">
            <span className="text-base select-none">⭐</span>
          </div>
          <div className="absolute bottom-20 -left-7 w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center shadow-md border border-[#F2EEE7]">
            <span className="text-lg select-none">🧸</span>
          </div>
          
          {/* iOS Ear Notch */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-28 h-5.5 bg-black rounded-full z-40 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-slate-800 rounded-full mr-2" />
            <div className="w-10 h-1 bg-slate-800 rounded" />
          </div>

          {/* Smartphone Inner Screen Contents */}
          <div className="w-full h-full bg-[#FCF9F5] rounded-[36px] overflow-hidden flex flex-col relative border border-slate-950 font-sans text-brand-text select-none">
            
            {/* Top iOS Status Bar */}
            <div className="pt-4.5 px-6 pb-1 flex justify-between items-center text-[10px] font-bold text-[#8E857C] font-display">
              <span>22:33</span>
              <div className="flex items-center gap-1">
                <span>81%</span>
                <div className="w-3.5 h-2 bg-brand-text/50 rounded-sm" />
              </div>
            </div>

            {/* Premium Header conforming EXACTLY to the Screenshots provided! */}
            <div className="px-4 py-2 flex items-center justify-between bg-[#FFFDF9]/60 backdrop-blur-sm border-b border-[#F2EEE7]">
              {/* Menu Button as on Screen 1 */}
              <button className="flex items-center gap-1 px-2 py-1 rounded-full bg-white border border-[#E8E2D8] shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-[10px] font-bold text-[#5F5A55]">
                <Menu className="w-3 h-3 text-[#5F5A55]" />
                Menu
              </button>

              {/* Logo: Hanger + Name custom styled */}
              <div className="flex items-center gap-1">
                {/* Custom representation of ClimaBaby hanger logo */}
                <div className="w-4 h-4 bg-transparent border-t border-l border-r border-[#C97D65] rounded-t-full relative -bottom-0.5 flex justify-center">
                  <div className="w-2.5 h-1.5 bg-peach-baby/40 rounded-b-md absolute bottom-0" />
                </div>
                <span className="font-display font-extrabold text-xs tracking-tight text-neutral-800">
                  Clima<span className="text-[#C97D65]">Baby</span>
                </span>
              </div>

              {/* Bell notification button */}
              <button className="w-7 h-7 bg-white rounded-full border border-[#E8E2D8] flex items-center justify-center relative shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <Bell className="w-3 h-3 text-[#5F5A55]" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#C97D65] rounded-full" />
              </button>
            </div>

            {/* Simulated Live App inside scrollable frame container */}
            <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-3.5 text-left scrollbar-thin">
              
              {/* Recommendation Top Label Row */}
              <div className="flex flex-col items-center space-y-1">
                <span className="text-[9px] font-extrabold tracking-wider text-peach-baby font-display bg-peach-baby/12 px-2.5 py-0.5 rounded-full uppercase">
                  LOOK RECOMENDADO
                </span>
                
                {/* Temperature label header matching Screen 1 exactly */}
                <h4 className="font-display font-black text-base text-brand-text flex items-center gap-1.5 mt-0.5">
                  <span className="text-xl leading-none">{climateTerm.emoji}</span>
                  Clima {climateTerm.name}
                </h4>

                {/* Micro indicators pill */}
                <div className="flex gap-1 mt-1">
                  <span className="text-[8px] font-bold bg-white px-2 py-0.5 rounded-md border border-[#F2EEE7] text-brand-text flex items-center gap-1">
                    <span className="text-[10px] text-amber-500 select-none">☀️</span> {moment === 'dia' ? 'Dia' : 'Noite'}
                  </span>
                  <span className="text-[8px] font-bold bg-white px-2 py-0.5 rounded-md border border-[#F2EEE7] text-brand-text flex items-center gap-1 capitalize">
                    <span className="text-[10px] text-rose-300 select-none">❤️</span> {activity.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Card 1: Warm star comment label */}
              <div className="bg-yellow-50/20 rounded-xl p-3 border border-[#FDF6E2] text-left">
                <p className="text-[10px] text-brand-text leading-relaxed font-medium flex items-start gap-1.5">
                  <span className="text-[#C97D65] text-xs">✨</span>
                  {climateTerm.desc}
                </p>
              </div>

              {/* Card 2: Metodo de camadas ClimaBaby matching Screen 1 exactly */}
              <div className="bg-white rounded-2xl p-3.5 border border-[#F2EEE7] shadow-[0_2px_4px_rgba(95,90,85,0.02)]">
                <span className="text-[8px] font-extrabold uppercase tracking-wider text-[#A84A2E] font-display block">
                  MÉTODO DE CAMADAS CLIMABABY
                </span>
                <h5 className="font-display font-extrabold text-[13px] text-brand-text mt-0.5">
                  {layerNum} de Proteção
                </h5>
                <p className="text-[10px] text-brand-text-light/95 leading-normal mt-1">
                  Proteção leve e equilibrada para o bebê se divertir e se movimentar com total liberdade de forma aconchegante.
                </p>

                {/* Camada status capsule matching Screen 1 bottom pill style */}
                <div className="mt-2.5 flex justify-between items-center py-1.5 px-2.5 rounded-md border border-dashed border-blue-200 bg-blue-50/15 text-[10px] font-bold text-blue-700 font-display">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-sm" />
                    Camada Base
                  </span>
                  <span className="text-[8px] font-extrabold bg-blue-100 text-blue-700 px-1 py-0.2 rounded">OK</span>
                </div>
              </div>

              {/* Card 3: Selected Clothes Display side-by-side matching Screen 1 image layout */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-extrabold text-[#5F5A55] uppercase tracking-wider font-display block">
                  👕 Peças Escolhidas para o Look
                </span>
                
                {/* 2-Column responsive items layout of actual clothes photos or custom designs */}
                <div className="grid grid-cols-2 gap-2">
                  {rec.clothingCombination.slice(0, 2).map((item) => (
                    <div key={item.name} className="bg-white p-2.5 rounded-xl border border-[#F2EEE7] flex flex-col items-center text-center space-y-1 shadow-[0_2px_3px_rgba(0,0,0,0.01)] transition-transform duration-300">
                      
                      {/* Interactive illustration mockup for Body suit / Pants */}
                      <div className="w-14 h-14 bg-soft-cream/30 rounded-lg flex items-center justify-center border border-dashed border-[#F2EEE7] relative">
                        {item.name.toLowerCase().includes('body') ? (
                          <div className="text-2xl">👕</div>
                        ) : (
                          <div className="text-2xl">👖</div>
                        )}
                      </div>
                      
                      <div className="min-w-0">
                        <h6 className="font-display font-extrabold text-[9px] text-brand-text leading-tight truncate">
                          {item.name}
                        </h6>
                        <p className="text-[8px] text-[#8E857C] leading-none mt-0.5 truncate uppercase">
                          {item.category}
                        </p>
                      </div>

                      {/* Small visual pill tags like "AQUECE / LEVE" in green from real screenshots */}
                      <div className="flex gap-1 pt-1 justify-center w-full">
                        <span className="text-[7px] font-black tracking-tight text-[#8E857C]/80 px-1 py-0.2 uppercase border border-[#F2EEE7] rounded">
                          Aquec
                        </span>
                        <span className="text-[7px] font-black tracking-tight text-emerald-700 bg-emerald-50 px-1 py-0.2 uppercase rounded">
                          Leve
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 4: Orientaçao da consultora / Advisor Box matching Screen 2 visual structure */}
              <div className="bg-[#FAF2EC] rounded-xl p-3.5 border border-[#F4E3D8] text-left relative overflow-hidden">
                <span className="text-[8px] font-extrabold text-[#BD5B3E] uppercase tracking-wider font-display bg-[#F4C7B8]/30 px-2 py-0.5 rounded">
                  ORIENTAÇÃO CLIMABABY 💛
                </span>
                <p className="text-[10px] text-brand-text leading-relaxed mt-2 font-display">
                  Para o dia a dia de seu bebezinha em ambiente doméstico, focamos em conforto puro. O segredo é dar liberdade com tecidos naturais saudáveis, evitando excesso de suor na nuca do bebê.
                </p>
              </div>

            </div>

            {/* Bottom Smartphone Navigation bar matching style 100% */}
            <div className="bg-white border-t border-[#F2EEE7] p-2.5 flex justify-around items-center shrink-0">
              <div className="flex flex-col items-center text-[#C97D65] cursor-pointer">
                <span className="text-xs">🏠</span>
                <span className="text-[8px] font-black uppercase tracking-tight mt-0.5 font-display">Início</span>
              </div>
              <div className="flex flex-col items-center text-[#8E857C]/70">
                <span className="text-xs">⏱️</span>
                <span className="text-[8px] font-bold uppercase tracking-tight mt-0.5 font-display">Histórico</span>
              </div>
              <div className="flex flex-col items-center text-[#8E857C]/70">
                <span className="text-xs">❤️</span>
                <span className="text-[8px] font-bold uppercase tracking-tight mt-0.5 font-display">Favoritos</span>
              </div>
              <div className="flex flex-col items-center text-[#8E857C]/70">
                <span className="text-xs">•••</span>
                <span className="text-[8px] font-bold uppercase tracking-tight mt-0.5 font-display">Mais</span>
              </div>
            </div>

            {/* iOS Indicator Home bar */}
            <div className="py-2.5 text-center bg-white shrink-0">
              <div className="w-24 h-1 bg-[#8E857C]/40 mx-auto rounded-full" />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
