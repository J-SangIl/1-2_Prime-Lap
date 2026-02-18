
import React from 'react';
import { FactorNode } from '../types';
import { motion } from 'framer-motion';
import { getColorForNumber } from '../utils/mathUtils';

interface FactorTreeProps {
  node: FactorNode;
  onNodeClick: (node: FactorNode) => void;
}

const FactorTree: React.FC<FactorTreeProps> = ({ node, onNodeClick }) => {
  const isLeaf = !node.left && !node.right;

  return (
    <div className="flex flex-col items-center">
      {/* Current Node */}
      <motion.div 
        layout
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={() => onNodeClick(node)}
        className={`
          relative z-10 cursor-pointer transition-all duration-300
          flex items-center justify-center font-bold text-2xl
          ${node.isPrime ? 'w-16 h-16 rounded-full border-4 border-white shadow-lg' : 'p-4 text-slate-800 hover:bg-white hover:rounded-2xl hover:shadow-md'}
        `}
        style={{
          backgroundColor: getColorForNumber(node.value)
        }}
      >
        {node.value}
      </motion.div>

      {/* Children Container */}
      {!isLeaf && (
        <div className="mt-12 flex gap-12 sm:gap-24 relative">
          {/* SVG Lines Connector */}
          <div className="absolute top-[-48px] left-0 w-full h-12 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.line 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                x1="50" y1="0" x2="25" y2="100" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" 
              />
              <motion.line 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                x1="50" y1="0" x2="75" y2="100" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" 
              />
            </svg>
          </div>
          
          <div className="flex-1">
            {node.left && <FactorTree node={node.left} onNodeClick={onNodeClick} />}
          </div>
          <div className="flex-1">
            {node.right && <FactorTree node={node.right} onNodeClick={onNodeClick} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default FactorTree;
