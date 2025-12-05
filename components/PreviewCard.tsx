import React from 'react';
import { CardState } from '../types';

interface PreviewCardProps {
  card: CardState;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({ card }) => {
  const { message, textColor, backgroundImage, occasion, fontStyle } = card;

  // Fallback pattern if no image is generated yet
  const fallbackBackground = `linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(16, 185, 129, 0.25)), url("https://picsum.photos/seed/${occasion || 'greeting'}/600/800")`;
  
  return (
    <div className="w-full h-full flex justify-center items-center p-4 bg-slate-100/50 rounded-xl border border-slate-200 shadow-inner">
      <div 
        className="relative w-full max-w-[400px] aspect-[3/4] bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-500 transform hover:scale-[1.01]"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : fallbackBackground,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* If no AI image yet, show a subtle placeholder pattern or color if desired. 
            However, we want to look good by default. */}
        {!backgroundImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50/70 via-white/40 to-indigo-100/70 flex items-center justify-center">
             <span className="text-slate-500 text-sm font-medium italic">AI Image will appear here...</span>
          </div>
        )}

        {/* Overlay for text readability */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${backgroundImage ? 'bg-black/25 opacity-100' : 'bg-white/10 opacity-100'}`} />

        <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center z-10">
          <h1 
            className="font-serif text-3xl md:text-4xl mb-6 font-bold drop-shadow-md transition-colors duration-300"
            style={{ color: textColor }}
          >
            {occasion || 'Happy Occasion'}
          </h1>
          <p 
            className={`${fontStyle === 'serif' ? 'font-serif' : 'font-sans'} text-lg md:text-xl leading-relaxed font-medium drop-shadow-md whitespace-pre-wrap transition-colors duration-300`}
            style={{ color: textColor }}
          >
            {message || 'Your personalized message will appear here.'}
          </p>
        </div>
      </div>
    </div>
  );
};
