import React, { useState } from 'react';
import { CardState, LoadingState, TONES, COLORS, FONTS, PRESET_BACKGROUNDS } from './types';
import { generateSuggestions, generateMessage, generateImage } from './services/geminiService';
import { saveCardToFirestore } from './services/storageService';
import { InputGroup } from './components/InputGroup';
import { PreviewCard } from './components/PreviewCard';
import { ColorPicker } from './components/ColorPicker';
import { SuggestionList } from './components/SuggestionList';
import { Wand2, Image as ImageIcon, Save, Share2, Loader2, PenTool, Check, RefreshCcw } from 'lucide-react';

const INITIAL_CARD: CardState = {
  occasion: '',
  recipient: '',
  tone: TONES[0],
  message: '',
  textColor: COLORS[1].value, // Default white
  fontStyle: 'sans',
  backgroundImage: null,
};

export default function App() {
  const [card, setCard] = useState<CardState>(INITIAL_CARD);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    suggestions: false,
    message: false,
    image: false,
    saving: false,
  });
  const [savedId, setSavedId] = useState<string | null>(null);

  const updateCard = (key: keyof CardState, value: string) => {
    setCard(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerateSuggestions = async () => {
    if (!card.occasion || !card.recipient) return;
    setLoading(prev => ({ ...prev, suggestions: true }));
    try {
      const results = await generateSuggestions(card.occasion, card.recipient, card.tone);
      setSuggestions(results);
    } catch (err) {
      alert("Failed to generate suggestions. Please check your API key.");
    } finally {
      setLoading(prev => ({ ...prev, suggestions: false }));
    }
  };

  const handleGenerateMessage = async () => {
    if (!card.occasion || !card.recipient) return;
    setLoading(prev => ({ ...prev, message: true }));
    try {
      const msg = await generateMessage(card.occasion, card.recipient, card.tone);
      updateCard('message', msg);
    } catch (err) {
      alert("Failed to generate message.");
    } finally {
      setLoading(prev => ({ ...prev, message: false }));
    }
  };

  const handleGenerateImage = async () => {
    if (!card.occasion) return;
    setLoading(prev => ({ ...prev, image: true }));
    try {
      const imgData = await generateImage(card.occasion, card.tone);
      updateCard('backgroundImage', imgData);
    } catch (err) {
      alert("Failed to generate image. Please ensure you have access to Imagen models.");
    } finally {
      setLoading(prev => ({ ...prev, image: false }));
    }
  };

  const handleSaveCard = async () => {
    if (!card.message || !card.occasion) {
      alert("Please complete your card before saving.");
      return;
    }
    setLoading(prev => ({ ...prev, saving: true }));
    try {
      const id = await saveCardToFirestore(card);
      setSavedId(id);
    } catch (err) {
      alert("Failed to save card.");
    } finally {
      setLoading(prev => ({ ...prev, saving: false }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-brand-600 text-white p-1.5 rounded-lg">
              <PenTool size={20} />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-brand-700 to-indigo-600 bg-clip-text text-transparent">
              Gemini Cards
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/potamv01/VenkatPotamsetti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-700 bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors"
            >
              <span>Portfolio</span>
            </a>
            {savedId && (
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full border border-green-200">
                <Share2 size={16} />
                <span>Shared ID: {savedId}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:h-[calc(100vh-8rem)]">
          
          {/* Editor Column */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6 overflow-y-auto pr-2 pb-20 lg:pb-0">
            
            {/* Context Section */}
            <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-slate-800">1. The Basics</h2>
              <InputGroup 
                label="Occasion" 
                value={card.occasion} 
                onChange={(v) => updateCard('occasion', v)}
                placeholder="e.g. Birthday, Anniversary, New Job"
              />
              <InputGroup 
                label="Recipient" 
                value={card.recipient} 
                onChange={(v) => updateCard('recipient', v)}
                placeholder="e.g. Mom, Best Friend, Boss"
              />
              <InputGroup 
                label="Tone" 
                value={card.tone} 
                onChange={(v) => updateCard('tone', v)}
                type="select"
                options={TONES}
              />
            </section>

            {/* Message Section */}
            <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-slate-800 flex justify-between items-center">
                <span>2. The Message</span>
              </h2>
              
              <div className="flex gap-2 mb-4">
                <button
                  onClick={handleGenerateSuggestions}
                  disabled={loading.suggestions || !card.occasion || !card.recipient}
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors disabled:opacity-50"
                >
                  {loading.suggestions ? <Loader2 className="animate-spin w-4 h-4"/> : <Wand2 className="w-4 h-4" />}
                  Suggest
                </button>
                <button
                  onClick={handleGenerateMessage}
                  disabled={loading.message || !card.occasion || !card.recipient}
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors disabled:opacity-50"
                >
                  {loading.message ? <Loader2 className="animate-spin w-4 h-4"/> : <PenTool className="w-4 h-4" />}
                  Write for Me
                </button>
              </div>

              <SuggestionList suggestions={suggestions} onSelect={(text) => updateCard('message', text)} />

              <div className="mt-4">
                 <InputGroup 
                  label="Your Message" 
                  value={card.message} 
                  onChange={(v) => updateCard('message', v)}
                  type="textarea"
                  placeholder="Type or select a suggestion..."
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Font Style</label>
                <div className="flex bg-slate-100 p-1 rounded-lg mb-4">
                  {FONTS.map(font => (
                    <button
                      key={font.value}
                      onClick={() => updateCard('fontStyle', font.value)}
                      className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                        card.fontStyle === font.value 
                        ? 'bg-white text-brand-600 shadow-sm ring-1 ring-slate-200' 
                        : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      <span className={font.value === 'serif' ? 'font-serif' : 'font-sans'}>
                        {font.name}
                      </span>
                    </button>
                  ))}
                </div>

                <ColorPicker 
                  selectedColor={card.textColor} 
                  onChange={(c) => updateCard('textColor', c)} 
                />
              </div>
            </section>

            {/* Visuals Section */}
            <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-slate-800">3. Visuals & Save</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Quick Select Background</label>
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_BACKGROUNDS.map((bg) => (
                    <button
                      key={bg.name}
                      onClick={() => updateCard('backgroundImage', bg.url)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        card.backgroundImage === bg.url ? 'border-brand-500 ring-2 ring-brand-200' : 'border-transparent hover:border-slate-300'
                      }`}
                      title={bg.name}
                    >
                      <img src={bg.url} alt={bg.name} className="w-full h-full object-cover" />
                      {card.backgroundImage === bg.url && (
                        <div className="absolute inset-0 bg-brand-500/20 flex items-center justify-center">
                          <div className="bg-white rounded-full p-0.5 shadow-sm">
                            <Check size={14} className="text-brand-600"/>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-white text-xs font-medium text-slate-500">OR CREATE CUSTOM</span>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={handleGenerateImage}
                  disabled={loading.image || !card.occasion}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-medium shadow-md hover:shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50"
                >
                  {loading.image ? <Loader2 className="animate-spin w-5 h-5"/> : <ImageIcon className="w-5 h-5" />}
                  Generate AI Background
                </button>
                <button
                  onClick={handleGenerateImage}
                  disabled={loading.image || !card.occasion}
                  className="px-4 flex items-center justify-center bg-white text-indigo-600 border border-indigo-100 rounded-lg shadow-sm hover:bg-indigo-50 transition-all disabled:opacity-50"
                  title="Refresh / Regenerate"
                >
                  <RefreshCcw className={`w-5 h-5 ${loading.image ? 'animate-spin' : ''}`} />
                </button>
              </div>
              
              <button
                onClick={handleSaveCard}
                disabled={loading.saving}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white px-4 py-3 rounded-lg font-medium shadow-md hover:bg-slate-900 transition-all disabled:opacity-50"
              >
                {loading.saving ? <Loader2 className="animate-spin w-5 h-5"/> : <Save className="w-5 h-5" />}
                {savedId ? 'Saved! Save Another?' : 'Save & Get Share Link'}
              </button>
            </section>

          </div>

          {/* Preview Column */}
          <div className="w-full lg:w-2/3 h-[500px] lg:h-auto sticky top-24">
             <PreviewCard card={card} />
          </div>

        </div>
      </main>
    </div>
  );
}