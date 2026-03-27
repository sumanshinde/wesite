import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, ShieldCheck, Star, Clock, Phone, MessageCircle, WashingMachine, Refrigerator, Microwave, ChevronLeft, User, Check, Zap, MapPin, Calendar, Loader2, ArrowRight, Search, Navigation } from 'lucide-react';
import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api' });

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
  const [address, setAddress] = useState('');
  const [slot, setSlot] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !slot) {
      setError('Please fill in all details, including address and timeslot.');
      return;
    }
    setError('');
    setBookingLoading(true);
    try {
      const price = ISSUES[appliance as keyof typeof ISSUES]?.find(i => i.name === issue)?.price || 0;
      await API.post('/bookings/guest', {
        appliance,
        issue,
        customerName: name,
        phone,
        address,
        slot,
        amount: price
      });
      setStep(4);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-800 font-sans relative pb-20 md:pb-0">
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a href="https://wa.me/918001234567" target="_blank" rel="noreferrer" className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all">
          <MessageCircle size={28} />
        </a>
        <a href="tel:8001234567" className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,99,235,0.4)] hover:scale-110 active:scale-95 transition-all">
          <Phone size={24} />
        </a>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-2xl text-blue-600 tracking-tight">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"><Settings2 size={20} strokeWidth={2.5}/></div> FixItNow
          </div>
          <button onClick={() => navigate('/login')} className="font-bold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 hover:bg-slate-100 px-5 py-2.5 rounded-xl border border-slate-200">Sign In</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 md:pt-24 md:pb-32 overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block py-1.5 px-3 rounded-full bg-blue-100 text-blue-800 font-bold text-xs tracking-widest uppercase mb-6 shadow-sm"><Zap className="inline w-4 h-4 mr-1 -mt-0.5" /> Premium Appliance Repair</span>
            <h1 className="text-4xl md:text-6xl lg:text-[64px] font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Expert repairs,<br /> right at your <span className="text-blue-600">doorstep.</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium mb-10 max-w-lg mx-auto md:mx-0">
              Verified professionals, real-time tracking, and 30-day service warranty. Book a trusted technician in just 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <button onClick={() => { document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }) }} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_8px_20px_rgb(37,99,235,0.3)] transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2">
                Book Now <ArrowRight size={20} />
              </button>
              <a href="tel:8001234567" className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2">
                <Phone size={20} /> Call Now
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end w-full">
            <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px]">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[60px]"></div>
              {/* Abstract / illustrative clean representation of a hero graphic */}
              <div className="relative z-10 w-full h-full bg-slate-100 border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center">
                 <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1581092921461-7031f4af8ad8?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center mix-blend-multiply opacity-90"></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                 <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"><Check size={24} strokeWidth={3} /></div>
                    <div><p className="font-bold text-slate-900">AC Repaired</p><p className="text-sm font-medium text-slate-500">Just now in Bangalore</p></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="py-12 bg-white border-y border-slate-100 shadow-sm relative z-20">
         <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="text-center pt-8 sm:pt-0 sm:px-6 flex flex-col items-center">
              <div className="text-4xl font-black text-slate-900 mb-2">4.8<span className="text-blue-600">/5</span></div>
              <div className="flex text-amber-400 mb-2">{[1,2,3,4,5].map(i=><Star key={i} size={16} fill="currentColor" />)}</div>
              <p className="text-slate-500 font-medium text-sm">Average rating from 20k+ reviews</p>
            </div>
            <div className="text-center pt-8 sm:pt-0 sm:px-6 flex flex-col items-center">
              <div className="text-4xl font-black text-slate-900 mb-2">10M<span className="text-blue-600">+</span></div>
              <div className="text-slate-400 mb-2 flex justify-center"><User size={20} /></div>
              <p className="text-slate-500 font-medium text-sm">Happy customers nationwide</p>
            </div>
            <div className="text-center pt-8 sm:pt-0 sm:px-6 flex flex-col items-center">
              <div className="text-4xl font-black text-slate-900 mb-2">90<span className="text-blue-600">min</span></div>
              <div className="text-slate-400 mb-2 flex justify-center"><Clock size={20} /></div>
              <p className="text-slate-500 font-medium text-sm">Fastest technician arrival time</p>
            </div>
         </div>
      </section>

      {/* How it Works */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">How it works</h2>
            <p className="text-slate-500 font-medium text-lg">Your appliance fixed in 3 simple steps.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-4 relative text-center">
             {/* Path line for desktop */}
             <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-0.5 bg-slate-200 -z-10"></div>
             
             {[
               { i: 1, title: 'Choose Service', desc: 'Select appliance and issue type securely.', icon: Search },
               { i: 2, title: 'Pick a Slot', desc: 'Select a convenient time for the visit.', icon: Calendar },
               { i: 3, title: 'Expert Arrives', desc: 'Verified pro fixes it at your doorstep.', icon: ShieldCheck }
             ].map((step) => (
               <div key={step.i} className="flex-1 flex flex-col items-center w-full max-w-[280px]">
                 <div className="w-24 h-24 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-blue-600 mb-6 relative group transition-transform hover:-translate-y-2">
                   <step.icon size={36} strokeWidth={2} />
                   <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">{step.i}</div>
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                 <p className="text-slate-500 font-medium">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Transparent Pricing</h2>
            <p className="text-slate-500 font-medium text-lg">No hidden fees. You know exactly what you pay for.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <div className="flex-1 bg-slate-50 border border-slate-200 rounded-3xl p-8 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0"><Navigation size={32} /></div>
                <div>
                  <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-1">Visiting Charge</h4>
                  <div className="text-3xl font-black text-slate-900">₹99 <span className="text-base text-slate-400 font-medium line-through">₹299</span></div>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Waived off if you book a repair.</p>
                </div>
             </div>
             <div className="flex-1 bg-slate-50 border border-slate-200 rounded-3xl p-8 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0"><Settings2 size={32} /></div>
                <div>
                  <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-1">Service Charge</h4>
                  <div className="text-3xl font-black text-slate-900">₹199<span className="text-base font-bold">+</span></div>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Standard repair fee standard across India.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-slate-50" id="services">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Our Repair Services</h2>
            <p className="text-slate-500 font-medium text-lg">Click on an appliance below to start your booking.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {APPLIANCES.map((app) => (
              <div key={app.id} onClick={() => { setAppliance(app.id); document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }); setTimeout(() => setStep(2), 300); }} 
                className="bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 rounded-3xl p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300 group">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-50 group-hover:text-blue-600 text-slate-700 relative overflow-hidden">
                  <app.icon size={44} strokeWidth={1.5} className="relative z-10" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{app.name}</h3>
                <span className="text-blue-600 font-bold text-sm bg-blue-50 px-4 py-1.5 rounded-full opacity-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">Select</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Flow */}
      <section className="py-20 md:py-32 px-4 bg-white" id="booking">
        <div className="max-w-2xl mx-auto relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Book your visit now</h2>
            <p className="text-slate-500 font-medium text-lg">Secure your slot in less than a minute.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden relative z-10">
             {/* Header */}
             <div className="bg-slate-900 px-6 md:px-8 py-6 flex items-center justify-between text-white border-b border-slate-800">
                <div>
                   <h3 className="text-2xl font-bold mb-1">Instant Booking</h3>
                   <p className="text-slate-400 font-medium">Step {step > 4 ? 4 : step} of 4</p>
                </div>
                {step > 1 && step < 4 && (
                  <button onClick={() => setStep(step - 1)} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl font-bold transition-colors flex items-center gap-2"><ChevronLeft size={18} /> Back</button>
                )}
             </div>

             {/* Content */}
             <div className="p-6 md:p-10 min-h-[450px]">
                <AnimatePresence mode="wait">
                   <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                      {step === 1 && (
                        <div className="space-y-4">
                           <h4 className="font-bold text-slate-900 text-xl mb-6 flex items-center gap-2"><Settings2 className="text-blue-600"/> Select Appliance</h4>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             {APPLIANCES.map(app => (
                               <button key={app.id} onClick={() => { setAppliance(app.id); setStep(2); }} className="w-full text-left flex items-center gap-4 p-5 border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-md hover:bg-blue-50/50 transition-all text-lg font-bold text-slate-700 bg-slate-50/50">
                                 <div className="bg-white p-2.5 shadow-sm rounded-xl text-blue-600 shrink-0"><app.icon size={26} /></div>
                                 <span className="truncate">{app.name}</span>
                               </button>
                             ))}
                           </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-4">
                           <h4 className="font-bold text-slate-900 text-xl mb-6">What seems to be the issue?</h4>
                           {ISSUES[appliance as keyof typeof ISSUES]?.map(iss => (
                             <button key={iss.name} onClick={() => { setIssue(iss.name); setStep(3); }} className="w-full text-left flex items-center justify-between p-6 bg-slate-50 border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
                               <div>
                                 <p className="font-bold text-slate-800 text-lg group-hover:text-blue-700">{iss.name}</p>
                                 <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-1"><Check size={14}/> Verified parts & service</p>
                               </div>
                               <span className="bg-white group-hover:bg-blue-100 group-hover:text-blue-700 text-slate-700 font-extrabold text-lg px-4 py-2 border border-slate-200 group-hover:border-blue-200 rounded-xl shadow-sm">₹{iss.price}</span>
                             </button>
                           ))}
                        </div>
                      )}

                      {step === 3 && (
                        <div>
                           <div className="flex bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-200">
                              <div className="flex-1 border-r border-slate-200 pr-4">
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Service</p>
                                <p className="font-bold text-slate-900">{issue}</p>
                              </div>
                              <div className="flex-1 text-right pl-4">
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Price</p>
                                <p className="font-extrabold text-xl text-blue-600">₹{ISSUES[appliance as keyof typeof ISSUES]?.find(i => i.name === issue)?.price}</p>
                              </div>
                           </div>
                           <h4 className="font-bold text-slate-900 text-xl mb-6">Enter Details</h4>
                           <form onSubmit={handleBook} className="space-y-5">
                             {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold text-center border border-red-100">{error}</div>}
                             
                             <div>
                               <p className="text-sm font-bold text-slate-800 mb-2">Preferred Timeslot</p>
                               <div className="grid grid-cols-2 gap-3 mb-2">
                                 {['Today: 10AM - 12PM', 'Today: 12PM - 2PM'].map(t => <button type="button" key={t} onClick={() => setSlot(t)} className={`flex items-center justify-center p-4 rounded-xl text-sm font-bold border transition-all ${slot === t ? 'border-blue-600 bg-blue-600 text-white shadow-md' : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-300'}`}><Calendar size={16} className="mr-2" /> {t}</button>)}
                               </div>
                             </div>

                             <div className="relative">
                               <User className="absolute left-4 top-4 text-slate-400" size={20} />
                               <input required value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Full Name" className="w-full border border-slate-200 bg-slate-50 rounded-xl py-4 pl-12 pr-4 font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900" />
                             </div>
                             <div className="relative">
                               <Phone className="absolute left-4 top-4 text-slate-400" size={20} />
                               <input required value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Phone Number" className="w-full border border-slate-200 bg-slate-50 rounded-xl py-4 pl-12 pr-4 font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900" />
                             </div>
                             <div className="relative">
                               <MapPin className="absolute left-4 top-4 text-slate-400" size={20} />
                               <input required value={address} onChange={e => setAddress(e.target.value)} type="text" placeholder="Complete Address (House No, Building, Area)" className="w-full border border-slate-200 bg-slate-50 rounded-xl py-4 pl-12 pr-4 font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900" />
                             </div>
                             
                             <button type="submit" disabled={bookingLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-lg py-5 flex justify-center items-center gap-2 rounded-xl shadow-[0_8px_20px_0_rgb(37,99,235,0.3)] transition-all active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed mt-6">
                               {bookingLoading ? <Loader2 size={24} className="animate-spin" /> : 'Confirm Booking'}
                             </button>
                           </form>
                           <p className="text-center text-xs font-bold text-slate-400 mt-6 flex items-center justify-center gap-1 uppercase tracking-widest"><ShieldCheck size={14}/> 100% secure • Pay after service</p>
                        </div>
                      )}

                      {step === 4 && (
                        <div className="text-center py-12">
                           <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                             <div className="absolute inset-0 border-4 border-emerald-200 rounded-full animate-ping opacity-20"></div>
                             <Check size={48} strokeWidth={4} />
                           </div>
                           <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Booking Confirmed!</h2>
                           <p className="text-slate-500 font-medium text-lg mb-8 max-w-sm mx-auto">Your technician request has been received. You will receive an SMS confirmation shortly.</p>
                           <button onClick={() => { setStep(1); setAppliance(''); setIssue(''); setName(''); setPhone(''); setAddress(''); setSlot(''); }} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-8 py-4 rounded-xl transition-colors">Book Another Service</button>
                        </div>
                      )}
                   </motion.div>
                </AnimatePresence>
             </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-blue-400/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        </div>
      </section>

      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 font-black text-2xl text-white tracking-tight opacity-50 mb-4">
            <Settings2 strokeWidth={3} /> FixItNow
          </div>
          <p className="text-slate-500 text-sm font-medium">© 2026 FixItNow Services. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
