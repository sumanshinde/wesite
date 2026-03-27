import { Title, Subtitle, Button, Card, Input, Badge, StatCard, cn } from './components';
import { Mail, Lock, Calendar, CheckCircle2, AlertCircle, MapPin, CreditCard, Search, MoreVertical, Check, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
// --- AUTH PAGE ---
export const AuthPage = () => (
  <div className="flex-1 flex flex-col items-center justify-center p-4">
    <Card className="w-full max-w-md p-8 shadow-xl border-t-4 border-t-blue-600">
      <Title className="mb-2 text-center text-3xl">Welcome Back</Title>
      <Subtitle className="mb-6 text-center">Sign in to manage your bookings</Subtitle>
      
      <div className="space-y-4 mb-6">
        <Button variant="secondary" className="w-full flex gap-3 text-slate-800 border-slate-200">
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
          Continue with Google
        </Button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
        <div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-slate-400">Or continue with</span></div>
      </div>

      <form className="space-y-4">
        <div>
          <label className="text-sm font-bold text-slate-800 mb-1.5 block">Email</label>
          <Input type="email" placeholder="m@example.com" icon={<Mail />} />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-sm font-bold text-slate-800">Password</label>
            <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Forgot password?</a>
          </div>
          <Input type="password" placeholder="••••••••" icon={<Lock />} />
        </div>
        <Button className="w-full py-3.5 mt-2 shadow-[0_4px_20px_0_rgb(37,99,235,0.25)]">Sign In</Button>
      </form>
    </Card>
  </div>
);

// --- DASHBOARD PAGE ---
export const DashboardPage = () => (
  <div className="p-4 md:p-8 flex-1 overflow-y-auto w-full">
    <Title className="mb-2">Welcome back, John 👋</Title>
    <Subtitle className="mb-8">Here's what's happening with your bookings today.</Subtitle>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard title="Total Bookings" value="1,248" icon={<Calendar />} trend="+12% this month" />
      <StatCard title="Revenue" value="₹48,250" icon={<CreditCard />} trend="+4.3% this month" />
      <StatCard title="Active Services" value="14" icon={<CheckCircle2 />} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Title className="text-xl mb-4">Recent Bookings</Title>
        <Card className="overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4 hidden sm:table-cell">Technician</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                {s: 'AC Repair', t: 'Mike Wilson', status: 'Completed', c: 'success', a: '₹1499'},
                {s: 'Washing Machine', t: 'Pending', status: 'Scheduled', c: 'warning', a: '₹199'},
                {s: 'Refrigerator Gas', t: 'Sarah Connor', status: 'In Progress', c: 'default', a: '₹499'},
              ].map((row, i) => (
                <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{row.s}</td>
                  <td className="px-6 py-4 hidden sm:table-cell text-slate-600">{row.t}</td>
                  <td className="px-6 py-4"><Badge variant={row.c as any}>{row.status}</Badge></td>
                  <td className="px-6 py-4 text-right font-medium text-slate-600">{row.a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
      <div>
        <Title className="text-xl mb-4">Notifications</Title>
        <Card className="flex flex-col gap-1 p-2">
          {[
            {icon: <CheckCircle2 className="text-emerald-500"/>, title: "Booking Completed", desc: "AC Repair finished by Mike."},
            {icon: <AlertCircle className="text-amber-500"/>, title: "Payment Failed", desc: "Card ended in 4242 was declined."},
            {icon: <Calendar className="text-blue-500"/>, title: "Upcoming Schedule", desc: "Washing machine inspect at 2 PM."},
          ].map((n, i) => (
            <div key={i} className="flex gap-4 p-3 hover:bg-slate-50 rounded-xl cursor-default transition-colors">
              <div className="mt-1 bg-white shadow-sm p-1.5 rounded-full h-fit border border-slate-100">{n.icon}</div>
              <div>
                <p className="font-bold text-slate-800 text-sm">{n.title}</p>
                <p className="text-slate-500 text-xs mt-0.5">{n.desc}</p>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  </div>
);

// --- LOCATION PICKER ---
export const LocationPickerPage = () => (
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

// --- PAYMENT PAGE ---
export const PaymentPage = () => {
  const [method, setMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      window.location.href = '/dashboard';
    }, 2000);
  };

  return (
  <div className="p-4 md:p-8 flex-1 w-full max-w-3xl mx-auto">
    <Title className="mb-2">Checkout</Title>
    <Subtitle className="mb-8">Complete your payment securely.</Subtitle>
    
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <Title className="text-xl mb-4">Order Summary</Title>
        <Card className="p-6 mb-6">
          <div className="flex justify-between font-bold text-slate-800 mb-2">
            <span>AC Installation</span>
            <span>₹1499</span>
          </div>
          <p className="text-sm text-slate-500 mb-4 pb-4 border-b border-slate-100">Standard Window/Split AC Installation</p>
          
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>Subtotal</span>
            <span>₹1499</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600 mb-4 pb-4 border-b border-slate-100">
            <span>Taxes & Fees (18% GST)</span>
            <span>₹269.82</span>
          </div>
          <div className="flex justify-between text-lg font-extrabold text-slate-900">
            <span>Total Payable</span>
            <span className="text-blue-600">₹1768.82</span>
          </div>
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
           <Button disabled={processing} className="w-full text-lg py-4 relative shadow-[0_8px_30px_0_rgb(37,99,235,0.3)] disabled:opacity-75 disabled:cursor-not-allowed" onClick={handlePayment}>
             {processing ? (
               <div className="flex items-center gap-2">
                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...
               </div>
             ) : (
               <>Pay Now securely <Lock size={16} className="absolute right-4 opacity-50" /></>
             )}
           </Button>
           <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1"><ShieldCheck size={14}/> Secured by Razorpay</p>
        </Card>
      </div>
    </div>
  </div>
)};

// --- SUBSCRIPTIONS PAGE ---
export const SubscriptionPage = () => (
  <div className="p-4 md:p-8 flex-1 w-full max-w-5xl mx-auto">
    <div className="text-center mb-10">
      <Title className="text-3xl lg:text-4xl mb-3">Simple, transparent pricing</Title>
      <Subtitle>No hidden fees. Cancel anytime.</Subtitle>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { t: 'Basic', p: '₹0', d: 'Pay as you go', features: ['1 Service per month', 'Standard Support', 'Next-day slots'], active: false },
        { t: 'Pro Plus', p: '₹499', d: 'Billed monthly', features: ['Unlimited Services', 'Priority Support', 'Same-day slots', 'Zero visiting charges'], active: true, popular: true },
        { t: 'Premium', p: '₹1499', d: 'Billed quarterly', features: ['Everything in Pro', 'Dedicated Account Manager', 'Free spare parts up to ₹1000', '1-hour guaranteed SLA'], active: false }
      ].map((plan, i) => (
        <Card key={i} className={cn("p-8 relative flex flex-col", plan.popular && "border-2 border-blue-600 shadow-xl shadow-blue-100 transform md:-translate-y-2")}>
          {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-sm">Most Popular</span>}
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
          
          <Button variant={plan.active ? 'secondary' : 'primary'} className="w-full py-3">
            {plan.active ? 'Current Plan' : 'Upgrade'}
          </Button>
        </Card>
      ))}
    </div>
  </div>
);

// --- SETTINGS PAGE ---
export const SettingsPage = () => (
  <div className="p-4 md:p-8 flex-1 w-full max-w-3xl mx-auto">
    <Title className="mb-2">Settings</Title>
    <Subtitle className="mb-8">Manage your account settings and preferences.</Subtitle>

    <div className="flex flex-col gap-6">
      <Card className="p-6">
        <Title className="text-xl mb-4">Profile Information</Title>
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">JD</div>
          <div>
            <Button variant="secondary" size="sm" className="mb-2">Change Avatar</Button>
            <p className="text-xs text-slate-500">JPG, GIF or PNG. 1MB max.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-bold text-slate-800 mb-1.5 block">First Name</label>
            <Input defaultValue="John" />
          </div>
          <div>
            <label className="text-sm font-bold text-slate-800 mb-1.5 block">Last Name</label>
            <Input defaultValue="Doe" />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-bold text-slate-800 mb-1.5 block">Email Address</label>
            <Input defaultValue="john.doe@example.com" />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button>Save Changes</Button>
        </div>
      </Card>

      <Card className="p-6">
        <Title className="text-xl mb-1 text-red-600">Danger Zone</Title>
        <p className="text-sm text-slate-500 mb-4">Permanently delete your account and all data.</p>
        <Button variant="danger">Delete Account</Button>
      </Card>
    </div>
  </div>
);

// --- ADMIN PANEL ---
export const AdminPage = () => (
  <div className="p-4 md:p-8 flex-1 w-full">
    <div className="flex justify-between items-end mb-8">
      <div>
        <Title className="mb-2">Admin Panel</Title>
        <Subtitle>Platform overview & metrics</Subtitle>
      </div>
      <Button variant="primary" className="bg-slate-900 border border-slate-800 shadow-[0_4px_10px_rgb(0,0,0,0.1)]">Export Data</Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {[
        {l: 'Total Users', v: '14,231', t: '+8.1%'},
        {l: 'MRR', v: '₹1.2M', t: '+12.4%'},
        {l: 'Active Pros', v: '841', t: '+2.1%'},
        {l: 'Open Tickets', v: '23', t: '-14%'},
      ].map(s => (
        <Card key={s.l} className="p-5">
          <p className="text-slate-500 text-sm font-medium mb-1">{s.l}</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-bold text-slate-900">{s.v}</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{s.t}</span>
          </div>
        </Card>
      ))}
    </div>

    <Card className="overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <Title className="text-lg">Recent Users</Title>
        <div className="relative w-64">
           <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
           <input type="text" placeholder="Search users..." className="w-full text-sm border border-slate-200 rounded-lg py-2 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
          <tr>
            <th className="px-6 py-3">User</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Joined</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {[1,2,3,4,5].map(i => (
            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">U{i}</div>
                  <div>
                    <p className="font-bold text-slate-900">User Name {i}</p>
                    <p className="text-slate-500 text-xs">user{i}@example.com</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 font-medium text-slate-600">{i % 3 === 0 ? 'Admin' : 'Customer'}</td>
              <td className="px-6 py-4"><Badge variant={i%2===0?'success':'default'}>Active</Badge></td>
              <td className="px-6 py-4 text-slate-500">Mar {i + 10}, 2026</td>
              <td className="px-6 py-4 text-right">
                <button className="text-slate-400 hover:text-slate-900 p-1"><MoreVertical size={18}/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);
