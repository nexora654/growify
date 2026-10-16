import { ChevronDown, HelpCircle } from 'lucide-react';
import { useRegLanguage } from '../context/LanguageContext';

interface BirthdaySelectsProps {
  month: string;
  day: string;
  year: string;
  onChange: (field: 'birthMonth' | 'birthDay' | 'birthYear', value: string) => void;
  onHelpClick: () => void;
  error?: string;
}

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));

// Generate realistic birth years (from 1920 up to 2018 for a 2026 application)
const currentYear = 2026;
const YEARS = Array.from({ length: 95 }, (_, i) => String(currentYear - 6 - i));

export function BirthdaySelects({
  month,
  day,
  year,
  onChange,
  onHelpClick,
  error,
}: BirthdaySelectsProps) {
  const { t } = useRegLanguage();

  return (
    <div className="w-full">
      <div className="flex items-center gap-1.5 mb-2">
        <label
          htmlFor="birthMonth"
          className="main-text text-[14px] font-semibold text-[#F2F4F6] select-none"
        >
          {t.birthdayLabel}
        </label>
        <button
          type="button"
          onClick={onHelpClick}
          aria-label="Learn more about why we ask for your birthday"
          className="w-7 h-7 -my-1 text-[#9FA4AB] hover:text-[#F2F4F6] hover:bg-white/10 active:bg-white/20 transition-colors flex items-center justify-center rounded-full focus:outline-none focus:ring-1 focus:ring-zinc-400 cursor-pointer touch-manipulation"
          id="birthday-info-btn"
        >
          <HelpCircle className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {/* Month Select */}
        <div className="relative">
          <select
            id="birthMonth"
            value={month}
            onChange={(e) => onChange('birthMonth', e.target.value)}
            className={`input w-full h-[46px] min-h-[44px] px-2.5 sm:px-3.5 pr-7 sm:pr-8 appearance-none bg-[#28292C] border ${
              error ? 'border-red-500' : 'border-[#50545B]'
            } rounded-xl text-[16px] sm:text-[14px] ${
              month ? 'text-[#F2F4F6]' : 'text-[#9FA4AB]'
            } hover:border-[#6b707a] focus:outline-none focus:border-[#a8a8a8] cursor-pointer transition-colors`}
          >
            <option value="" disabled className="bg-[#28292C] text-[#9FA4AB]">
              {t.monthPlaceholder}
            </option>
            {t.months.map((m, idx) => (
              <option key={idx} value={m} className="bg-[#28292C] text-[#F2F4F6]">
                {m}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-[#9FA4AB] absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Day Select */}
        <div className="relative">
          <select
            id="birthDay"
            value={day}
            onChange={(e) => onChange('birthDay', e.target.value)}
            className={`input w-full h-[46px] min-h-[44px] px-2.5 sm:px-3.5 pr-7 sm:pr-8 appearance-none bg-[#28292C] border ${
              error ? 'border-red-500' : 'border-[#50545B]'
            } rounded-xl text-[16px] sm:text-[14px] ${
              day ? 'text-[#F2F4F6]' : 'text-[#9FA4AB]'
            } hover:border-[#6b707a] focus:outline-none focus:border-[#a8a8a8] cursor-pointer transition-colors`}
          >
            <option value="" disabled className="bg-[#28292C] text-[#9FA4AB]">
              {t.dayPlaceholder}
            </option>
            {DAYS.map((d) => (
              <option key={d} value={d} className="bg-[#28292C] text-[#F2F4F6]">
                {d}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-[#9FA4AB] absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Year Select */}
        <div className="relative">
          <select
            id="birthYear"
            value={year}
            onChange={(e) => onChange('birthYear', e.target.value)}
            className={`input w-full h-[46px] min-h-[44px] px-2.5 sm:px-3.5 pr-7 sm:pr-8 appearance-none bg-[#28292C] border ${
              error ? 'border-red-500' : 'border-[#50545B]'
            } rounded-xl text-[16px] sm:text-[14px] ${
              year ? 'text-[#F2F4F6]' : 'text-[#9FA4AB]'
            } hover:border-[#6b707a] focus:outline-none focus:border-[#a8a8a8] cursor-pointer transition-colors`}
          >
            <option value="" disabled className="bg-[#28292C] text-[#9FA4AB]">
              {t.yearPlaceholder}
            </option>
            {YEARS.map((y) => (
              <option key={y} value={y} className="bg-[#28292C] text-[#F2F4F6]">
                {y}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-[#9FA4AB] absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {error && (
        <p className="mt-1.5 text-[12px] text-red-400" id="birthday-error">
          {error}
        </p>
      )}
    </div>
  );
}
