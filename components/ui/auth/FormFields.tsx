"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  accentColor?: string;
}

export function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  accentColor = "#4a7c3f",
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#444]">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 text-sm rounded-xl border border-[#e0dbd4] bg-white placeholder:text-[#bbb] text-[#333] outline-none transition-all duration-200"
          onFocus={(e) => {
            e.target.style.borderColor = accentColor;
            e.target.style.boxShadow = `0 0 0 3px ${accentColor}18`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e0dbd4";
            e.target.style.boxShadow = "none";
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#666] transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  accentColor?: string;
}

export function SelectField({ label, options, value, onChange, accentColor = "#4a7c3f" }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#444]">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 text-sm rounded-xl border border-[#e0dbd4] bg-white text-[#333] outline-none appearance-none cursor-pointer transition-all"
        onFocus={(e) => {
          e.target.style.borderColor = accentColor;
          e.target.style.boxShadow = `0 0 0 3px ${accentColor}18`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#e0dbd4";
          e.target.style.boxShadow = "none";
        }}
      >
        <option value="">Seleccionar categoría principal</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}