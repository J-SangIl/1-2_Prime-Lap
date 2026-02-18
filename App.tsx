
import React, { useState } from 'react';
import Header from './components/Header';
import FusionMode from './components/FusionMode';
import DecompositionMode from './components/DecompositionMode';
import { Mode } from './types';

const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<Mode>(Mode.HOME);

  const renderContent = () => {
    switch (currentMode) {
      case Mode.FUSION:
        return <FusionMode />;
      case Mode.DECOMPOSITION:
        return <DecompositionMode />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-12 p-6">
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-black text-slate-800 tracking-tight">Prime Lab</h1>
              <p className="text-lg text-slate-500 font-medium">소수와 함께 떠나는 숫자 여행</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
              <button 
                onClick={() => setCurrentMode(Mode.FUSION)}
                className="group relative bg-white p-10 rounded-3xl shadow-xl border border-slate-100 hover:border-blue-500 transition-all hover:scale-105 active:scale-95"
              >
                <div className="absolute top-4 right-4 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
                <div className="text-4xl mb-4">🧪</div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">융합 모드</h2>
                <p className="text-slate-500">소수들을 결합하여<br/>새로운 자연수를 탄생시키세요.</p>
              </button>

              <button 
                onClick={() => setCurrentMode(Mode.DECOMPOSITION)}
                className="group relative bg-white p-10 rounded-3xl shadow-xl border border-slate-100 hover:border-emerald-500 transition-all hover:scale-105 active:scale-95"
              >
                <div className="absolute top-4 right-4 w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
                <div className="text-4xl mb-4">💎</div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">분해 모드</h2>
                <p className="text-slate-500">자연수를 더 이상 나눌 수 없을<br/>때까지 깊게 탐험하세요.</p>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <Header mode={currentMode} onBack={() => setCurrentMode(Mode.HOME)} />
      <main className="container mx-auto max-w-5xl">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
