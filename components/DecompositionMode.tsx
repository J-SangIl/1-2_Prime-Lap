
import React, { useState, useMemo } from 'react';
import { FactorNode } from '../types';
import { isPrime, generateId, checkDecomposed, getPrimeFactors } from '../utils/mathUtils';
import FactorTree from './FactorTree';
import { motion, AnimatePresence } from 'framer-motion';

const DecompositionMode: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [rootNode, setRootNode] = useState<FactorNode | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [pickerData, setPickerData] = useState<{ nodeId: string, value: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    const val = parseInt(inputValue);
    if (isNaN(val) || val <= 1) {
      setError('2 이상의 자연수를 입력해주세요.');
      return;
    }
    setRootNode({
      id: generateId(),
      value: val,
      isPrime: isPrime(val)
    });
    setIsStarted(true);
    setError(null);
  };

  const getDivisors = (n: number) => {
    const divisors = [];
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        divisors.push(i);
        if (i !== n / i) divisors.push(n / i);
      }
    }
    return divisors.sort((a, b) => a - b);
  };

  const handleNodeClick = (node: FactorNode) => {
    if (node.isPrime || node.left || node.right) return;
    setPickerData({ nodeId: node.id, value: node.value });
  };

  const performSplit = (divisor: number) => {
    if (!pickerData || !rootNode) return;

    const otherFactor = pickerData.value / divisor;

    const updateTree = (node: FactorNode): FactorNode => {
      if (node.id === pickerData.nodeId) {
        return {
          ...node,
          left: { id: generateId(), value: divisor, isPrime: isPrime(divisor) },
          right: { id: generateId(), value: otherFactor, isPrime: isPrime(otherFactor) }
        };
      }
      const newNode = { ...node };
      if (newNode.left) newNode.left = updateTree(newNode.left);
      if (newNode.right) newNode.right = updateTree(newNode.right);
      return newNode;
    };

    setRootNode(updateTree(rootNode));
    setPickerData(null);
  };

  const isComplete = useMemo(() => checkDecomposed(rootNode), [rootNode]);
  
  const equation = useMemo(() => {
    if (!isComplete || !rootNode) return '';
    const factors = getPrimeFactors(rootNode);
    return `${rootNode.value} = ${factors.join(' × ')}`;
  }, [isComplete, rootNode]);

  if (!isStarted) {
    return (
      <div className="max-w-md mx-auto p-6 mt-20 bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center text-slate-800">분해할 숫자를 입력하세요</h2>
        <input 
          type="number" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleStart()}
          placeholder="예: 48, 60, 100"
          className="w-full px-4 py-4 text-center text-3xl font-black border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none transition-all placeholder:text-slate-200"
        />
        {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
        <button 
          onClick={handleStart}
          className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-xl transition-all active:scale-95 text-lg"
        >
          시작하기
        </button>
      </div>
    );
  }

  const divisors = pickerData ? getDivisors(pickerData.value) : [];

  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] p-6 md:p-10 bg-slate-50 flex flex-col items-center">
      <div className="w-full max-w-4xl mb-10 flex flex-col items-center gap-6">
         <button 
           onClick={() => { setIsStarted(false); setRootNode(null); setInputValue(''); }}
           className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl shadow-sm hover:bg-slate-50 transition-colors font-bold"
         >
           새로운 숫자 분해하기
         </button>
         
         <AnimatePresence>
           {isComplete && (
             <motion.div 
               initial={{ y: -30, opacity: 0, scale: 0.9 }}
               animate={{ y: 0, opacity: 1, scale: 1 }}
               className="flex flex-col items-center gap-4 w-full"
             >
               <div className="bg-emerald-500 text-white px-8 py-3 rounded-full font-black text-xl shadow-lg shadow-emerald-200">
                 🎉 소인수분해 완료!
               </div>
               <motion.div 
                 initial={{ scale: 0.8 }}
                 animate={{ scale: 1 }}
                 transition={{ type: 'spring', damping: 12 }}
                 className="bg-white border-4 border-emerald-400 px-8 md:px-12 py-6 rounded-[2.5rem] shadow-2xl text-3xl md:text-5xl font-black text-slate-800 tracking-tight text-center"
               >
                 {equation}
               </motion.div>
             </motion.div>
           )}
         </AnimatePresence>
      </div>

      <div className="w-full overflow-x-auto overflow-y-visible flex justify-start md:justify-center py-10 px-4 min-h-[400px]">
        {rootNode && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block align-top"
          >
            <FactorTree node={rootNode} onNodeClick={handleNodeClick} />
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {pickerData && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-6 md:p-8 bg-white border-t border-slate-200 shadow-[0_-10px_50px_rgba(0,0,0,0.15)] rounded-t-[40px]"
          >
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">
                  <span className="text-blue-600 text-2xl mr-2">{pickerData.value}</span>을(를) 어떻게 나눌까요?
                </h3>
                <button 
                  onClick={() => setPickerData(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {divisors.map(d => (
                  <button
                    key={d}
                    onClick={() => performSplit(d)}
                    className="px-6 py-4 bg-blue-50 text-blue-700 text-xl font-black rounded-2xl border-2 border-transparent hover:border-blue-400 hover:bg-blue-600 hover:text-white hover:scale-105 active:scale-95 transition-all shadow-sm"
                  >
                    {d}
                  </button>
                ))}
                {divisors.length === 0 && (
                  <p className="text-slate-400 py-4 font-medium italic">이 숫자는 더 이상 분해할 수 없는 소수입니다.</p>
                )}
              </div>
              <p className="mt-4 text-center text-slate-400 text-sm">나누고 싶은 약수 하나를 선택하세요. (나머지 한 쪽은 자동 계산됩니다)</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DecompositionMode;
