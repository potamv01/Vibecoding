import React from 'react';
import { Sparkles } from 'lucide-react';

interface SuggestionListProps {
  suggestions: string[];
  onSelect: (text: string) => void;
}

export const SuggestionList: React.FC<SuggestionListProps> = ({ suggestions, onSelect }) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="mt-4 animate-fadeIn">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-brand-500" />
        AI Suggestions
      </h3>
      <div className="grid gap-2">
        {suggestions.map((text, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(text)}
            className="text-left text-sm p-3 rounded-lg bg-white border border-slate-200 hover:border-brand-300 hover:shadow-sm hover:bg-brand-50 transition-all text-slate-700"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};
