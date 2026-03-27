import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Typography
export const Title = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h2 className={cn("text-2xl md:text-3xl font-bold text-slate-900 tracking-tight", className)}>{children}</h2>
);
export const Subtitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <p className={cn("text-slate-500 font-medium", className)}>{children}</p>
);

// Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
  const baseStyled = "inline-flex items-center justify-center rounded-xl font-semibold transition-all active:scale-[0.98] outline-none focus:ring-4 focus:ring-blue-500/20";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_14px_0_rgb(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgb(37,99,235,0.23)]",
    secondary: "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm",
    ghost: "hover:bg-slate-100 text-slate-600",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-sm"
  };
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2.5 text-sm", lg: "px-6 py-3.5 text-base" };
  
  return (
    <button ref={ref} className={cn(baseStyled, variants[variant], sizes[size], className)} {...props} />
  );
});

// Card
export const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("bg-white border border-slate-100/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow", className)}>
    {children}
  </div>
);

// Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}
export const Input = ({ className, icon, ...props }: InputProps) => (
  <div className="relative group flex items-center">
    {icon && <div className="absolute left-3 text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">{icon}</div>}
    <input 
      className={cn(
        "w-full bg-slate-50/50 border border-slate-200 text-slate-900 font-medium text-sm rounded-xl py-3 placeholder:font-normal focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all",
        icon ? "pl-10 pr-4" : "px-4",
        className
      )}
      {...props}
    />
  </div>
);

// Badge
export const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'danger' }) => {
  const v = {
    default: "bg-blue-50 text-blue-700",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-red-50 text-red-700"
  };
  return <span className={cn("px-2.5 py-0.5 rounded-full font-bold text-xs shrink-0 tracking-wide uppercase", v[variant])}>{children}</span>;
}

// StatCard
export const StatCard = ({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend?: string }) => (
  <Card className="p-5 flex flex-col gap-4 group cursor-default">
    <div className="flex justify-between items-start">
      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      {trend && <Badge variant="success">{trend}</Badge>}
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
    </div>
  </Card>
);
