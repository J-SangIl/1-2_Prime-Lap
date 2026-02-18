
import React, { useState } from 'react';
import { PRIMES } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { getColorForNumber } from '../utils/mathUtils';

const FusionMode: React.FC = () => {
  const [selectedQueue, setSelectedQueue] = useState<{ id: number; value: number }[]>([]);
  const [fusionResult, setFusionResult] = useState<number | null>(null);
  const [isFusing, setIsFusing] = useState(false);

  const addPrime = (p: number) => {
    setSelectedQueue(prev => [...prev, { id: Date.now() + Math.random(), value: p }]);
    setFusionResult(null);
  };

  const removePrime = (id: number) => {
    setSelectedQueue(prev => prev.filter(item => item.id !== id));
    setFusionResult(null);
  };

  const handleFusion = () => {
    if (selectedQueue.length === 0) return;
    setIsFusing(true);
    
    setTimeout(() => {
      const result = selectedQueue.reduce((acc, curr) => acc * curr.value, 1);
      setFusionResult(result);
      setSelectedQueue([]);
      setIsFusing(false);
    }, 800);
  };

  const reset = () => {
    setSelectedQueue([]);
    setFusionResult(null);
  };

  // 결과 숫자의 길이에 따라 폰트 크기 결정
  const getFontSizeClass = (val: number) => {
    const len = val.toLocaleString().length;
    if (len > 15) return 'text-3xl md:text-4xl';
    if (len > 10) return 'text-4xl md:text-5xl';
    if (len > 7) return 'text-5xl md:text-6xl';
    return 'text-6xl md:text-8xl';
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8 md:space-y-12">
      {/* Result Area */}
      <div className="relative h-48 md:h-64 flex items-center justify-center bg-white rounded-[2rem] md:rounded-[3rem] border-2 border-dashed border-slate-200 shadow-inner overflow-hidden px-4">
        <AnimatePresence mode="wait">
          {isFusing ? (
            <motion.div 
              key="fusing"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [1, 1.2, 0.95, 1], opacity: 1 }}
              className="text-3xl font-black text-blue-500 italic"
            >
              융합 중...
            </motion.div>
          ) : fusionResult !== null ? (
            <motion.div 
              key="result"
              initial={{ y: 30, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              className="flex flex-col items-center w-full"
            >
              <span className="text-sm md:text-base text-slate-400 font-bold mb-2">탄생한 숫자</span>
              <span className={`${getFontSizeClass(fusionResult)} font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 leading-tight break-all text-center`}>
                {fusionResult.toLocaleString()}
              </span>
            </motion.div>
          ) : (
            <div className="text-slate-300 font-bold text-lg md:text-xl text-center">
              소수 카드를 아래에서 선택한 뒤<br/>'융합하기' 버튼을 누르세요
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected Cards Queue */}
      <div className="min-h-[120px] md:min-h-[150px] flex flex-wrap justify-center content-center gap-3 p-4 md:p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
        <AnimatePresence>
          {selectedQueue.length === 0 && !fusionResult && !isFusing && (
            <span className="text-slate-300 text-sm font-medium">선택된 소수가 없습니다</span>
          )}
          {selectedQueue.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ scale: 0, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, y: -20 }}
              onClick={() => removePrime(item.id)}
              style={{ backgroundColor: getColorForNumber(item.value) }}
              className="w-12 h-16 md:w-16 md:h-22 border-2 border-white rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-2xl font-black text-slate-800 cursor-pointer hover:scale-110 active:scale-95 transition-transform shadow-md prime-card-shadow relative group"
            >
              {item.value}
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">✕</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-8 md:gap-12 pb-10">
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
          {PRIMES.map(p => (
            <button 
              key={p}
              onClick={() => addPrime(p)}
              disabled={isFusing}
              style={{ backgroundColor: getColorForNumber(p) }}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white flex items-center justify-center font-black text-slate-700 hover:scale-110 active:scale-90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:scale-100"
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex gap-4 w-full max-w-md">
          <button 
            onClick={reset}
            className="flex-1 py-4 bg-slate-200 text-slate-600 font-black rounded-2xl hover:bg-slate-300 transition-colors active:scale-95"
          >
            초기화
          </button>
          <button 
            onClick={handleFusion}
            disabled={selectedQueue.length === 0 || isFusing}
            className={`flex-[2] py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl transition-all text-lg ${
              selectedQueue.length === 0 ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:bg-blue-700 hover:scale-105 active:scale-95'
            }`}
          >
            융합하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FusionMode;
