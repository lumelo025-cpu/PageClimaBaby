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


export default function App() {
  // Mobile Nav states
  const [activeTab, setActiveTab] = useState<'home' | 'dor' | 'funcionamento' | 'differenciais' | 'oferta'>('home');
  // Modal states for support and terms
  const [activeModal, setActiveModal] = useState<'support' | 'privacy' | 'terms' | null>(null);
  
  // High-converting notifications (App Store style)
  const [activeNotification, setActiveNotification] = useState<{ name: string; city: string; time: string } | null>(null);

  // FAQ states
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Exit Intent states
  const [isExitIntentOpen, setIsExitIntentOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsMobile(window.innerWidth < 640);
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Exit intent hook
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if we should disable triggering (already shown or clicked buy)
    const shouldDisable = () => {
      try {
        return (
          localStorage.getItem('climababy_exit_intent_shown') === 'true' ||
          localStorage.getItem('climababy_purchased_clicked') === 'true'
        );
      } catch (e) {
        return false;
      }
    };

    if (shouldDisable()) return;

    const triggerExitIntent = () => {
      if (shouldDisable()) return;
      try {
        localStorage.setItem('climababy_exit_intent_shown', 'true');
      } catch (e) {}
      setIsExitIntentOpen(true);
      cleanup();
    };

    // 1. DESKTOP trigger: mouse leaving the top viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20) {
        triggerExitIntent();
      }
    };

    // 2. MOBILE trigger A: rapid scroll up after scrolling down at least 300px
    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();
    let maxScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      
      if (currentScrollY > maxScrollY) {
        maxScrollY = currentScrollY;
      }

      const diffY = lastScrollY - currentScrollY; // positive means scrolling up
      const diffTime = currentTime - lastScrollTime;

      if (maxScrollY > 300 && diffY > 80 && diffTime < 250 && diffTime > 10) {
        // Rapid scroll up detected!
        triggerExitIntent();
      }

      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;
    };

    // 3. MOBILE/DESKTOP trigger B: inactivity for 12 seconds after some activity / scrolling down
    let inactivityTimer: NodeJS.Timeout;
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      
      if (window.scrollY > 150) {
        inactivityTimer = setTimeout(() => {
          triggerExitIntent();
        }, 12000); // 12 seconds of inactivity
      }
    };

    const activityHandler = () => {
      resetInactivityTimer();
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);
    
    window.addEventListener('scroll', activityHandler);
    window.addEventListener('mousemove', activityHandler);
    window.addEventListener('touchstart', activityHandler);

    const cleanup = () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', activityHandler);
      window.removeEventListener('mousemove', activityHandler);
      window.removeEventListener('touchstart', activityHandler);
      clearTimeout(inactivityTimer);
    };

    resetInactivityTimer();

    return cleanup;
  }, []);

  // Kiwify Checkout Redirect for Discounted Offer
  const handleExitIntentCheckout = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      try {
        (window as any).fbq('track', 'InitiateCheckout', {
          value: 19.90,
          currency: 'BRL',
          content_name: 'ClimaBaby ACESSO COMPLETO DESCONTO',
          content_category: 'Maternidade',
          content_ids: ['climababych01_discount'],
          content_type: 'product'
        });
      } catch (e) {
        console.error('Error tracking pixel event:', e);
      }
    }

    try {
      localStorage.setItem('climababy_purchased_clicked', 'true');
    } catch (e) {}

    setIsExitIntentOpen(false);
    window.open('https://pay.kiwify.com.br/6rQxenX', '_blank');
  };

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Kiwify Checkout Redirect Simulation or Integration
  const handleCheckoutRedirect = () => {
    // Fire Meta / Facebook Pixel InitiateCheckout custom event safely
    if (typeof window !== 'undefined' && (window as any).fbq) {
      try {
        (window as any).fbq('track', 'InitiateCheckout', {
          value: 29.90,
          currency: 'BRL',
          content_name: 'ClimaBaby ACESSO COMPLETO',
          content_category: 'Maternidade',
          content_ids: ['climababych01'],
          content_type: 'product'
        });
      } catch (e) {
        console.error('Error tracking pixel event:', e);
      }
    }
    
    // Remember purchase button was clicked to avoid showing exit intent
    try {
      localStorage.setItem('climababy_purchased_clicked', 'true');
    } catch (e) {}

    // Standard secure redirect to Kiwify checkout placeholder or real link
    window.open('https://pay.kiwify.com.br/n9buLYP', '_blank');
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
    <div className="min-h-screen bg-soft-cream font-sans text-brand-text flex flex-col relative antialiased selection:bg-peach-baby/40 selection:text-brand-text">
      
      {/* 1. Header Navigation Bar (Premium glassmorphic styled) */}
      <header className="sticky top-0 z-40 bg-warm-white/80 backdrop-blur-md border-b border-[#F2EEE7]/80 transition-all">
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
            <button onClick={() => scrollToSection('dor-section')} className="hover:text-brand-primary transition-colors cursor-pointer">Quantas vezes pensou</button>
            <button onClick={() => scrollToSection('funcionamento-section')} className="hover:text-brand-primary transition-colors cursor-pointer">Como funciona</button>
            <button onClick={() => scrollToSection('diferenciais-section')} className="hover:text-brand-primary transition-colors cursor-pointer">Diferenciais</button>
            <button onClick={() => scrollToSection('faq-section')} className="hover:text-brand-primary transition-colors cursor-pointer">Dúvidas comuns</button>
          </nav>

          {/* CTA header button */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => scrollToSection('offer-section')}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-button-primary text-warm-white text-xs sm:text-sm font-semibold tracking-tight font-display hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              Quero meu ClimaBaby
            </button>
          </div>

        </div>
      </header>

      {/* Main Container Content */}
      <main className="flex-1">

        {/* =========================================================================
            PRIMEIRA DOBRA — BANNER DESTAQUE PRINCIPAL (TELA CHEIA NO MOBILE)
            ========================================================================= */}
        <section className="w-full bg-soft-cream border-b border-[#F2EEE7]/80 overflow-hidden py-0 sm:py-8">
          <div className="max-w-7xl mx-auto px-0 sm:px-5">
            <div className="relative w-full overflow-hidden sm:rounded-[32px] border-b sm:border border-[#F2EEE7] bg-warm-white shadow-sm sm:shadow-premium select-none">
              <img 
                id="hero-banner-image"
                src="https://site.maecompleta.com/wp-content/uploads/2026/06/ChatGPT-Image-16-de-jun.-de-2026-21_44_13.png" 
                alt="ClimaBaby App Banner de Boas-vindas" 
                className="w-full h-auto object-cover max-h-[640px] sm:max-h-none select-none transition-transform duration-300 hover:scale-[1.005] cursor-pointer"
                onClick={() => document.getElementById('offer-section')?.scrollIntoView({ behavior: 'smooth' })}
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="sync"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
            </div>
          </div>
        </section>



        <section id="dor-section" className="py-16 sm:py-24 bg-soft-cream border-b border-[#F2EEE7]">
          <div className="max-w-3xl mx-auto px-5 text-center">
            
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary font-display bg-peach-baby/25 px-2.5 py-1 rounded-full">A Maternidade Real</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 text-brand-text">
              💛 A maternidade é feita de pequenas dúvidas
            </h2>
            <p className="text-brand-text-light text-base mt-4 max-w-2xl mx-auto leading-relaxed font-semibold">
              Mesmo com todo amor e cuidado, uma pergunta aparece todos os dias:
            </p>

            {/* Questions list styled beautifully */}
            <div className="max-w-xl mx-auto mt-8 space-y-4">
              {[
                "“Será que meu bebê está com frio ou calor?”",
                "“Será que essa roupa é suficiente para dormir?”",
                "“Será que estou colocando camadas demais?”"
              ].map((question, idx) => (
                <div 
                  key={idx} 
                  className="bg-warm-white py-4 px-6 rounded-2xl border border-[#F2EEE7] text-center shadow-sm select-none hover:border-peach-baby-light transition-all"
                >
                  <p className="font-display font-semibold text-brand-primary text-sm sm:text-base italic leading-relaxed">
                    {question}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-brand-text text-sm sm:text-base font-semibold mt-8 max-w-xl mx-auto leading-relaxed">
              O ClimaBaby ajuda você a tomar essa decisão em segundos, considerando o ambiente real e o momento do seu bebê.
            </p>

          </div>
        </section>





        {/* =========================================================================
            SEÇÃO 3 — COMO FUNCIONA (SMEAR & CLEAN STEP-BY-STEP PROCESS)
            ========================================================================= */}
        <section id="funcionamento-section" className="py-16 sm:py-24 bg-soft-cream border-b border-[#F2EEE7]">
          <div className="max-w-6xl mx-auto px-5 mb-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary font-display bg-peach-baby/25 px-2.5 py-1 rounded-full">Como funciona</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-1.5 text-brand-text leading-tight">
                Em menos de 30 segundos você descobre a roupa ideal
              </h2>
              <p className="text-brand-text-light text-sm sm:text-base mt-3 leading-relaxed max-w-lg mx-auto">
                É simples: responda algumas perguntas e o ClimaBaby cria uma recomendação personalizada para o seu bebê.
              </p>
            </div>
          </div>

          {/* Cards verticais inovadores, otimizados para mobile */}
          <div className="max-w-xl mx-auto px-5 mt-6 space-y-6 relative">
            
            {/* Linha de conexão elegante entre as etapas */}
            <div className="absolute left-[44px] sm:left-[52px] top-10 bottom-10 w-[2px] bg-gradient-to-b from-brand-primary/20 via-peach-baby-light/40 to-[#F2EEE7] hidden xs:block" />

            {[
              {
                icon: "🌡️",
                title: "Como está o ambiente?",
                text: "Informe como está a temperatura do local onde o bebê está."
              },
              {
                icon: "👶",
                title: "Qual é o momento do bebê?",
                text: "Diga se ele está acordado, no colo, brincando ou vai dormir."
              },
              {
                icon: "🏠",
                title: "O ambiente tem algum ajuste?",
                text: "Considere fatores como ar-condicionado, vento ou ambiente fechado."
              },
              {
                icon: "💛",
                title: "Receba sua recomendação personalizada",
                text: "Veja a combinação de roupas ideal, camadas, tecidos e orientações de conforto."
              }
            ].map((step, idx) => (
              <div 
                key={idx}
                className="relative bg-warm-white p-5 sm:p-6 rounded-[24px] border border-[#F2EEE7] shadow-[0_4px_20px_-4px_rgba(238,228,214,0.3)] hover:shadow-premium transition-all duration-300 flex items-start gap-4 sm:gap-5 group hover:border-brand-primary/30"
              >
                {/* Círculo do ícone delicado com borda sutil */}
                <div className="relative z-10 w-12 h-12 rounded-2xl bg-soft-cream flex items-center justify-center text-2xl shrink-0 shadow-sm border border-[#F2EEE7]/60 ring-4 ring-[#F8F5F0] transition-colors group-hover:bg-peach-baby/20">
                  {step.icon}
                </div>

                {/* Conteúdo do texto */}
                <div className="space-y-1 pt-0.5">
                  <span className="text-[10px] font-extrabold text-brand-primary uppercase tracking-widest font-display block opacity-85">
                    Passo 0{idx + 1}
                  </span>
                  <h3 className="font-display font-extrabold text-[#2F2722] text-sm sm:text-base leading-snug group-hover:text-brand-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[12px] sm:text-[13px] text-brand-text-light leading-relaxed font-medium">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* =========================================================================
            O RESULTADO QUE O APP ENTREGA — DETALHAMENTO DO RESULTADO FINAL
            ========================================================================= */}
        <section className="py-16 sm:py-24 bg-soft-cream border-b border-[#F2EEE7]/90 overflow-hidden">
          <div className="max-w-6xl mx-auto px-5 mb-12">
            
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary font-display bg-peach-baby/25 px-2.5 py-1 rounded-full border border-peach-baby/40">
                Resultado Completo
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-brand-text leading-tight">
                Uma recomendação completa e fácil de entender
              </h2>
              <p className="text-brand-text-light text-sm mt-3 max-w-lg mx-auto leading-relaxed">
                O ClimaBaby organiza tudo de forma simples para que você saiba exatamente como vestir seu bebê.
              </p>
            </div>

            {/* List underneath works */}
            <div className="text-center mt-10 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                {[
                  'Combinação de roupas indicada para o momento',
                  'Método das camadas explicado de forma simples',
                  'Tecidos confortáveis para cada temperatura',
                  'Orientações de conforto e sono seguro'
                ].map((item) => (
                  <div key={item} className="bg-warm-white p-4 rounded-2xl border border-[#F2EEE7] flex items-center gap-2.5 shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-sage-green/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-sage-green" />
                    </div>
                    <span className="text-xs sm:text-sm text-brand-text font-medium leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Imagem do resultado entregue em tela cheia neste bloco */}
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 relative overflow-visible">
            
            {/* Background Stage Halos/Efeitos Luminosos para dar profundidade de 3D */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-peach-baby/20 blur-3xl opacity-60 pointer-events-none select-none" />
            <div className="absolute top-1/3 right-1/4 -translate-y-1/2 translate-x-1/2 w-80 h-80 rounded-full bg-sage-green/10 blur-3xl opacity-50 pointer-events-none select-none" />

            {/* Floating Playful 3D-like badges / icones decorativos ao redor (Desktop only for UX simplicity) */}
            <div className="absolute left-2 xl:left-4 top-1/4 -translate-y-1/2 hidden lg:flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-peach-baby/40 shadow-premium-md animate-bounce [animation-duration:6s] z-20">
              <span className="text-xl">✨</span>
              <div>
                <p className="text-[11px] font-extrabold text-brand-text uppercase tracking-wider font-display">Sem Dúvidas</p>
                <p className="text-[10px] text-brand-text-light font-medium">Recomendação Clara</p>
              </div>
            </div>

            <div className="absolute right-2 xl:right-4 top-12 hidden lg:flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#F2EEE7] shadow-premium-md animate-bounce [animation-duration:5s] z-20">
              <span className="text-xl">🌙</span>
              <div>
                <p className="text-[11px] font-extrabold text-brand-text uppercase tracking-wider font-display">Sono Seguro</p>
                <p className="text-[10px] text-brand-text-light font-medium">Noite Tranquila</p>
              </div>
            </div>

            <div className="absolute right-12 bottom-12 hidden lg:flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-peach-baby/40 shadow-premium-md animate-bounce [animation-duration:7s] z-20 font-display">
              <span className="text-xl">🧸</span>
              <div>
                <p className="text-[11px] font-extrabold text-brand-primary uppercase tracking-wider">Multi-Camadas</p>
                <p className="text-[10px] text-brand-text-light font-medium">Fácil de Vestir</p>
              </div>
            </div>

            {/* Little floating stars / items to look playful (lúdico) */}
            <div className="absolute left-1/4 top-4 hidden md:block text-2xl animate-pulse opacity-60 select-none">⭐</div>
            <div className="absolute right-1/4 bottom-4 hidden md:block text-2xl animate-pulse delay-75 opacity-60 select-none">☁️</div>
            <div className="absolute left-12 bottom-16 hidden md:block text-xl animate-pulse delay-150 opacity-40 select-none">👶</div>

            {/* 3D Perspective Canvas Container */}
            <div className="w-full flex justify-center [perspective:1200px]">
              <div className="relative w-full max-w-5xl rounded-[24px] sm:rounded-[40px] p-2 sm:p-4 bg-gradient-to-tr from-[#F2EEE7]/85 via-warm-white to-peach-baby/30 border border-[#F2EEE7] shadow-[0_20px_50px_rgba(47,39,34,0.12)] select-none overflow-hidden transition-all duration-700 ease-out group hover:shadow-[0_30px_60px_rgba(47,39,34,0.18)] sm:[transform:rotateX(2.5deg)_rotateY(-1.5deg)] sm:hover:[transform:rotateX(0deg)_rotateY(0deg)] transform-gpu">
                
                {/* Accent glow on top header of the element */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent opacity-80" />
                
                <div className="relative overflow-hidden rounded-[18px] sm:rounded-[30px] border border-stone-200 shadow-inner bg-soft-cream">
                  <img 
                    src="https://site.maecompleta.com/wp-content/uploads/2026/06/Captura-de-tela-2026-06-14-230041.png" 
                    alt="O resultado detalhado fornecido pelo ClimaBaby" 
                    className="w-full h-auto object-cover max-h-[720px] transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                  />
                  
                  {/* Subtle gloss overlay to make it look super premium and clean like glass */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/15 pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* =========================================================================
            QUADRO INSTANTÂNEO DE IMAGEM 2 — EXATIDÃO VISUAL DE PEÇAS (appclimababy2.png)
            ========================================================================= */}
        <section className="py-16 sm:py-20 bg-soft-cream border-b border-[#F2EEE7]/85">
          <div className="max-w-5xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            
            {/* Real Screenshot 2 Device Mockup on the left for alternating balance */}
            <div className="flex justify-center order-last md:order-first">
              <div className="relative bg-[#1A1512] rounded-[38px] p-2.5 border-[3.5px] border-[#8E857C]/25 shadow-premium-lg">
                {/* Smartphone notch decor */}
                <div className="absolute top-3.5 left-1/2 transform -translate-x-1/2 w-20 h-4.5 bg-black rounded-full z-20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-stone-900 rounded-full mr-1.5" />
                  <div className="w-8 h-0.5 bg-stone-900 rounded" />
                </div>
                {/* Visual containment field */}
                <div className="rounded-[30px] overflow-hidden w-[240px] aspect-[9/19.5] bg-soft-cream flex items-center justify-center relative border border-slate-900/5">
                  <img 
                    src="https://site.maecompleta.com/wp-content/uploads/2026/06/appclimababy4.png" 
                    alt="Peças de Roupa Recomendadas ClimaBaby"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                  />
                </div>
              </div>
            </div>

            <div className="text-left space-y-4">
              <span className="text-[10px] font-extrabold text-brand-primary uppercase tracking-wider font-display bg-peach-baby/25 px-2.5 py-1 rounded-full border border-peach-baby/40 inline-block">
                Veja na tela as peças sugeridas
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-text leading-tight">
                Você vê exatamente o que vestir
              </h3>
              <p className="text-brand-text-light text-[13px] leading-relaxed">
                O ClimaBaby não apenas fala o que usar. Ele mostra as peças recomendadas com imagens claras para facilitar sua escolha.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  'Visualize as peças recomendadas',
                  'Método de camadas fácil de entender',
                  'Orientações de conforto e proteção para cada clima'
                ].map((item, id) => (
                  <div key={id} className="flex items-start gap-2.5">
                    <Check className="w-3.5 h-3.5 text-sage-green bg-sage-green/20 rounded-full p-0.5 mt-0.5 shrink-0" />
                    <span className="text-[12px] text-brand-text/90 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>





        {/* =========================================================================
            SEÇÃO 4 — O DIFERENCIAL CLIMABABY (APP-STORE STYLE GRID)
            ========================================================================= */}
        <section id="diferenciais-section" className="py-16 sm:py-24 bg-soft-cream border-b border-[#F2EEE7]">
          <div className="max-w-6xl mx-auto px-5">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary font-display font-semibold bg-peach-baby/25 px-2.5 py-1 rounded-full animate-fade-in">Diferenciais</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-brand-text">
                O que torna o ClimaBaby diferente?
              </h2>
              <p className="text-brand-text-light text-sm mt-3 leading-relaxed">
                Criado para ajudar mães e pais a vestirem o bebê com mais segurança e tranquilidade, o ClimaBaby analisa fatores que realmente fazem diferença no conforto térmico do seu pequeno.
              </p>
            </div>

            {/* Modern iOS App store styled bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Diff 1 */}
              <div className="bg-warm-white p-6 rounded-3xl border border-[#F2EEE7] shadow-sm flex gap-4 hover:translate-y-[-2px] transition-all animate-fade-in">
                <span className="text-3xl shrink-0">🌡️</span>
                <div>
                  <h3 className="font-display font-semibold text-brand-text text-sm sm:text-base">Analisa o ambiente real</h3>
                  <p className="text-[12px] text-brand-text-light mt-1.5 leading-relaxed">
                    Não considera apenas a temperatura da rua. Leva em conta o ambiente onde o bebê realmente está, como quarto fechado, vento ou ar-condicionado.
                  </p>
                </div>
              </div>

              {/* Diff 2 */}
              <div className="bg-warm-white p-6 rounded-3xl border border-[#F2EEE7] shadow-sm flex gap-4 hover:translate-y-[-2px] transition-all animate-fade-in">
                <span className="text-3xl shrink-0">😴</span>
                <div>
                  <h3 className="font-display font-semibold text-brand-text text-sm sm:text-base">Entende o momento do bebê</h3>
                  <p className="text-[12px] text-brand-text-light mt-1.5 leading-relaxed">
                    Dormir, brincar ou ficar no colo são situações diferentes e exigem cuidados diferentes.
                  </p>
                </div>
              </div>

              {/* Diff 3 */}
              <div className="bg-warm-white p-6 rounded-3xl border border-[#F2EEE7] shadow-sm flex gap-4 hover:translate-y-[-2px] transition-all animate-fade-in">
                <span className="text-3xl shrink-0">🤱</span>
                <div>
                  <h3 className="font-display font-semibold text-brand-text text-sm sm:text-base">Considera a rotina do bebê</h3>
                  <p className="text-[12px] text-brand-text-light mt-1.5 leading-relaxed">
                    O calor do colo ou do sling também influencia no conforto térmico do bebê.
                  </p>
                </div>
              </div>

              {/* Diff 4 */}
              <div className="bg-warm-white p-6 rounded-3xl border border-[#F2EEE7] shadow-sm flex gap-4 hover:translate-y-[-2px] transition-all animate-fade-in">
                <span className="text-3xl shrink-0">🧸</span>
                <div>
                  <h3 className="font-display font-semibold text-brand-text text-sm sm:text-base">Ensina a vestir por camadas</h3>
                  <p className="text-[12px] text-brand-text-light mt-1.5 leading-relaxed">
                    Mostra quais peças combinar de forma simples e prática.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>





        {/* =========================================================================
            SEÇÃO 5 — OFERTA (PREMIUM SALES CLOSING CARD)
            ========================================================================= */}
        <section id="offer-section" className="py-20 sm:py-28 bg-soft-cream border-b border-[#F2EEE7]">
          <div className="max-w-4xl mx-auto px-5 text-center">
            
            <div className="max-w-2xl mx-auto space-y-4">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-text leading-tight animate-fade-in">
                💛 Um cuidado que acompanha todos os dias
              </h2>
              <p className="text-brand-text-light text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
                Por menos que o valor de uma única roupinha de bebê, você terá uma ferramenta inteligente sempre disponível no celular para ajudar nas decisões do dia a dia.
              </p>
            </div>

            {/* Complete premium Offer block with gorgeous modern presentation */}
            <div className="relative max-w-md mx-auto mt-16 group">
              
              {/* Floating badges on large screens to increase conversion (social proof, safety) */}
              <div className="absolute -left-20 xl:-left-28 bottom-24 hidden lg:flex items-center gap-3 bg-[#FFFDFC]/95 backdrop-blur-md p-4 rounded-2xl border border-peach-baby/40 shadow-[0_10px_30px_rgba(94,86,80,0.06)] z-25 w-48 text-left animate-bounce [animation-duration:8s] select-none">
                <div className="w-9 h-9 rounded-xl bg-peach-baby/20 flex items-center justify-center text-lg">👩‍👦</div>
                <div>
                  <p className="text-[10px] font-extrabold text-[#2F2722] uppercase tracking-wider font-display">Mais de 1.800</p>
                  <p className="text-[10px] text-brand-text-light font-medium leading-tight">mães prevenidas já usam e aprovam</p>
                </div>
              </div>
              
              <div className="absolute -right-20 xl:-right-28 top-16 hidden lg:flex items-center gap-3 bg-[#FFFDFC]/95 backdrop-blur-md p-4 rounded-2xl border border-peach-baby/40 shadow-[0_10px_30px_rgba(94,86,80,0.06)] z-25 w-48 text-left animate-bounce [animation-duration:7s] select-none">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-lg">🔒</div>
                <div>
                  <p className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider font-display">Compra Segura</p>
                  <p className="text-[10px] text-brand-text-light font-medium leading-tight">Ambiente criptografado e 100% livre de riscos</p>
                </div>
              </div>

              {/* Floating Special Offer Badge overlapping the card's top edge */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-[#FF7A45] to-[#FF551D] text-white text-[11px] font-extrabold uppercase tracking-widest px-6 py-2.5 rounded-full shadow-[0_8px_24px_rgba(255,107,53,0.35)] flex items-center gap-1.5 whitespace-nowrap select-none animate-pulse">
                <Sparkles className="w-3.5 h-3.5 fill-white shrink-0" />
                <span>Oferta Especial de Lançamento</span>
              </div>

              {/* Behind/Under card decorative glow effect */}
              <div className="absolute inset-x-4 -inset-y-2 bg-gradient-to-tr from-peach-baby/20 via-brand-primary/10 to-orange-500/10 rounded-[36px] blur-2xl opacity-75 -z-10 group-hover:scale-105 transition-transform duration-500" />

              {/* Main Premium Cards container */}
              <div className="bg-warm-white rounded-[32px] border border-[#F2EEE7]/90 shadow-[0_20px_50px_rgba(94,86,80,0.12)] hover:shadow-[0_25px_60px_rgba(94,86,80,0.16)] transition-all duration-500 overflow-hidden relative transform group-hover:translate-y-[-2px]">
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-brand-primary via-[#FF7A45] to-brand-primary" />
                
                <div className="p-8 sm:p-10 space-y-6">
                  
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs sm:text-sm font-extrabold text-[#7E756E] uppercase tracking-widest font-display">
                      Acesso Completo Imediato
                    </h3>
                    <div className="relative inline-block max-w-full">
                      {/* Floating mini badge for price discount */}
                      <span className="absolute -top-3 -right-12 rotate-12 bg-emerald-600 text-[9px] font-extrabold text-white px-2.5 py-0.5 rounded-full shadow-sm">
                        PAGAMENTO ÚNICO
                      </span>
                      <div className="text-center py-1 flex flex-col items-center justify-center">
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-xs font-bold text-brand-text-light font-display">Apenas</span>
                          <span className="text-sm font-semibold text-[#2F2722] pb-1 font-display">R$</span>
                          <span className="text-5xl sm:text-6xl font-black text-[#2F2722] tracking-tight font-display">29,90</span>
                        </div>
                        <div className="text-xs sm:text-sm font-extrabold text-[#FF6036] tracking-wide font-display mt-1">
                          ou até 6x de R$ 5,61
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] sm:text-xs text-brand-text-light font-medium">Pagamento único. Sem mensalidades ou surpresas futuras.</p>
                  </div>

                  <div className="border-t border-[#F2EEE7] pt-6 space-y-4 text-left">
                    {[
                      'Acesso instantâneo no celular',
                      'Calculadora inteligente baseada em ciência térmica',
                      'Recomendações customizadas para noite e dia',
                      'Orientações extras sobre tecidos e calçados',
                      'Dicas essenciais de sono seguro e conforto',
                      'Garantia incondicional de 7 dias inclusa'
                    ].map((feat) => (
                      <div key={feat} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-peach-baby/25 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-brand-primary" />
                        </div>
                        <span className="text-xs sm:text-[13px] font-semibold text-[#5E5650]">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stunning high converting bright orange button redirecting with nice design */}
                  <div className="pt-2">
                    <button 
                      onClick={handleCheckoutRedirect}
                      className="w-full py-4.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF7A45] via-[#FF6036] to-[#E24A18] text-white text-base font-extrabold tracking-wide font-display shadow-[0_12px_28px_rgba(255,107,53,0.35)] hover:shadow-[0_16px_36px_rgba(255,107,53,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-5 h-5 shrink-0 animate-pulse" />
                      QUERO GARANTIR O CLIMABABY
                    </button>
                    
                    <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-[#7E756E] font-medium">
                      <span className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-emerald-700" /> Compra segura
                      </span>
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Kiwify Garantido
                      </span>
                    </div>
                  </div>

                </div>
                
                <div className="bg-soft-cream/60 py-4 px-6 border-t border-[#F2EEE7] flex items-center justify-center gap-1.5 text-xs text-brand-text/80 font-medium">
                  <span>⏱️ Acesso imediato enviado no seu e-mail após a compra.</span>
                </div>
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
        <section id="faq-section" className="py-16 sm:py-24 bg-soft-cream border-b border-[#F2EEE7]">
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
                  a: 'Imediatamente! Assim que o pagamento (Pix ou Cartão) for confirmado pelo checkout seguro da Kiwify, nosso sistema envia automaticamente o seu link exclusivo de acesso completo para o e-mail cadastrado.'
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
                    className="bg-warm-white rounded-2xl border border-[#F2EEE7] overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setFaqOpen(isOpen ? null : index)}
                      className="w-full py-4.5 px-6 flex items-center justify-between text-left font-display font-semibold text-brand-text text-sm sm:text-base hover:bg-soft-cream/60 transition-colors cursor-pointer"
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
      <footer className="bg-soft-cream py-12 border-t border-[#F1EBE2]">
        <div className="max-w-6xl mx-auto px-5 text-center space-y-6">
          
          <div className="flex flex-col items-center space-y-2">
            <span className="font-display font-black text-xl text-brand-text flex items-center justify-center gap-1.5 ">
              ClimaBaby 💛
            </span>
            <p className="text-xs text-brand-text-light max-w-sm">
              Mais tranquilidade para as pequenas decisões do dia a dia.
            </p>
          </div>

          {/* Safe micro regulatory warnings & links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-brand-text-light">
            <button onClick={() => setActiveModal('support')} className="hover:text-brand-text transition-colors cursor-pointer flex items-center gap-1">
              📧 Suporte
            </button>
            <button onClick={() => setActiveModal('privacy')} className="hover:text-brand-text transition-colors cursor-pointer flex items-center gap-1">
              📄 Política de Privacidade
            </button>
            <button onClick={() => setActiveModal('terms')} className="hover:text-brand-text transition-colors cursor-pointer flex items-center gap-1">
              ℹ️ Termos de Uso
            </button>
          </div>

          <div className="pt-4 border-t border-[#F1EBE2] text-[10px] text-brand-text-light space-y-2">
            <p>© 2026 ClimaBaby. Todos os direitos reservados.</p>
            <p className="opacity-90 max-w-2xl mx-auto">
              Ferramenta de orientação para ajudar famílias a escolherem combinações de roupas mais adequadas para o conforto térmico do bebê.
            </p>
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
              <p className="text-[11px] font-bold text-brand-text leading-tight font-display">
                {activeNotification.name} ({activeNotification.city})
              </p>
              <p className="text-[10px] text-brand-text-light">
                Adquiriu o ClimaBaby agora
              </p>
              <span className="text-[8px] text-brand-text-light font-semibold uppercase tracking-wider block mt-0.5">
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
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-soft-cream/60 text-brand-text-light hover:text-brand-text transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Variable Headers */}
              {activeModal === 'support' && (
                <div className="space-y-4 flex-1 overflow-y-auto pr-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-peach-baby/20 rounded-xl text-brand-primary">
                      <Mail className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-brand-text">Central de Suporte</h3>
                  </div>
                  
                  <div className="space-y-4 pt-2 text-xs sm:text-[13px] text-brand-text-light leading-relaxed">
                    <p>
                      Olá! Nós da equipe ClimaBaby estamos sempre prontos para te ajudar, seja com dúvidas técnicas sobre as recomendações ou ajuda com compras efetuadas.
                    </p>
                    
                    <div className="bg-soft-cream p-4 rounded-xl border border-[#F2EEE7] space-y-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-brand-text-light tracking-wide font-display">E-mail de Contato</span>
                        <p className="text-sm font-bold text-brand-text font-display">maecompleta.contato@gmail.com</p>
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
                      Coletamos seu e-mail e nome inseridos na compra no gateway da Kiwify unicamente para podermos validar sua compra e liberar seu acesso de segurança pessoal.
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
                    <div className="p-2.5 bg-peach-baby/20 rounded-xl text-brand-primary">
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
                      A aquisição do ClimaBaby concede uma licença exclusiva, pessoal, individual e intransferível de uso do aplicativo, sem taxas recorrentes futuras.
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

      {/* =========================================================================
          EXIT INTENT POP-UP / BOTTOM SHEET
          ========================================================================= */}
      <AnimatePresence>
        {isExitIntentOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop filter blur backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExitIntentOpen(false)}
              className="absolute inset-0 bg-brand-text/50 backdrop-blur-sm"
            />
            
            {/* Sheet / Modal container */}
            <motion.div 
              // Slide up on mobile (<640px), fade and scale up on desktop
              initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 15 }}
              animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
              exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="bg-[#FFFDF9] w-full sm:max-w-md rounded-t-[32px] sm:rounded-[32px] border-t sm:border border-[#F8F4EE] shadow-premium-lg overflow-hidden relative z-10 p-6 sm:p-8 max-h-[72vh] sm:max-h-[90vh] overflow-y-auto flex flex-col text-center"
            >
              {/* Handle bar for bottom sheet (visible on mobile only) */}
              <div className="w-12 h-1.5 bg-[#F8F4EE] rounded-full mx-auto mb-4 sm:hidden" />

              {/* Discrete Close Button */}
              <button 
                onClick={() => setIsExitIntentOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F8F4EE] text-[#7E756E] hover:text-[#5E5650] transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1 flex flex-col justify-center py-2 text-center">
                {/* Visual indicator (soft heart/star/badge) */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F8F4EE] text-2xl mx-auto mb-4 select-none animate-bounce">
                  💛
                </div>

                {/* Título */}
                <h3 className="text-2xl sm:text-3xl font-black text-[#5E5650] font-display tracking-tight mb-2">
                  Espere! 💛
                </h3>

                {/* Headline */}
                <h4 className="text-base sm:text-lg font-extrabold text-[#D89A85] font-display tracking-tight leading-snug mb-3">
                  Leve o ClimaBaby com R$10 de desconto
                </h4>

                {/* Texto */}
                <p className="text-xs sm:text-sm text-[#7E756E] leading-relaxed mb-5 max-w-sm mx-auto font-medium">
                  Essa condição especial é válida somente agora, enquanto você está nesta página.
                </p>

                {/* Preço Section */}
                <div className="bg-[#F8F4EE] rounded-2xl py-3.5 px-4 mb-5 border border-[#FFFDF9] max-w-xs mx-auto w-full">
                  <p className="text-xs text-[#7E756E] line-through font-semibold mb-0.5">De R$ 29,90</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-[10px] font-bold text-[#D89A85] uppercase tracking-wider mr-1">Por apenas</span>
                    <span className="text-xs font-extrabold text-[#5E5650]">R$</span>
                    <span className="text-3xl sm:text-4xl font-black text-[#5E5650] tracking-tight">19,90</span>
                  </div>
                  <p className="text-[9px] text-[#7E756E] font-bold uppercase tracking-wider mt-1.5">
                    Pagamento Único
                  </p>
                </div>

                {/* Subtexto */}
                <p className="text-[10px] sm:text-xs text-[#7E756E] font-bold tracking-wide mb-6">
                  Acesso imediato • Uso vitalício • Garantia de 7 dias
                </p>

                {/* Botão Principal */}
                <button 
                  onClick={handleExitIntentCheckout}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#D89A85] via-[#E2A18D] to-[#BF816E] text-white text-sm sm:text-base font-black tracking-wide font-display shadow-[0_8px_20px_rgba(216,154,133,0.35)] hover:shadow-[0_12px_28px_rgba(216,154,133,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer mb-2 uppercase"
                >
                  QUERO MEU DESCONTO DE R$10
                </button>

                {/* Small text below main button */}
                <p className="text-[9px] sm:text-[10px] text-[#7E756E] font-medium leading-relaxed max-w-[280px] mx-auto mb-5">
                  Oferta exclusiva desta página. Ao sair, o desconto pode não estar mais disponível.
                </p>

                {/* Botão Secundário */}
                <button 
                  onClick={() => setIsExitIntentOpen(false)}
                  className="text-xs font-bold text-[#7E756E] hover:text-[#5E5650] underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Continuar vendo a página
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
