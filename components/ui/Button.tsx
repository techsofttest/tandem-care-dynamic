import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'tertiary';
    href?: string;
    children: ReactNode;
}

export default function Button({
    variant = 'primary',
    href,
    children,
    className = '',
    ...props
}: ButtonProps) {
    // Added 'rounded-xl' directly to the base styles for global consistency
    const baseStyle = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 focus:ring-indigo-500",
        // Removed shadow-sm, updated border stroke to slate-300 for better definition
        secondary: "bg-white text-slate-900 border-2 border-slate-300 hover:border-brand-blue hover:text-brand-blue focus:ring-brand-blue",
        tertiary: "bg-transparent text-slate-600 hover:text-brand-blue hover:bg-slate-50 focus:ring-slate-200"
    };

    const combinedClasses = `${baseStyle} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
}