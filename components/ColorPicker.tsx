import React from 'react';
import { COLORS } from '../types';
import { Check } from 'lucide-react';

interface ColorPickerProps {
  selectedColor: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Text Color
      </label>
      <div className="flex flex-wrap gap-2">
        {COLORS.map((color) => (
          <button
            key={color.value}
            onClick={() => onChange(color.value)}
            className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500`}
            style={{ backgroundColor: color.value }}
            title={color.name}
            aria-label={`Select ${color.name}`}
          >
            {selectedColor === color.value && (
              <Check className={`w-4 h-4 ${color.name === 'White' ? 'text-black' : 'text-white'}`} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
