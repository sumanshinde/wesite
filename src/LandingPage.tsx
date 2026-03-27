import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, ShieldCheck, Star, Clock, Phone, MessageCircle, WashingMachine, Refrigerator, Microwave, ChevronLeft, User, Check, Zap } from 'lucide-react';

const APPLIANCES = [
  { id: 'ac', name: 'Air Conditioner', icon: Settings2 },
  { id: 'washing_machine', name: 'Washing Machine', icon: WashingMachine },
  { id: 'refrigerator', name: 'Refrigerator', icon: Refrigerator },
  { id: 'microwave', name: 'Microwave', icon: Microwave },
];

const ISSUES = {
  ac: [{ name: 'AC Service / Repair', price: 299 }, { name: 'AC Installation', price: 1499 }],
  washing_machine: [{ name: 'Machine Repair / Check-up', price: 199 }, { name: 'Installation', price: 399 }],
  refrigerator: [{ name: 'General Check-up', price: 199 }, { name: 'Not Cooling', price: 499 }],
  microwave: [{ name: 'Heating Issue', price: 399 }, { name: 'General Check-up', price: 199 }],
};

export default function LandingPage() {
  const navigate = useNavigate();
  // Booking state
  const [step, setStep] = useState(1);
  const [appliance, setAppliance] = useState('');
  const [issue, setIssue] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-2xl text-blue-600 tracking-tight">
            <Settings2 strokeWidth={3} /> FixItNow
          </div>
          <button onClick={() => navigate('/login')} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Login / Partner</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 md:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
          <span className="inline-block py-1.5 px-3 rounded-full bg-blue-50 text-blue-700 font-bold text-xs tracking-widest uppercase mb-6 border border-blue-100 shadow-sm"><Zap className="inline w-4 h-4 mr-1 -mt-0.5" /> India's #1 Appliance Repair</span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 drop-shadow-sm">
            Expert appliance repair,<br className="hidden md:block" /> at your <span className="text-blue-600 underline decoration-blue-200 underline-offset-4">doorstep.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl font-medium mb-10">
            Certified technicians. Genuine parts. 30-day warranty. Book now and get your appliance running like new in 90 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => { document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }) }} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_8px_30px_rgb(37,99,235,0.3)] transition-all hover:scale-105 active:scale-95">Book a Service</button>
            <button onClick={() => navigate('/login')} className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold text-lg shadow-sm transition-all active:scale-95">Manage Bookings</button>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white border-t border-slate-100" id="services">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">What do you need repaired?</h2>
            <p className="text-slate-500 font-medium">Select a category to view prices and book instantly.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {APPLIANCES.map((app) => (
              <div key={app.id} onClick={() => { setAppliance(app.id); document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }); setTimeout(() => setStep(2), 300); }} 
                className="bg-slate-50 hover:bg-white border border-slate-100 hover:border-blue-500 hover:shadow-xl rounded-3xl p-6 flex flex-col items-center text-center cursor-pointer transition-all hover:-translate-y-1 group">
                <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-blue-50 group-hover:text-blue-600 text-slate-700">
                  <app.icon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-lg text-slate-900">{app.name}</h3>
                <span className="text-blue-600 font-bold text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Select &rarr;</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Flow */}
      <section className="py-20 px-4 bg-slate-50" id="booking">
        <div className="max-w-xl mx-auto relative">
          <div className="bg-white border border-slate-200 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
             {/* Header */}
             <div className="bg-slate-900 px-6 py-6 flex items-center justify-between text-white">
                <div>
                   <h3 className="text-xl font-bold mb-1">Book Service</h3>
                   <p className="text-slate-400 text-sm font-medium">Instant confirmation</p>
                </div>
                {step > 1 && step < 4 && (
                  <button onClick={() => setStep(step - 1)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"><ChevronLeft size={20} /></button>
                )}
             </div>

             {/* Content */}
             <div className="p-6 md:p-8 min-h-[400px]">
                <AnimatePresence mode="wait">
                   <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                      {step === 1 && (
                        <div className="space-y-4">
                           <h4 className="font-bold text-slate-900 text-lg mb-4">1. Select Appliance</h4>
                           {APPLIANCES.map(app => (
                             <button key={app.id} onClick={() => { setAppliance(app.id); setStep(2); }} className="w-full text-left flex items-center gap-4 p-4 border border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-colors">
                               <div className="bg-white p-2 border border-slate-100 shadow-sm rounded-xl text-blue-600"><app.icon size={24} /></div>
                               <span className="font-bold text-slate-700 text-lg">{app.name}</span>
                             </button>
                           ))}
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-4">
                           <h4 className="font-bold text-slate-900 text-lg mb-4">2. What's the issue?</h4>
                           {ISSUES[appliance as keyof typeof ISSUES]?.map(iss => (
                             <button key={iss.name} onClick={() => { setIssue(iss.name); setStep(3); }} className="w-full text-left flex items-center justify-between p-5 border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
                               <span className="font-bold text-slate-700 text-lg group-hover:text-blue-700">{iss.name}</span>
                               <span className="bg-slate-100 group-hover:bg-blue-100 group-hover:text-blue-700 text-slate-700 font-bold px-3 py-1 rounded-lg">₹{iss.price}</span>
                             </button>
                           ))}
                        </div>
                      )}

                      {step === 3 && (
                        <div>
                           <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100">
                              <div><p className="text-slate-500 text-sm font-medium">Selected Service</p><p className="font-bold text-lg text-slate-900">{issue}</p></div>
                              <div className="text-right"><p className="text-slate-500 text-sm font-medium">Price</p><p className="font-extrabold text-2xl text-blue-600">₹{ISSUES[appliance as keyof typeof ISSUES]?.find(i => i.name === issue)?.price}</p></div>
                           </div>
                           <form onSubmit={handleBook} className="space-y-4">
                             <div className="relative">
                               <User className="absolute left-4 top-3.5 text-slate-400" size={20} />
                               <input required value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Your Name" className="w-full border border-slate-200 bg-slate-50 rounded-xl py-3 pl-12 pr-4 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                             </div>
                             <div className="relative">
                               <Phone className="absolute left-4 top-3.5 text-slate-400" size={20} />
                               <input required value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Phone Number" className="w-full border border-slate-200 bg-slate-50 rounded-xl py-3 pl-12 pr-4 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                             </div>
                             <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] transition-all active:scale-95 mt-4">Confirm Booking</button>
                           </form>
                           <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1"><ShieldCheck size={14}/> 100% Secure & Confirmed Slot</p>
                        </div>
                      )}

                      {step === 4 && (
                        <div className="text-center py-8">
                           <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                             <Check size={48} strokeWidth={3} />
                           </div>
                           <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Booking Confirmed!</h2>
                           <p className="text-slate-500 font-medium mb-8">Our technician will call you within 15 minutes.</p>
                           <button onClick={() => { setStep(1); setAppliance(''); setIssue(''); setName(''); setPhone(''); }} className="text-blue-600 font-bold hover:underline">Book Another Service</button>
                        </div>
                      )}
                   </motion.div>
                </AnimatePresence>
             </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white border-y border-slate-100">
         <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left flex flex-col md:flex-row items-center gap-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0"><ShieldCheck size={32} /></div>
              <div><h4 className="font-bold text-lg text-slate-900">Verified Pros</h4><p className="text-slate-500 text-sm font-medium">Background checked experts.</p></div>
            </div>
            <div className="text-center md:text-left flex flex-col md:flex-row items-center gap-4">
              <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center shrink-0"><Star size={32} /></div>
              <div><h4 className="font-bold text-lg text-slate-900">4.8/5 Rating</h4><p className="text-slate-500 text-sm font-medium">From 10,000+ happy customers.</p></div>
            </div>
            <div className="text-center md:text-left flex flex-col md:flex-row items-center gap-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0"><Clock size={32} /></div>
              <div><h4 className="font-bold text-lg text-slate-900">Fast Repair</h4><p className="text-slate-500 text-sm font-medium">Doorstep service in 90 mins.</p></div>
            </div>
         </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Need help right now?</h2>
            <p className="text-slate-400 font-medium mb-10 text-lg">Our support team is available 24/7 to solve your queries.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BE5A] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-[#25D366]/20">
                 <MessageCircle size={24} /> WhatsApp Us
               </button>
               <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 border border-white/10">
                 <Phone size={24} /> +91 800 123 4567
               </button>
            </div>
         </div>
         <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
         <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none"></div>
       </section>
      
      <footer className="bg-slate-950 py-8 text-center border-t border-slate-800">
        <p className="text-slate-500 text-sm font-medium">© 2026 FixItNow Services. All rights reserved.</p>
      </footer>
    </div>
  );
}
