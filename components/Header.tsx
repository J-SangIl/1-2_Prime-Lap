
import React from 'react';
import { Mode } from '../types';

interface HeaderProps {
  mode: Mode;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ mode, onBack }) => {
  const title = mode === Mode.FUSION ? '숫자 융합소' : mode === Mode.DECOMPOSITION ? '숫자 분해소' : 'Prime Lab';

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {mode !== Mode.HOME && (
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
        )}
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
