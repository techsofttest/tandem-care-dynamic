import { InputHTMLAttributes, forwardRef } from "react";
import { AlertCircle, LucideIcon } from "lucide-react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    required?: boolean;
    icon?: LucideIcon;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, error, required, icon: Icon, className = "", id, ...props }, ref) => {
        return (
            <div className="w-full">
                <label htmlFor={id} className="block text-sm font-semibold text-slate-800 mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                <div className="relative">
                    {Icon && (
                        <Icon className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
                    )}
                    <input
                        ref={ref}
                        id={id}
                        className={`w-full ${
                            Icon ? "pl-12" : "px-4"
                        } pr-4 py-3 rounded-xl border ${
                            error
                                ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                                : "border-slate-300 focus:border-brand-blue/50 focus:ring-brand-blue/30"
                        } bg-slate-50/10 text-slate-900 transition-colors focus:ring-1 focus:outline-none ${className}`}
                        {...props}
                    />
                </div>
                {error && (
                    <span className="form-error-msg text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" /> {error}
                    </span>
                )}
            </div>
        );
    }
);

FormInput.displayName = "FormInput";
