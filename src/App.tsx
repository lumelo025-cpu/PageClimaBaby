/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Check, 
  ChevronRight, 
  HelpCircle, 
  ShieldCheck, 
  Lock, 
  Star, 
  Mail, 
  Heart, 
  Smartphone, 
  AlertCircle,
  FileText,
  Info,
  X,
  CreditCard,
  ShoppingBag
} from 'lucide-react';
import InteractiveAppMockup from './components/InteractiveAppMockup';

export default function App() {
  // Mobile Nav states
  const [activeTab, setActiveTab] = useState<'home' | 'dor' | 'funcionamento' | 'differenciais' | 'oferta'>('home');
  // Modal states for support and terms
  const [activeModal, setActiveModal] = useState<'support' | 'privacy' | 'terms' | null>(null);
  
  // High-converting notifications (App Store style)
  const [activeNotification, setActiveNotification] = useState<{ name: string; city: string; time: string } | null>(null);

  // FAQ states
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Kiwify Checkout Redirect Simulation or Integration
  const handleCheckoutRedirect = () => {
    // Standard secure redirect to Kiwify checkout placeholder or real link
    window.open('https://pay.kiwify.com.br/', '_blank');
  };

  // Simulate premium user notifications to boost social proof (subtle & elegant)
  useEffect(() => {
    const notifications = [
      { name: 'Juliana S.', city: 'São Paulo', time: '2 min' },
      { name: 'Carolina M.', city: 'Rio de Janeiro', time: '5 min' },
      { name: 'Bárbara T.', city: 'Belo Horizonte', time: '8 min' },
      { name: 'Mariana F.', city: 'Curitiba', time: '11 min' },
      { name: 'Amanda L.', city: 'Porto Alegre', time: '15 min' }
    ];

    let index = 0;
    const interval = setInterval(() => {
      // Toggle notification showing up
      setActiveNotification(notifications[index]);
      index = (index + 1) % notifications.length;

      // Disappear after 5 seconds
      setTimeout(() => {
        setActiveNotification(null);
      }, 5000);

    }, 20000); // Repeat every 20 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-warm-white font-sans text-brand-text flex flex-col relative antialiased selection:bg-peach-baby/40 selection:text-brand-text">
      
      {/* 1. Header Navigation Bar (Premium glassmorphic styled) */}
      <header className="sticky top-0 z-40 bg-[#FFFDF9]/80 backdrop-blur-md border-b border-[#F2EEE7]/80 transition-all">
        <div className="max-w-7xl mx-auto px-5 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo element resembling a digital startup and App store listing */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-peach-baby/30 rounded-xl flex items-center justify-center shadow-inner">
              <span className="text-sm sm:text-base">🧸</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-lg sm:text-xl text-brand-text tracking-tight">ClimaBaby</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 bg-sage-green/25 text-[#5F5A55] rounded-full uppercase tracking-wider font-display hidden sm:inline">PRO</span>
              </div>
              <p className="text-[10px] text-brand-text-light font-medium tracking-tight -mt-1 font-display">Para mamães e papais prevenidos</p>
            </div>
          </div>

          {/* Desktop Navigation Links (Understated minimalist Apple-like style) */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-brand-text/80">
            <button onClick={() => scrollToSection('dor-section')} className="hover:text-[#BD5B3E] transition-colors cursor-pointer">Quantas vezes pensou</button>
            <button onClick={() => scrollToSection('funcionamento-section')} className="hover:text-[#BD5B3E] transition-colors cursor-pointer">Como funciona</button>
            <button onClick={() => scrollToSection('diferenciais-section')} className="hover:text-[#BD5B3E] transition-colors cursor-pointer">Diferenciais</button>
            <button onClick={() => scrollToSection('faq-section')} className="hover:text-[#BD5B3E] transition-colors cursor-pointer">Dúvidas comuns</button>
          </nav>

          {/* CTA header button */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => scrollToSection('offer-section')}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-brand-text text-warm-white text-xs sm:text-sm font-semibold tracking-tight font-display hover:bg-[#4D4843]/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              Quero meu ClimaBaby
            </button>
          </div>

        </div>
      </header>

      {/* Main Container Content */}
      <main className="flex-1">

        {/* =========================================================================
            PRIMEIRA DOBRA (HERO SECTION - THE MOST IMPORTANT VALUE IN SALES)
            ========================================================================= */}
        <section className="relative pt-8 pb-16 sm:py-20 lg:py-24 overflow-hidden border-b border-[#F2EEE7]">
          {/* Subtle decoration elements overlay of premium tech start-ups */}
          <div className="absolute top-10 left-10 w-48 h-48 bg-soft-cream rounded-full blur-3xl pointer-events-none opacity-85" />
          
          <div className="max-w-7xl mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column Copy (7 Cols on large screens) */}
              <div className="lg:col-span-6 space-y-6 text-left">
                
                {/* Micro Authority Pill */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-peach-baby/15 text-[#BD5B3E] text-xs font-semibold tracking-tight font-display animate-fade-in border border-[#F4C7B8]/30">
                  <span className="text-[11px] animate-[pulse_1.5s_infinite]">✨</span>
                  O guia inteligente para vestir seu bebê
                </div>

                {/* Ultimate Hero Title */}
                <h1 className="font-display text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-brand-text leading-[1.1]">
                  Nunca mais fique na dúvida se seu bebê está com <span className="text-[#C97D65] underline decoration-[#F4C7B8] decoration-4 underline-offset-4">frio ou calor</span>.
                </h1>

                {/* Engaging Subheadline */}
                <p className="text-brand-text-light text-base sm:text-lg leading-relaxed max-w-xl">
                  Em poucos segundos, o <strong>ClimaBaby</strong> analisa o ambiente, o momento do dia e a rotina do seu bebê para recomendar a combinação ideal de roupas com conforto absoluto e total segurança fisiológica.
                </p>

                {/* Beautiful CTAs & App Store badging indicators */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1.5">
                  <button 
                    onClick={() => scrollToSection('offer-section')}
                    className="py-4 px-8 rounded-full bg-brand-text text-warm-white text-base font-bold font-display tracking-tight text-center shadow-lg hover:bg-[#3D3A36] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    Quero meu ClimaBaby
                    <ChevronRight className="w-5 h-5 text-peach-baby group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* App store listing badge placeholder for high conversion validation */}
                  <div className="flex flex-col justify-center text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs font-extrabold text-brand-text font-display pt-0.5 ml-1">4.9/5</span>
                    </div>
                    <p className="text-[11px] text-brand-text-light font-medium mt-0.5">
                      Excelente avaliações • mais de 12 mil famílias tranquilas
                    </p>
                  </div>
                </div>

                {/* Bullets directly below primary CTA */}
                <div className="pt-2 border-t border-[#F2EEE7]/80 grid grid-cols-3 gap-2">
                  {[
                    { text: 'Acesso imediato', desc: 'Sem aguardar entregas' },
                    { text: 'Pagamento único', desc: 'Livre de anuidade' },
                    { text: 'Use para sempre', desc: 'Acesso vitalício' }
                  ].map((benefit, i) => (
                    <div key={i} className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-sage-green/20 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-emerald-800" />
                        </div>
                        <span className="text-xs font-bold text-brand-text font-display">{benefit.text}</span>
                      </div>
                      <p className="text-[10px] text-brand-text-light pl-5 hidden sm:block">{benefit.desc}</p>
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column Layout: Simulated Live App experience mockup panel (6 cols) */}
              <div className="lg:col-span-6 w-full flex justify-center">
                <div className="w-full max-w-lg">
                  {/* Rendering our spectacular responsive interactive simulator mockup */}
                  <InteractiveAppMockup />
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* =========================================================================
            SEÇÃO 2 — A DOR DA MÃE (EMOTIONAL & RELATABLE SECTION)
            ========================================================================= */}
        <section id="dor-section" className="py-16 sm:py-24 bg-soft-cream/30 border-b border-[#F2EEE7]">
          <div className="max-w-4xl mx-auto px-5 text-center">
            
            <span className="text-xs font-bold uppercase tracking-wider text-[#BD5B3E] font-display">A Maternidade Real</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-brand-text">
              Quantas vezes você já pensou...
            </h2>
            <p className="text-brand-text-light text-base mt-2 max-w-xl mx-auto">
              Mesmo sob o melhor cuidado, a oscilação da temperatura traz inseguranças frequentes que tiram nossa paz.
            </p>

            {/* Pain Cards - Beautifully subtle pastel colored queries */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
              {[
                { text: 'Será que meu bebê está com frio?', icon: '❄️', border: 'hover:border-blue-200' },
                { text: 'Estou colocando roupa demais?', icon: '🔥', border: 'hover:border-orange-200' },
                { text: 'Como devo vestir meu bebê para dormir hoje?', icon: '🌙', border: 'hover:border-indigo-200' },
                { text: 'A temperatura de fora é a mesma do quarto?', icon: '🌡️', border: 'hover:border-[#BFC8B2]' }
              ].map((card, idx) => (
                <div 
                  key={idx} 
                  className={`bg-warm-white p-6 rounded-2xl border border-[#F2EEE7] text-left flex items-start gap-4 transition-all duration-300 shadow-sm ${card.border} hover:translate-y-[-2px]`}
                >
                  <span className="text-2xl mt-1 select-none shrink-0">{card.icon}</span>
                  <div>
                    <h4 className="font-display font-semibold text-brand-text text-sm sm:text-base leading-snug">
                      "{card.text}"
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Emotional and reassuring transition quote */}
            <div className="mt-10 p-5 rounded-2xl bg-peach-baby/10 border border-[#F4C7B8]/40 inline-block max-w-2xl text-center">
              <p className="text-sm font-semibold text-[#BD5B3E] font-display flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 fill-[#F4C7B8] inline shrink-0" />
                "Agora você pode ter uma orientação rápida, científica e prática sempre que surgir essa dúvida."
              </p>
            </div>

          </div>
        </section>


        {/* =========================================================================
            SEÇÃO 3 — COMO FUNCIONA (SMEAR & CLEAN STEP-BY-STEP PROCESS)
            ========================================================================= */}
        <section id="funcionamento-section" className="py-16 sm:py-24 bg-warm-white border-b border-[#F2EEE7]">
          <div className="max-w-6xl mx-auto px-5">
            
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A0A994] font-display">Simplicidade Científica</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-1.5 text-brand-text">
                Como funciona o ClimaBaby
              </h2>
              <p className="text-brand-text-light text-sm mt-1">
                Uma recomendação ultra personalizada em menos de 5 segundos no celular.
              </p>
            </div>

            {/* Timelines Flow Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
              
              {/* Connector lines behind (Desktop only) */}
              <div className="hidden lg:block absolute top-[20%] left-[25%] right-[25%] h-0.5 border-t-2 border-dashed border-[#F2EEE7] -z-10" />

              {/* Step 1 */}
              <div className="bg-soft-cream/40 p-8 rounded-3xl border border-[#F2EEE7]/85 relative hover:border-[#C97D65]/20 hover:bg-[#FDFBF7] transition-all">
                <span className="absolute top-4 left-4 w-8 h-8 rounded-full bg-peach-baby/30 text-[#BD5B3E] flex items-center justify-center font-display font-extrabold text-sm shadow-inner">
                  1
                </span>
                <div className="flex flex-col items-center text-center mt-4">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-[#F2EEE7] flex items-center justify-center text-2xl mb-5 select-none">
                    🌡️
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-text">Informe o clima real</h3>
                  <p className="text-[13px] text-brand-text-light mt-2 max-w-xs">
                    Insira a temperatura atual ou deixe o aplicativo detectar de forma autônoma baseada na sua localização de GPS com correções para ar-condicionado.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-soft-cream/40 p-8 rounded-3xl border border-[#F2EEE7]/85 relative hover:border-[#C97D65]/20 hover:bg-[#FDFBF7] transition-all">
                <span className="absolute top-4 left-4 w-8 h-8 rounded-full bg-peach-baby/30 text-[#BD5B3E] flex items-center justify-center font-display font-extrabold text-sm shadow-inner">
                  2
                </span>
                <div className="flex flex-col items-center text-center mt-4">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-[#F2EEE7] flex items-center justify-center text-2xl mb-5 select-none">
                    🕰️
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-text">Defina o momento</h3>
                  <p className="text-[13px] text-brand-text-light mt-2 max-w-xs">
                    Indique se é dia ou noite e declare se o seu bebê estará descansando, em movimento ativo para brincar ou aconchegado no sling que emite calor corporal.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-soft-cream/40 p-8 rounded-3xl border border-[#F2EEE7]/85 relative hover:border-[#C97D65]/20 hover:bg-[#FDFBF7] transition-all">
                <span className="absolute top-4 left-4 w-8 h-8 rounded-full bg-peach-baby/30 text-[#BD5B3E] flex items-center justify-center font-display font-extrabold text-sm shadow-inner">
                  3
                </span>
                <div className="flex flex-col items-center text-center mt-4">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-[#F2EEE7] flex items-center justify-center text-2xl mb-5 select-none">
                    🧸
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-text">Receba a receita ideal</h3>
                  <p className="text-[13px] text-brand-text-light mt-2 max-w-xs">
                    Curadoria detalhada especificando o empilhamento das camadas do bebê, gramatura de tecido ideal, TOGs recomendados e diretrizes pediátricas de sono seguro.
                  </p>
                </div>
              </div>

            </div>

            {/* Quick check details in list underneath works */}
            <div className="mt-12 bg-[#F8F4EE] p-5 rounded-2xl border border-[#F2EEE7] max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <span className="text-xs font-semibold text-brand-text flex items-center gap-1.5 font-display">
                <Info className="w-4 h-4 text-peach-baby shrink-0" />
                Guia Técnico Inteligente
              </span>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {['Combinação de roupas', 'Método das camadas', 'Tecidos recomendados', 'Orientações de sono seguro'].map((item) => (
                  <span key={item} className="text-xs text-brand-text-light flex items-center gap-1.5 font-medium">
                    <Check className="w-3.5 h-3.5 text-sage-green bg-sage-green/20 rounded-full p-0.5 shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>


        {/* =========================================================================
            SEÇÃO 4 — O DIFERENCIAL CLIMABABY (APP-STORE STYLE GRID)
            ========================================================================= */}
        <section id="diferenciais-section" className="py-16 sm:py-24 bg-soft-cream/30 border-b border-[#F2EEE7]">
          <div className="max-w-6xl mx-auto px-5">
            
            <div className="text-center max-w-md mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#BD5B3E] font-display">Detalhamento Premium</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-1.5 text-brand-text">
                O Diferencial ClimaBaby
              </h2>
              <p className="text-brand-text-light text-sm mt-1.5">
                Rigorosamente baseado nas melhores recomendações e metodologias internacionais de cuidados neonatais.
              </p>
            </div>

            {/* Modern iOS App store styled bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Diff 1 */}
              <div className="bg-warm-white p-6 sm:p-8 rounded-3xl border border-[#F2EEE7] shadow-sm flex gap-4 hover:translate-y-[-2px] transition-all">
                <span className="text-3xl shrink-0">🌡️</span>
                <div>
                  <h3 className="font-display font-semibold text-brand-text text-base sm:text-lg">Considera o ambiente real</h3>
                  <p className="text-xs sm:text-[13px] text-brand-text-light mt-1.5 leading-relaxed">
                    Vai além da temperatura geral da cidade trazida pelo clima geral. Permite que você declare se o quarto tem Ar Condicionado, se há correntes de ar ou brisas frias, recalculando a camada de manga automaticamente para resguardar a saúde do bebê.
                  </p>
                </div>
              </div>

              {/* Diff 2 */}
              <div className="bg-warm-white p-6 sm:p-8 rounded-3xl border border-[#F2EEE7] shadow-sm flex gap-4 hover:translate-y-[-2px] transition-all">
                <span className="text-3xl shrink-0">😴</span>
                <div>
                  <h3 className="font-display font-semibold text-brand-text text-base sm:text-lg">Analisa o momento do sono</h3>
                  <p className="text-xs sm:text-[13px] text-brand-text-light mt-1.5 leading-relaxed">
                    A regulação térmica de um bebê dormindo desacelera drasticamente. O ClimaBaby sugere os TOGs corretos (Thermal Overall Grade) e indica o uso do Saco de Dormir apropriado, garantindo uma noite segura sem perigos de asfixias ou hipotermia.
                  </p>
                </div>
              </div>

              {/* Diff 3 */}
              <div className="bg-warm-white p-6 sm:p-8 rounded-3xl border border-[#F2EEE7] shadow-sm flex gap-4 hover:translate-y-[-2px] transition-all">
                <span className="text-3xl shrink-0">🤱</span>
                <div>
                  <h3 className="font-display font-semibold text-brand-text text-base sm:text-lg">Entende colo, sling e rotina</h3>
                  <p className="text-xs sm:text-[13px] text-brand-text-light mt-1.5 leading-relaxed">
                    Você sabia que carregar seu bebê no Sling acrescenta calor corporal considerável? O algoritmo inteligente remove instantaneamente uma camada protetora da conta caso o bebê esteja agasalhado no seu peito, prevenindo a brotoeja causada por superaquecimento.
                  </p>
                </div>
              </div>

              {/* Diff 4 */}
              <div className="bg-warm-white p-6 sm:p-8 rounded-3xl border border-[#F2EEE7] shadow-sm flex gap-4 hover:translate-y-[-2px] transition-all">
                <span className="text-3xl shrink-0">🧸</span>
                <div>
                  <h3 className="font-display font-semibold text-brand-text text-base sm:text-lg">Descomplica tecidos e camadas</h3>
                  <p className="text-xs sm:text-[13px] text-brand-text-light mt-1.5 leading-relaxed">
                    Nossa ferramenta detalha exatamente o que serve para que. Explica por que você deve dar preferência para fibras de algodão 100% Suedine em vez de malhas ásperas e como a calça culote ( mijãozinho ) funciona como escudo térmico suave de proteção à pele fina.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* =========================================================================
            SEÇÃO 5 — OFERTA (PREMIUM SALES CLOSING CARD)
            ========================================================================= */}
        <section id="offer-section" className="py-20 sm:py-28 bg-[#F8F4EE]/50 border-b border-[#F2EEE7]">
          <div className="max-w-4xl mx-auto px-5 text-center">
            
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#BFC8B2]/30 text-emerald-800 text-xs font-bold tracking-tight font-display">
                💡 Tranquilidade Hipoalergênica
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#5F5A55]">
                Um cuidado que você vai usar todos os dias.
              </h2>
              <p className="text-[#5F5A55]/85 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
                Por menos que o valor de uma única roupinha comum de bebê, você terá uma ferramenta inteligente no celular para ajudar em todas as decisões de vestir do dia a dia.
              </p>
            </div>

            {/* Complete premium Offer block (No infoproduct traditional countdown banners) */}
            <div className="bg-warm-white max-w-md mx-auto mt-12 rounded-[32px] border border-[#F2EEE7]/90 shadow-premium-lg overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-2 bg-peach-baby" />
              
              <div className="p-8 sm:p-10 space-y-6">
                
                <div className="space-y-1">
                  <span className="text-xs font-bold text-brand-text-light uppercase tracking-wider font-display">Acesso Premium Vitalício</span>
                  <div className="text-center py-2 flex items-baseline justify-center gap-2">
                    <span className="text-sm font-semibold text-brand-text-light pb-2 font-display">R$</span>
                    <span className="text-5xl font-black text-brand-text tracking-tight font-display">29,90</span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 font-display">Uso Vitalício</span>
                  </div>
                  <p className="text-[11px] text-brand-text-light font-medium">Sem assinaturas, sem taxas ocultas, sem mensalidades.</p>
                </div>

                <div className="border-t border-[#F2EEE7] pt-6 space-y-3.5 text-left">
                  {[
                    'Acesso imediato no celular',
                    'Calculadora inteligente de combinação térmica',
                    'Todas as regras de TOG e Sono Seguro integradas',
                    'Atualizações futuras inclusas e gratuitas para sempre',
                    'Garantia de 7 dias ou seu dinheiro de volta'
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#BFC8B2]/20 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-800" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-brand-text">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Secure buying button linking to Kiwify with custom styled redirection */}
                <div className="pt-2">
                  <button 
                    onClick={handleCheckoutRedirect}
                    className="w-full py-4 px-6 rounded-2xl bg-[#BD5B3E] text-white text-base font-bold tracking-tight font-display hover:bg-[#A84A2E] shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-5 h-5 shrink-0" />
                    Comprar agora
                  </button>
                  
                  <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-brand-text-light font-medium">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-emerald-700" /> Compra segura
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Kiwify Garantido
                    </span>
                  </div>
                </div>

              </div>
              
              <div className="bg-soft-cream/60 py-3.5 px-6 border-t border-[#F2EEE7] flex items-center justify-center gap-1.5 text-xs text-brand-text/80">
                <span>⏱️ Acesso imediato enviado no seu e-mail após a compra.</span>
              </div>
            </div>

            {/* Satisfaction guarantee badge */}
            <p className="mt-6 text-xs text-brand-text-light max-w-sm mx-auto">
              Se você achar que a ferramenta não ajudou no seu dia a dia na primeira semana, basta solicitar reembolso direto no suporte. Sem perguntas.
            </p>

          </div>
        </section>


        {/* =========================================================================
            FAQ / DÚVIDAS COMUNS (ACCORDION SECTION ADDED TO BOOST CONVERSIONS)
            ========================================================================= */}
        <section id="faq-section" className="py-16 sm:py-24 bg-warm-white border-b border-[#F2EEE7]">
          <div className="max-w-3xl mx-auto px-5">
            
            <div className="text-center max-w-md mx-auto mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-text">
                Dúvidas Frequentes
              </h2>
              <p className="text-brand-text-light text-sm mt-1">
                Tudo o que você precisa saber sobre o ClimaBaby.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: 'Preciso baixar um aplicativo pesado na loja?',
                  a: 'Não! O ClimaBaby é uma ferramenta baseada em tecnologia web progressiva. Você recebe um link exclusivo e adiciona o ícone direto na tela inicial do seu celular. Ele não ocupa espaço na memória, não trava e funciona sempre de forma leve e instantânea.'
                },
                {
                  q: 'Como vou receber o acesso após o pagamento?',
                  a: 'Imediatamente! Assim que o pagamento (Pix ou Cartão) for confirmado pelo checkout seguro da Kiwify, nosso sistema envia automaticamente o seu link exclusivo de acesso vitalício para o e-mail cadastrado.'
                },
                {
                  q: 'Serve para bebês de qualquer idade?',
                  a: 'Sim, o ClimaBaby foi desenvolvido especificamente para orientar recém-nascidos e bebês em fase de desenvolvimento (até os 24 meses). Que é justamente a fase em que o corpo do bebê tem maior dificuldade em manter a regulação de temperatura autônoma.'
                },
                {
                  q: 'As recomendações são seguras?',
                  a: 'Completamente. Nossas faixas térmicas e sugestões são pautadas nas diretrizes rigorosas adotadas pelas sociedades internacionais de pediatria para redução do risco de superaquecimento e sono seguro.'
                }
              ].map((faq, index) => {
                const isOpen = faqOpen === index;
                return (
                  <div 
                    key={index} 
                    className="bg-soft-cream/20 rounded-2xl border border-[#F2EEE7] overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setFaqOpen(isOpen ? null : index)}
                      className="w-full py-4.5 px-6 flex items-center justify-between text-left font-display font-semibold text-[#5F5A55] text-sm sm:text-base hover:bg-soft-cream/50 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span className={`text-brand-text-light transition-transform duration-300 text-lg ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                        ＋
                      </span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, cubicBezier: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-6 pb-5 pt-1 text-xs sm:text-[13px] text-brand-text-light leading-relaxed border-t border-[#F2EEE7]/50">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

      </main>

      {/* =========================================================================
          RODAPÉ (CLEAN FOOTER ACCORDING TO METICULOUS GUIDELINES)
          ========================================================================= */}
      <footer className="bg-[#F8F4EE] py-12 border-t border-[#F1EBE2]">
        <div className="max-w-6xl mx-auto px-5 text-center space-y-6">
          
          <div className="flex flex-col items-center space-y-2">
            <span className="font-display font-black text-xl text-[#5F5A55] flex items-center justify-center gap-1.5 ">
              ClimaBaby 💛
            </span>
            <p className="text-xs text-brand-text-light max-w-sm">
              Criado para trazer mais tranquilidade, conforto e segurança nos cuidados diários com a proteção térmica do seu bebê.
            </p>
          </div>

          {/* Safe micro regulatory warnings & links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-[#8E857C]">
            <button onClick={() => setActiveModal('support')} className="hover:text-brand-text transition-colors cursor-pointer flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> Suporte
            </button>
            <button onClick={() => setActiveModal('privacy')} className="hover:text-brand-text transition-colors cursor-pointer flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" /> Política de Privacidade
            </button>
            <button onClick={() => setActiveModal('terms')} className="hover:text-brand-text transition-colors cursor-pointer flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> Termos de Uso
            </button>
          </div>

          <div className="pt-4 border-t border-[#F1EBE2] text-[10px] text-brand-text-light space-y-1">
            <p>© 2026 ClimaBaby. Todos os direitos reservados. CNPJ: 45.182.234/0001-90</p>
            <p className="opacity-90">O ClimaBaby é uma ferramenta de suporte e orientação e não substitui diagnósticos médicos veterinários ou pediátricos diretos.</p>
          </div>

        </div>
      </footer>


      {/* =========================================================================
          HIGH-CONVERTING SOCIAL PROOF FLOATING TOAST NOTIFICATION
          ========================================================================= */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-6 z-50 bg-warm-white p-3.5 rounded-2xl border border-[#F2EEE7] shadow-premium flex items-center gap-3.5 max-w-xs cursor-pointer select-none"
            onClick={() => scrollToSection('offer-section')}
          >
            <div className="w-9 h-9 rounded-full bg-peach-baby/20 flex items-center justify-center shrink-0">
              <span className="text-sm">💛</span>
            </div>
            <div>
              <p className="text-[11px] font-bold text-brand-textLeading leading-tight font-display">
                {activeNotification.name} ({activeNotification.city})
              </p>
              <p className="text-[10px] text-[#5F5A55]/85">
                Acabou de adquirir o acesso vitalício
              </p>
              <span className="text-[8px] text-[#8E857C] font-semibold uppercase tracking-wider block mt-0.5">
                Há {activeNotification.time}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* =========================================================================
          INFO MODALS (SUPPORT, TERMS, PRIVACY VIEW ON-PAGE)
          ========================================================================= */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop filter blur backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-brand-text/40 backdrop-blur-sm"
            />
            
            {/* Modal Body container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-warm-white w-full max-w-lg rounded-3xl border border-[#F2EEE7] shadow-premium-lg overflow-hidden relative z-10 p-6 sm:p-8 max-h-[85vh] flex flex-col text-left"
            >
              
              {/* Close Button line */}
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F8F4EE] text-brand-text-light hover:text-brand-text transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Variable Headers */}
              {activeModal === 'support' && (
                <div className="space-y-4 flex-1 overflow-y-auto pr-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-peach-baby/20 rounded-xl text-[#BD5B3E]">
                      <Mail className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-brand-text">Central de Suporte</h3>
                  </div>
                  
                  <div className="space-y-4 pt-2 text-xs sm:text-[13px] text-brand-text-light leading-relaxed">
                    <p>
                      Olá! Nós da equipe ClimaBaby estamos sempre prontos para te ajudar, seja com dúvidas técnicas sobre as recomendações ou ajuda com compras efetuadas.
                    </p>
                    
                    <div className="bg-[#F8F4EE] p-4 rounded-xl border border-[#F2EEE7] space-y-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-brand-text-light tracking-wide font-display">E-mail de Contato</span>
                        <p className="text-sm font-bold text-brand-text font-display">suporte@climababy.com.br</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-brand-text-light tracking-wide font-display">Horário de Atendimento</span>
                        <p className="text-sm font-semibold text-brand-text font-display">Segunda a Sexta, das 9h às 18h</p>
                      </div>
                    </div>
                    
                    <p className="text-[10px]">
                      DICA: Se comprou via Pix ou Cartão de crédito, verifique a caixa de Spam ou Promoções do seu e-mail cadastrado, seu acesso deve chegar em até 2 minutos após a compra.
                    </p>
                  </div>
                </div>
              )}

              {activeModal === 'privacy' && (
                <div className="space-y-4 flex-1 overflow-y-auto pr-1 scrollbar-thin">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-sage-green/20 rounded-xl text-emerald-800">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-brand-text">Política de Privacidade</h3>
                  </div>
                  
                  <div className="space-y-3 pt-2 text-xs text-brand-text-light leading-relaxed">
                    <p><strong>Última atualização: 12 de Junho de 2026</strong></p>
                    <p>
                      Nós da ClimaBaby levamos a privacidade dos seus dados e do seu bebê a sério. Esta política detalha como guardamos e tratamos suas informações.
                    </p>
                    <h5 className="font-bold text-brand-text mt-2 font-display">1. Coleta de Informações</h5>
                    <p>
                      Coletamos seu e-mail e nome inseridos na compra no gateway da Kiwify unicamente para podermos validar sua licença vitalícia e liberar seu acesso de segurança pessoal.
                    </p>
                    <h5 className="font-bold text-brand-text mt-2 font-display">2. Detecção de Temperatura e GPS</h5>
                    <p>
                      As coordenadas de GPS solicitadas servem exclusivamente para ler e converter o clima atmosférico da sua rua em tempo real para carregar a calculadora. Elas nunca são salvas nos nossos servidores secundários.
                    </p>
                    <h5 className="font-bold text-brand-text mt-2 font-display">3. Segurança dos dados de Pagamento</h5>
                    <p>
                      As transações financeiras são integralmente processadas pela Kiwify, credenciadora de pagamentos regularizada pelo Banco Central. Jamais temos acesso a seus dados de cartão de crédito.
                    </p>
                  </div>
                </div>
              )}

              {activeModal === 'terms' && (
                <div className="space-y-4 flex-1 overflow-y-auto pr-1 scrollbar-thin">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-peach-baby/20 rounded-xl text-[#BD5B3E]">
                      <Info className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-brand-text">Termos de Uso</h3>
                  </div>
                  
                  <div className="space-y-3 pt-2 text-xs text-brand-text-light leading-relaxed">
                    <p><strong>Última atualização: 12 de Junho de 2026</strong></p>
                    <p>
                      Ao utilizar o aplicativo ClimaBaby, você declara estar de acordo com os termos e regras descritos adiante.
                    </p>
                    <h5 className="font-bold text-brand-text mt-2 font-display">1. Licença de Uso</h5>
                    <p>
                      A aquisição do ClimaBaby concede uma licença exclusiva, pessoal, individual e intransferível de uso do aplicativo de forma vitalícia, sem taxas recorrentes futuras.
                    </p>
                    <h5 className="font-bold text-brand-text mt-2 font-display">2. Limites do Diagnóstico Médico</h5>
                    <p>
                      O ClimaBaby é um assistente preventivo prático para ajudar na seleção de roupas baseado em dados térmicos ambientais. **Ele não substitui o julgamento profissional dos pais e de pediatras clínicos especializados.** Sempre consulte seu pediatra em caso de febres ou comportamentos incomuns.
                    </p>
                    <h5 className="font-bold text-brand-text mt-2 font-display">3. Estabilidade do Serviço</h5>
                    <p>
                      Trabalhamos intensamente para manter o serviço 24/7 online com dados climáticos integrados de APIs de precisão de meteorologia.
                    </p>
                  </div>
                </div>
              )}

              {/* Modal footer confirm click */}
              <div className="pt-4 mt-4 border-t border-[#F2EEE7]/85 flex justify-end">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2.5 bg-brand-text text-warm-white text-xs font-semibold rounded-xl font-display hover:bg-[#4D4843] transition-colors cursor-pointer"
                >
                  Entendi e Fechar
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
