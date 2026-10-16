import { useState, ChangeEvent } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface InstagramInputProps {
  id: string;
  label: string;
  type?: 'text' | 'password' | 'email' | 'tel';
  value: string;
  onChange: (value: string) => void;
  isValid?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  autoComplete?: string;
}

export function InstagramInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  isValid,
  hasError,
  errorMessage,
  autoComplete,
}: InstagramInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isFilled = value.length > 0;
  const isLabelFloated = isFilled || isFocused;
  const actualType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full mb-1.5" id={`field-container-${id}`}>
      <div
        className={`relative w-full h-[38px] bg-[#fafafa] dark:bg-[#121212] border ${
          hasError
            ? 'border-[#ed4956]'
            : 'border-[#dbdbdb] dark:border-[#363636] focus-within:border-[#a8a8a8] dark:focus-within:border-[#777777]'
        } rounded-[3px] transition-colors flex items-center`}
      >
        <label
          htmlFor={id}
          className={`absolute left-2 transition-all duration-100 pointer-events-none select-none text-[#737373] ${
            isLabelFloated
              ? 'text-[10px] top-[4px] leading-tight origin-left'
              : 'text-[12px] top-1/2 -translate-y-1/2'
          }`}
        >
          {label}
        </label>

        <input
          id={id}
          type={actualType}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete={autoComplete}
          className={`w-full h-full bg-transparent px-2 text-[12px] text-[#262626] dark:text-[#f5f5f5] focus:outline-none ${
            isLabelFloated ? 'pt-3 pb-0.5' : 'py-2'
          } ${type === 'password' ? 'pr-14' : isValid || hasError ? 'pr-8' : 'pr-2'}`}
        />

        {/* Right side controls */}
        <div className="absolute right-2 flex items-center gap-1">
          {type === 'password' && isFilled && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[14px] font-semibold text-[#262626] dark:text-[#f5f5f5] hover:opacity-50 select-none focus:outline-none transition-opacity cursor-pointer mr-1"
              id={`toggle-password-${id}`}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          )}

          {isValid && !hasError && isFilled && (
            <CheckCircle2
              className="w-[18px] h-[18px] text-[#8e8e8e] stroke-[2]"
              aria-label="Valid input"
            />
          )}

          {hasError && (
            <XCircle
              className="w-[18px] h-[18px] text-[#ed4956] stroke-[2]"
              aria-label="Input error"
            />
          )}
        </div>
      </div>

      {hasError && errorMessage && (
        <p className="mt-1 text-[11px] text-[#ed4956] text-left leading-tight pl-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
