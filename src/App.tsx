import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Home, Compass, MapPin, CreditCard, Box, Settings, ShieldAlert, CheckCircle2, Menu, X, WashingMachine, Settings2, Refrigerator, Microwave, ChevronLeft, Calendar, User, Phone, Mail, Lock, AlertCircle, ShieldCheck, Search, MoreVertical, Check, Loader2, QrCode, Smartphone, Star, Zap, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import LandingPage from './LandingPage';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  withCredentials: true
});

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- REUSABLE COMPONENTS ---
const Title = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h2 className={cn("text-2xl md:text-3xl font-bold text-slate-900 tracking-tight", className)}>{children}</h2>
);
const Subtitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <p className={cn("text-slate-500 font-medium", className)}>{children}</p>
);

const Button = React.forwardRef<HTMLButtonElement, any>(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
  const baseStyled = "inline-flex items-center justify-center rounded-xl font-semibold transition-all active:scale-[0.98] outline-none focus:ring-4 focus:ring-blue-500/20";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_14px_0_rgb(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgb(37,99,235,0.23)]",
    secondary: "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm",
    ghost: "hover:bg-slate-100 text-slate-600",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-sm"
  };
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2.5 text-sm", lg: "px-6 py-3.5 text-base" };
  return <button ref={ref as any} className={cn(baseStyled, variants[variant as keyof typeof variants], sizes[size as keyof typeof sizes], className)} {...props} />;
});

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("bg-white border border-slate-100/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow", className)}>{children}</div>
);

const Input = ({ className, icon, ...props }: any) => (
  <div className="relative group flex items-center">
    {icon && <div className="absolute left-3 text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">{icon}</div>}
    <input className={cn("w-full bg-slate-50/50 border border-slate-200 text-slate-900 font-medium text-sm rounded-xl py-3 placeholder:font-normal focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all", icon ? "pl-10 pr-4" : "px-4", className)} {...props} />
  </div>
);

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default'|'success'|'warning'|'danger' }) => {
  const v = { default: "bg-blue-50 text-blue-700", success: "bg-emerald-50 text-emerald-700", warning: "bg-amber-50 text-amber-700", danger: "bg-red-50 text-red-700" };
  return <span className={cn("px-2.5 py-0.5 rounded-full font-bold text-xs shrink-0 tracking-wide uppercase", v[variant])}>{children}</span>;
}

const StatCard = ({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend?: string }) => (
  <Card className="p-6 flex flex-col gap-4 group cursor-default shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all bg-white border-0 ring-1 ring-slate-100">
    <div className="flex justify-between items-start">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform group-hover:bg-blue-600 group-hover:text-white shadow-sm ring-1 ring-blue-100/50">{icon}</div>
      {trend && <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-black ring-1 ring-emerald-100 uppercase tracking-widest leading-none"><Check size={14} strokeWidth={3}/> {trend}</div>}
    </div>
    <div>
      <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
    </div>
  </Card>
);

// --- PAGES ---
const AuthPage = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const res = await API.post('/auth/login', { email: formData.email, password: formData.password });
        onLogin(res.data.user);
      } else {
        await API.post('/auth/register', formData);
        setIsLogin(true);
        setError('Account created! Please sign in.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center gap-2 font-black text-2xl text-blue-600 tracking-tight justify-center mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <CheckCircle2 size={24} strokeWidth={3}/>
          </div>
          FixItNow
        </div>

        <Card className="p-8 shadow-xl border-t-4 border-t-blue-600">
          <Title className="mb-2 text-center text-3xl">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Title>
          <Subtitle className="mb-8 text-center">
            {isLogin ? 'Sign in to manage your bookings' : 'Join us for seamless appliance repairs'}
          </Subtitle>
          
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-sm font-medium">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-slate-800 mb-1.5 block">Full Name</label>
                  <Input 
                    placeholder="John Doe" 
                    icon={<User size={20} />} 
                    value={formData.name}
                    onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-800 mb-1.5 block">Phone Number</label>
                  <Input 
                    placeholder="10 digit number" 
                    type="tel"
                    icon={<Phone size={20} />} 
                    value={formData.phone}
                    onChange={(e: any) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </motion.div>
            )}
            
            <div>
              <label className="text-sm font-bold text-slate-800 mb-1.5 block">Email Address</label>
              <Input 
                type="email" 
                placeholder="m@example.com" 
                icon={<Mail size={20} />} 
                value={formData.email}
                onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-bold text-slate-800">Password</label>
                {isLogin && <button type="button" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Forgot password?</button>}
              </div>
              <Input 
                type="password" 
                placeholder="••••••••" 
                icon={<Lock size={20} />} 
                value={formData.password}
                onChange={(e: any) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full py-3.5 mt-2 shadow-[0_4px_20px_0_rgb(37,99,235,0.25)] flex items-center gap-2">
              {loading && <Loader2 className="animate-spin" size={18} />}
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm font-medium">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="text-blue-600 font-bold hover:underline"
              >
                {isLogin ? 'Register Now' : 'Sign In'}
              </button>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

const DashboardPage = ({ user, navigate }: { user: any; navigate: (p: string) => void }) => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await API.get('/bookings/me');
        setBookings(res.data.bookings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBookings();
  }, []);

  const totalSpend = bookings.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="p-4 md:p-8 flex-1 w-full">
      <Title className="mb-2">Welcome back, {user?.name || 'User'} 👋</Title>
      <Subtitle className="mb-8">Here's what's happening with your bookings today.</Subtitle>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Bookings" value={bookings.length.toString()} icon={<Calendar />} />
        <StatCard title="Total Spend" value={`₹${totalSpend}`} icon={<CreditCard />} />
        <StatCard title="Active Services" value={bookings.filter(b => b.status !== 'Completed').length.toString()} icon={<CheckCircle2 />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Title className="text-xl mb-4">My Bookings</Title>
          <Card className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[500px]">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-xs">
                <tr><th className="px-6 py-4">Service</th><th className="px-6 py-4">Date/Slot</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Amount</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400">Loading your history...</td></tr>
                ) : bookings.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400">No bookings yet. <button onClick={() => navigate('services')} className="text-blue-600 font-bold hover:underline">Book your first service!</button></td></tr>
                ) : (
                  bookings.map((row) => (
                    <tr key={row._id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">{row.issue}</td>
                      <td className="px-6 py-4 text-slate-600">{row.slot}</td>
                      <td className="px-6 py-4"><Badge variant={row.status === 'Completed' ? 'success' : 'warning'}>{row.status}</Badge></td>
                      <td className="px-6 py-4 text-right font-bold text-blue-600">₹{row.amount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Card>
        </div>
        <div>
          <Title className="text-xl mb-4 font-black flex items-center gap-2 tracking-tight"><ShieldCheck className="text-blue-600" size={24}/> Trust & Support</Title>
          <Card className="flex flex-col gap-1 p-2 bg-white/50 backdrop-blur-sm border-slate-100 shadow-sm">
            {[
              {icon: <Star className="text-amber-500 fill-amber-500"/>, title: "4.8/5 Rated Expert", desc: "Based on 5000+ happy customers."},
              {icon: <Zap className="text-blue-500 fill-blue-50"/>, title: "Same Day Repair", desc: "Available for all bookings before 2 PM."},
              {icon: <CheckCircle2 className="text-emerald-500"/>, title: "Genuine Parts", desc: "Standard 30-day warranty included."},
              {icon: <Phone className="text-slate-500"/>, title: "24/7 Support", desc: "+91 800 123 4567"},
            ].map((n, i) => (
              <div key={i} className="flex gap-4 p-4 hover:bg-white rounded-2xl cursor-default transition-all hover:shadow-sm border border-transparent hover:border-slate-100 group">
                <div className="mt-0.5 bg-white shadow-sm p-2 rounded-xl h-fit border border-slate-100 group-hover:scale-110 transition-transform">{n.icon}</div>
                <div><p className="font-extrabold text-slate-900 text-sm">{n.title}</p><p className="text-slate-400 text-xs mt-0.5 font-medium">{n.desc}</p></div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

// --- SERVICES BOOKING FLOW ---
const APPLIANCES = [
  { id: 'washing_machine', name: 'Washing Machine', icon: WashingMachine, color: 'from-blue-100 to-blue-50', textConfig: 'text-blue-600' },
  { id: 'refrigerator', name: 'Refrigerator', icon: Refrigerator, color: 'from-blue-100 to-blue-50', textConfig: 'text-blue-600' },
  { id: 'microwave', name: 'Microwave', icon: Microwave, color: 'from-blue-100 to-blue-50', textConfig: 'text-blue-600' },
  { id: 'ac', name: 'Air Conditioner', icon: Settings2, color: 'from-blue-100 to-blue-50', textConfig: 'text-blue-600' },
];
const ISSUES = {
  washing_machine: [
    { name: 'Automatic Top Load Machine Check-up', price: 199, isCheckup: true, desc: 'On-site check. Visitation fee adjusted in final quote.' },
    { name: 'Automatic Front Load Machine - Check-up', price: 199, isCheckup: true, desc: 'Inspection for front load models. Fee adjusted on repair.' },
    { name: 'Semi-Automatic Machine - Check-up', price: 199, isCheckup: true, desc: 'Detailed issue estimate for semi-automatic models.' },
    { name: 'Washing Machine Installation', price: 399, isCheckup: false, desc: 'Unboxing, placement, leveling, and full pipe connections.' },
    { name: 'Washing Machine Uninstallation', price: 399, isCheckup: false, desc: 'Safe disconnection and removal of all pipe/power lines.' },
  ],
  refrigerator: [
    { name: 'General Check-up', price: 199, isCheckup: true, desc: 'Full diagnostic check.' },
    { name: 'Not Cooling/Gas Filling', price: 499, isCheckup: false, desc: 'Coolant refill and leak fixes.' },
  ],
  microwave: [
    { name: 'General Check-up', price: 199, isCheckup: true, desc: 'Diagnostics.' },
    { name: 'Heating Issue', price: 399, isCheckup: false, desc: 'Magnetron inspection/fix.' },
  ],
  ac: [
    { name: 'General Check-up', price: 299, isCheckup: true, desc: 'Performance test & filter check.' },
    { name: 'AC Installation', price: 1499, isCheckup: false, desc: 'Standard window/split installation.' },
  ],
};

const ServicesBookingPage = ({ navigate }: { navigate: (p: string) => void }) => {
  const [step, setStep] = useState(1);
  const [appliance, setAppliance] = useState('');
  const [issue, setIssue] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [slot, setSlot] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  
  const handleBookNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !slot) return;
    setBookingLoading(true);
    try {
      const price = ISSUES[appliance as keyof typeof ISSUES]?.find(i => i.name === issue)?.price || 0;
      await API.post('/bookings', {
        appliance,
        issue,
        customerName: name,
        phone,
        address,
        slot,
        amount: price
      });
      setStep(4); // Success step
    } catch (err) {
      console.error(err);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center py-6 px-4 max-w-2xl mx-auto">
      <div className="w-full flex items-center justify-between mb-8 px-2">
         <div className="flex items-center gap-2 text-blue-600 font-bold text-xl tracking-tight">
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center"><CheckCircle2 size={20} /></span> FixItNow Booking
         </div>
         {step > 1 && step < 4 && (
           <button onClick={() => setStep(step - 1)} className="text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-100 px-3 py-1.5 rounded-full shadow-sm border border-slate-100 transition-all flex items-center gap-1 text-sm font-medium">
             <ChevronLeft size={16} /> Back
           </button>
         )}
      </div>

       <div className="w-full bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] border border-slate-100 p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-10 group-hover:w-40 transition-all"></div>
        <AnimatePresence mode="wait">
          <motion.div key={`step-${step}`} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ type: 'tween', duration: 0.3 }}>
            {step === 4 ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} strokeWidth={3} />
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Booking Saved!⚡</h1>
                <p className="text-slate-500 font-medium mb-8">Our technician will reach out to you shortly.</p>
                <div className="bg-slate-50 rounded-2xl p-6 text-left mb-8 border border-slate-100">
                  <div className="flex justify-between mb-2 pb-2 border-b border-slate-200/50"><span className="text-slate-500 font-bold text-xs uppercase tracking-widest">Service</span><span className="font-bold text-slate-900">{issue}</span></div>
                  <div className="flex justify-between mb-2"><span className="text-slate-500 font-bold text-xs uppercase tracking-widest">Date/Time</span><span className="font-bold text-slate-900">{slot}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 font-bold text-xs uppercase tracking-widest">Address</span><span className="font-bold text-slate-900 truncate max-w-[150px]">{address}</span></div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => navigate('dashboard')} variant="secondary" className="flex-1 py-4">View All</Button>
                  <Button onClick={() => { setStep(1); setAppliance(''); setIssue(''); setSlot(''); }} className="flex-1 py-4">Book Another</Button>
                </div>
              </div>
            ) : (
              /* existing steps... */
              step === 1 ? (
                <div>
                  <div className="text-center mb-10 mt-2">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Fix Anything, Anytime ⚡</h1>
                    <p className="text-lg text-slate-500 font-medium">Book trusted technicians in seconds.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {APPLIANCES.map((item) => {
                      const Icon = item.icon;
                      const isSelected = appliance === item.id;
                      return (
                        <button key={item.id} onClick={() => { setAppliance(item.id); setTimeout(() => setStep(2), 150); }} className={cn("group relative flex items-center sm:flex-col sm:items-start p-5 rounded-2xl border bg-white transition-all text-left", isSelected ? 'border-blue-500 shadow-md ring-1 ring-blue-500' : 'border-slate-100 hover:shadow-md hover:border-blue-200')}>
                          <div className={cn("w-14 h-14 rounded-full bg-gradient-to-br flex items-center justify-center mb-0 sm:mb-4 mr-4 sm:mr-0 shrink-0 group-hover:scale-110 transition-transform", item.color)}><Icon size={26} className={item.textConfig} strokeWidth={2} /></div>
                          <span className="font-semibold text-slate-800 text-base md:text-lg">{item.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : step === 2 ? (
                <div className="pt-2">
                  <div className="mb-8"><h1 className="text-3xl font-extrabold text-slate-900 mb-2">{APPLIANCES.find(a => a.id === appliance)?.name}</h1><p className="text-slate-500 font-medium">Select the service you need.</p></div>
                  <div className="flex flex-col gap-4">
                    {ISSUES[appliance as keyof typeof ISSUES]?.map((iss) => (
                      <button key={iss.name} onClick={() => { setIssue(iss.name); setTimeout(() => setStep(3), 150); }} className="text-left p-6 bg-white border border-slate-100 rounded-2xl hover:border-blue-500 hover:shadow-[0_8px_30px_rgb(37,99,235,0.12)] transition-all flex flex-col sm:flex-row sm:items-center justify-between group">
                        <div className="mr-0 sm:mr-6 mb-4 sm:mb-0">
                          <p className="font-extrabold text-slate-800 text-lg mb-1">{iss.name}</p>
                          <ul className="text-sm text-slate-500 space-y-1">
                            <li className="flex items-start gap-1.5 opacity-90">
                              <Check size={14} className="text-blue-500 mt-0.5 shrink-0" /> {iss.desc}
                            </li>
                          </ul>
                        </div>
                        <span className="font-bold text-blue-700 bg-blue-50 px-4 py-2 rounded-xl text-[15px] group-hover:bg-blue-600 group-hover:text-white transition-colors self-start sm:self-center shrink-0 border border-blue-100 group-hover:border-blue-600 shadow-sm">
                          ₹{iss.price}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="pt-2">
                  <div className="mb-8"><h1 className="text-3xl font-extrabold text-slate-900 mb-2">Final Step</h1><p className="text-slate-500 font-medium">{issue}</p></div>
                  <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-6 mb-8 border border-blue-100 shadow-inner">
                     <div className="flex justify-between font-extrabold text-slate-900 text-xl items-center"><span>Estimated Total</span><span className="text-blue-600">₹{ISSUES[appliance as keyof typeof ISSUES]?.find(i => i.name === issue)?.price || 0}</span></div>
                  </div>
                  <form className="flex flex-col gap-4 mb-8">
                    <div className="grid grid-cols-2 gap-3 mb-2">
                      {['10:00 AM - 12:00 PM', '12:00 PM - 02:00 PM'].map(t => <button type="button" key={t} onClick={() => setSlot(t)} className={cn("flex items-center justify-center p-3 rounded-xl text-xs font-bold border transition-all", slot === t ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-600')}><Calendar size={14} className="mr-1.5" /> {t}</button>)}
                    </div>
                    <Input placeholder="Full Name" icon={<User size={20} />} value={name} onChange={(e:any) => setName(e.target.value)} />
                    <Input placeholder="Phone (10 digits)" type="tel" icon={<Phone size={20} />} value={phone} onChange={(e:any) => setPhone(e.target.value)} />
                    <Input placeholder="Complete Address" icon={<MapPin size={20} />} value={address} onChange={(e:any) => setAddress(e.target.value)} />
                  </form>
                  <button onClick={handleBookNow} disabled={bookingLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-[0_8px_20px_rgb(37,99,235,0.25)] hover:shadow-[0_8px_25px_rgb(37,99,235,0.35)] transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                     {bookingLoading && <Loader2 className="animate-spin" size={20} />}
                     Book Now - ₹{ISSUES[appliance as keyof typeof ISSUES]?.find(i => i.name === issue)?.price || 0}
                  </button>
                </div>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const LocationPickerPage = () => (
  <div className="p-4 md:p-8 flex-1 w-full max-w-4xl mx-auto">
    <Title className="mb-2">Pick your location</Title>
    <Subtitle className="mb-6">This helps us assign the best technician near you.</Subtitle>
    
    <Card className="overflow-hidden p-2 relative shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
      {/* Mock Map View */}
      <div className="h-[400px] w-full bg-slate-100 rounded-xl relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-300 via-slate-200 to-slate-100 mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle at center, #94a3b8 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        
        {/* Fake Google Map Marker */}
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="relative z-10 drop-shadow-xl"
        >
           <MapPin size={48} className="text-red-500 fill-red-50" />
           <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/20 rounded-full blur-sm"></div>
        </motion.div>

        {/* Search Overlay */}
        <div className="absolute top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md">
          <div className="relative shadow-lg rounded-xl">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input type="text" placeholder="Search for your building, area or street..." className="w-full bg-white border-0 text-slate-900 font-medium text-sm rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-blue-500/20" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-lg mb-1">Confirm Address</h3>
        <p className="text-slate-500 text-sm mb-4">123 Tech Park, Block C, Bangalore 560001</p>
        <div className="flex gap-4">
          <Input placeholder="House / Flat / Block No." className="flex-1" />
          <Button className="shrink-0 px-8">Save Location</Button>
        </div>
      </div>
    </Card>
  </div>
);

const PaymentPage = ({ navigate }: { navigate: (p: string) => void }) => {
  const routerLocation = useLocation();
  const planInfo = routerLocation.state?.plan;

  const [method, setMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);

  const isSub = !!planInfo;
  const subTotal = isSub ? 18672 : 1499; // Mock calculation based on UI screenshot
  const tax = isSub ? 3361 : 269;
  const finalTotal = isSub ? 22033 : 1768;

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      navigate('dashboard');
    }, 2000);
  };

  return (
  <div className="p-4 md:p-8 flex-1 w-full max-w-3xl mx-auto">
    <Title className="mb-2">Checkout</Title>
    <Subtitle className="mb-8">Complete your payment securely.</Subtitle>
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-[1.5]">
        <Title className="text-xl mb-4">Order Summary</Title>
        <Card className="overflow-hidden">
          {isSub ? (
            <div className="divide-y divide-slate-100">
              <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium flex-wrap">
                  <span className="font-bold text-slate-900 uppercase tracking-wide">{planInfo.t} PLAN</span> 
                  <span className="text-slate-300">|</span> 
                  <select className="bg-white border text-xs border-slate-200 rounded px-2 py-1 outline-none focus:border-blue-500 font-semibold"><option>48 Months</option><option>24 Months</option></select>
                  <span className="text-slate-300 hidden md:inline">|</span> 
                  <span className="hidden md:inline">Validity - till 25 Mar 2030</span> 
                  <span className="text-slate-300 hidden xl:inline">|</span> 
                  <span className="hidden xl:inline text-blue-600 font-bold bg-blue-50 px-2 rounded">20000 Coins</span>
                </div>
                <div className="text-sm font-medium text-slate-500 flex items-center gap-2">
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs font-bold shrink-0">Discount 74%</span> | <span className="font-bold text-slate-900">₹ 389/mo</span>
                </div>
              </div>
              
              <div className="p-5 flex justify-between items-center text-sm">
                <div className="font-medium text-slate-600">Have a Promo Code? <button className="text-orange-500 hover:underline">Click here</button></div>
                <div className="font-bold text-emerald-600">- ₹ 0</div>
              </div>

              <div className="p-5 flex justify-between items-center bg-slate-50/50">
                <span className="text-sm font-bold text-slate-600">Sub-Total ( 389/mo x 48 ) :</span>
                <span className="font-bold text-slate-900">₹{subTotal}</span>
              </div>

              <div className="p-5 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-600">Tax @ 18%</span>
                <span className="font-bold text-slate-900">₹{tax}</span>
              </div>

              <div className="p-5 bg-slate-100/50 flex justify-between items-center border-t-2 border-slate-200">
                <span className="text-lg font-bold text-slate-800">Total:</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-medium line-through text-lg">₹ 82071</span>
                  <span className="text-2xl font-black text-slate-900">₹ {finalTotal}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex justify-between font-bold text-slate-800 mb-4 pb-4 border-b border-slate-100"><span>Service Booking</span><span>₹1499</span></div>
              <div className="flex justify-between text-sm text-slate-500 mb-4"><span>Sub-Total</span><span>₹1499</span></div>
              <div className="flex justify-between text-sm text-slate-500 mb-4 pb-4 border-b border-slate-100"><span>Taxes @ 18%</span><span>₹269</span></div>
              <div className="flex justify-between text-xl font-extrabold text-slate-900 pt-2"><span className="text-slate-800">Total</span><span className="text-blue-600">₹1768</span></div>
            </div>
          )}
        </Card>
      </div>
      <div className="flex-1">
        <Title className="text-xl mb-4">Payment Method</Title>
        <Card className="p-6">
           <div className="space-y-4 mb-8">
             <div onClick={() => setMethod('card')} className={cn("flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all border-2", method === 'card' ? "border-blue-500 bg-blue-50" : "border-slate-100 hover:border-blue-200")}>
               <CreditCard className={method === 'card' ? "text-blue-600" : "text-slate-400"} />
               <span className={cn("font-bold flex-1", method === 'card' ? "text-blue-900" : "text-slate-600")}>Credit / Debit Card</span>
               <div className={cn("w-5 h-5 rounded-full border-4", method === 'card' ? "border-blue-600" : "border-slate-200")}></div>
             </div>
             <div onClick={() => setMethod('upi')} className={cn("flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all border-2", method === 'upi' ? "border-blue-500 bg-blue-50" : "border-slate-100 hover:border-blue-200")}>
               <div className="w-6 h-6 bg-slate-200 rounded shrink-0 flex items-center justify-center font-bold text-[10px] text-slate-600">UPI</div>
               <span className={cn("font-bold flex-1", method === 'upi' ? "text-blue-900" : "text-slate-600")}>UPI (GPay, PhonePe)</span>
               <div className={cn("w-5 h-5 rounded-full border-4", method === 'upi' ? "border-blue-600" : "border-slate-200")}></div>
             </div>
           </div>

           <AnimatePresence mode="wait">
             {method === 'upi' && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 exit={{ opacity: 0, height: 0 }}
                 className="overflow-hidden mb-8"
               >
                 <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
                   <p className="text-sm font-bold text-slate-800 mb-4">Scan with any UPI App</p>
                   <div className="bg-white p-4 rounded-xl shadow-sm inline-block border border-slate-100 mb-4 relative group cursor-pointer overflow-hidden">
                     {/* Simulated QR Code Pattern */}
                     <div className="grid grid-cols-4 gap-1 w-32 h-32 relative z-10">
                       <div className="col-span-1 bg-slate-800 rounded-tl-sm w-full h-full"></div>
                       <div className="col-span-2 bg-transparent w-full h-full border-4 border-slate-800"></div>
                       <div className="col-span-1 bg-slate-800 rounded-tr-sm w-full h-full"></div>
                       <div className="col-span-2 bg-transparent w-full h-full border-4 border-slate-800"></div>
                       <div className="col-span-2 bg-slate-800 w-full h-full rounded-sm"></div>
                       <div className="col-span-1 bg-slate-800 w-full h-full rounded-sm"></div>
                       <div className="col-span-3 bg-slate-800 w-full h-full rounded-b-sm"></div>
                     </div>
                     <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px] z-20">
                       <QrCode className="text-blue-600 w-10 h-10" />
                     </div>
                     <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 animate-[scan_2s_ease-in-out_infinite] z-30 shadow-[0_0_8px_2px_rgba(59,130,246,0.5)]"></div>
                   </div>
                   <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                     <span className="flex items-center gap-1"><Smartphone size={14}/> GPay</span>
                     <span className="flex items-center gap-1"><Smartphone size={14}/> PhonePe</span>
                     <span className="flex items-center gap-1"><Smartphone size={14}/> Paytm</span>
                   </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>

           <Button disabled={processing} className="w-full text-lg py-4 relative shadow-[0_8px_30px_0_rgb(37,99,235,0.3)] disabled:opacity-75 disabled:cursor-not-allowed" onClick={handlePayment}>
             {processing ? (
               <div className="flex items-center gap-2">
                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing Payment...
               </div>
             ) : (
               <>Pay ₹{finalTotal} securely <Lock size={16} className="absolute right-4 opacity-50" /></>
             )}
           </Button>
           <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1"><ShieldCheck size={14}/> Secured by Razorpay</p>
        </Card>
      </div>
    </div>
  </div>
);
};

const SubscriptionPage = ({ navigate }: { navigate: (p: string, o?: any) => void }) => {
  const [activePlan] = useState('Pro Plus');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleUpgrade = (plan: any) => {
    setLoadingPlan(plan.t);
    // Simulate API call for upgrading plan before taking them to payment
    setTimeout(() => {
      setLoadingPlan(null);
      navigate('payment', { state: { plan } });
    }, 1200);
  };

  return (
    <div className="p-4 md:p-8 flex-1 w-full max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <Title className="text-3xl lg:text-4xl mb-3">Simple, transparent pricing</Title>
        <Subtitle>No hidden fees. Cancel anytime.</Subtitle>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { t: 'Basic', p: '₹0', d: 'Pay as you go', features: ['1 Service per month', 'Standard Support', 'Next-day slots'], popular: false },
          { t: 'Pro Plus', p: '₹499', d: 'Billed monthly', features: ['Unlimited Services', 'Priority Support', 'Same-day slots', 'Zero visiting charges'], popular: true },
          { t: 'Premium', p: '₹1499', d: 'Billed quarterly', features: ['Everything in Pro', 'Dedicated Account Manager', 'Free spare parts up to ₹1000', '1-hour guaranteed SLA'], popular: false }
        ].map((plan, i) => {
          const isActive = activePlan === plan.t;
          const isLoading = loadingPlan === plan.t;

          return (
            <Card key={i} className={cn("p-8 relative flex flex-col transition-all duration-300", 
              isActive ? "border-2 border-emerald-500 shadow-xl shadow-emerald-100 transform md:-translate-y-2" : 
              plan.popular ? "border-2 border-blue-600 shadow-lg shadow-blue-50" : "hover:border-blue-300"
            )}>
              {isActive && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-sm flex items-center gap-1">
                  <Check size={12} /> ALREADY ACTIVE
                </span>
              )}
              {!isActive && plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-sm">
                  Most Popular
                </span>
              )}
              
              <h3 className="text-lg font-bold text-slate-800 mb-1">{plan.t}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-extrabold text-slate-900">{plan.p}</span>
                <span className="text-slate-500 font-medium">/mo</span>
              </div>
              <p className="text-sm text-slate-500 mb-8">{plan.d}</p>
              
              <ul className="space-y-4 flex-1 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex gap-3 text-sm font-medium text-slate-700 items-start">
                    <Check size={18} className="text-blue-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={isActive ? 'secondary' : 'primary'} 
                className={cn("w-full py-3 transition-all", isActive ? "opacity-75 cursor-default bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200" : "")}
                disabled={isActive || !!loadingPlan}
                onClick={() => !isActive && handleUpgrade(plan)}
              >
                {isLoading ? (
                   <span className="flex items-center gap-2">
                     <Loader2 size={18} className="animate-spin" /> Verifying...
                   </span>
                ) : isActive ? (
                  <span className="flex items-center gap-2 justify-center">
                    <CheckCircle2 size={16} /> Current Plan
                  </span>
                ) : (
                  'Select Plan & Upgrade'
                )}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const SettingsPage = ({ user }: { user: any }) => {
  const nameParts = user?.name ? user.name.split(' ') : ['Guest', ''];
  const first = nameParts[0];
  const last = nameParts.slice(1).join(' ');
  const initials = (first?.[0] || 'U') + (last?.[0] || '');

  const [saving, setSaving] = useState(false);
  const [firstName, setFirstName] = useState(first);
  const [lastName, setLastName] = useState(last);
  const [email, setEmail] = useState(user?.email || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1200);
  };

  return (
    <div className="p-4 md:p-8 flex-1 w-full max-w-3xl mx-auto">
      <Title className="mb-2">Settings</Title>
      <Subtitle className="mb-8">Manage your account settings and preferences.</Subtitle>

      <div className="flex flex-col gap-6">
        <Card className="p-6 relative overflow-hidden">
          <AnimatePresence>
            {saved && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-0 left-0 right-0 py-2 bg-emerald-500 text-white text-sm font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={16} /> Profile safely updated!
              </motion.div>
            )}
          </AnimatePresence>
          
          <Title className={cn("text-xl mb-4", saved && "mt-6 transition-all")}>Profile Information</Title>
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg uppercase tracking-wider">{initials}</div>
            <div>
              <Button variant="secondary" size="sm" className="mb-2">Change Avatar</Button>
              <p className="text-xs text-slate-500">JPG, GIF or PNG. 1MB max.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-slate-800 mb-1.5 block">First Name</label>
              <Input value={firstName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-800 mb-1.5 block">Last Name</label>
              <Input value={lastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-bold text-slate-800 mb-1.5 block">Email Address</label>
              <Input value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} disabled className="bg-slate-50 text-slate-500" />
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1"><ShieldCheck size={12}/> Email is verified and connected to your identity.</p>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button disabled={saving} onClick={handleSave} className="w-full sm:w-auto">
               {saving ? <div className="flex gap-2 items-center"><Loader2 size={16} className="animate-spin" /> Saving...</div> : 'Save Changes'}
            </Button>
          </div>
        </Card>

        <Card className="p-6 border-red-100">
          <Title className="text-xl mb-1 text-red-600 flex items-center gap-2"><ShieldAlert size={20} /> Danger Zone</Title>
          <p className="text-sm text-slate-500 mb-4">Permanently delete your account and all associated booking data. This action is irreversible.</p>
          <Button variant="danger">Delete Account</Button>
        </Card>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get('/bookings/all');
      setBookings(res.data.bookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 flex-1 w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <Title className="mb-2">Manage Bookings 🛠️</Title>
          <Subtitle>Review and manage customer service requests</Subtitle>
        </div>
        <Button onClick={fetchBookings} variant="secondary" className="flex gap-2">
          {loading ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />} Refresh List
        </Button>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[800px]">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Appliance</th>
              <th className="px-6 py-4">Slot</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium">No bookings found yet.</td></tr>
            ) : (
              bookings.map((booking: any) => (
                <tr key={booking._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{booking.customerName}</p>
                    <p className="text-slate-500 text-xs">{booking.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">{booking.appliance}</p>
                    <p className="text-slate-500 text-xs">{booking.issue}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{booking.slot}</td>
                  <td className="px-6 py-4 font-bold text-blue-600">₹{booking.amount}</td>
                  <td className="px-6 py-4"><Badge variant={booking.status === 'Completed' ? 'success' : 'warning'}>{booking.status}</Badge></td>
                  <td className="px-6 py-4 text-right"><button className="text-slate-400 hover:text-slate-900"><MoreVertical size={18}/></button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// --- MAIN LAYOUT & CONTROLLER ---
export default function App() {
  const routerNavigate = useNavigate();
  const location = useLocation();
  const currentView = (location.pathname === '/' || location.pathname === '') ? 'auth' : location.pathname.substring(1);
  const [auth, setAuth] = useState<{ isAuthenticated: boolean; role: 'admin' | 'user' | null; user: any }>({
    isAuthenticated: false,
    role: null,
    user: null
  });
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await API.get('/auth/me');
      if (res.data.user) {
        setAuth({ isAuthenticated: true, role: res.data.user.role, user: res.data.user });
      }
    } catch (err) {
      setAuth({ isAuthenticated: false, role: null, user: null });
    } finally {
      setCheckingSession(false);
    }
  };

  const handleLogin = (user: any) => {
    setAuth({ isAuthenticated: true, role: user.role, user });
    routerNavigate('/dashboard');
  };

  const handleLogout = async () => {
    try {
      await API.post('/auth/logout');
    } finally {
      setAuth({ isAuthenticated: false, role: null, user: null });
      routerNavigate('/');
    }
  };

  const navigate = (path: string, options?: any) => {
    routerNavigate('/' + path, options);
    setSidebarOpen(false);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const NAV_ITEMS = [
    { label: 'Dashboard', icon: Home, path: 'dashboard' },
    { label: 'Services & Book', icon: Compass, path: 'services' },
    { label: 'Location Picker', icon: MapPin, path: 'location' },
    { label: 'Payments', icon: CreditCard, path: 'payment' },
    { label: 'Subscriptions', icon: Box, path: 'subscription' },
    { label: 'Settings', icon: Settings, path: 'settings' },
    { label: 'Admin Panel', icon: ShieldAlert, path: 'admin', adminOnly: true },
  ].filter(item => !item.adminOnly || auth.role === 'admin');

  if (checkingSession) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;
  }

  if (!auth.isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}
      
      <div className={cn("fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 flex flex-col md:relative md:translate-x-0", sidebarOpen ? "translate-x-0" : "-translate-x-full")}>
        <div className="h-16 flex items-center px-6 border-b border-slate-100 justify-between">
          <div className="flex items-center gap-2 font-black text-xl text-slate-900 tracking-tight cursor-pointer" onClick={() => navigate('dashboard')}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"><CheckCircle2 size={18} strokeWidth={3}/></div>
            FixItNow
          </div>
          <button className="md:hidden text-slate-500" onClick={() => setSidebarOpen(false)}><X size={20}/></button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = currentView === item.path;
            const Icon = item.icon;
            return (
              <button key={item.path} onClick={() => navigate(item.path)} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group", isActive ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "text-slate-600 hover:bg-blue-50 hover:text-blue-700")}>
                <Icon size={20} className={isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100 transition-opacity"} />
                {item.label}
              </button>
            )
          })}
        </div>

        <div className="p-4 border-t border-slate-100">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 p-3 rounded-xl font-bold bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors">
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center">
            <button className="md:hidden mr-4 p-2 -ml-2 text-slate-500" onClick={() => setSidebarOpen(true)}><Menu size={24} /></button>
            <h1 className="text-lg font-bold text-slate-900 capitalize hidden sm:block">
               {currentView} Overview
            </h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto w-full bg-slate-50/50">
          <Routes>
             <Route path="/dashboard" element={<DashboardPage user={auth.user} navigate={navigate} />} />
             <Route path="/services" element={<ServicesBookingPage navigate={navigate} />} />
             <Route path="/location" element={<LocationPickerPage />} />
             <Route path="/payment" element={<PaymentPage navigate={navigate} />} />
             <Route path="/subscription" element={<SubscriptionPage navigate={navigate} />} />
             <Route path="/settings" element={<SettingsPage user={auth.user} />} />
             <Route path="/admin" element={auth.role === 'admin' ? <AdminPage /> : <Navigate to="/dashboard" replace />} />
             <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
        <a href="https://wa.me/918001234567" target="_blank" rel="noreferrer" className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all outline-none ring-offset-2 focus:ring-4 focus:ring-[#25D366]/20">
          <MessageCircle size={28} />
        </a>
        <a href="tel:8001234567" className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:scale-110 active:scale-95 transition-all outline-none ring-offset-2 focus:ring-4 focus:ring-blue-600/20">
          <Phone size={24} />
        </a>
      </div>
    </div>
  );
}
