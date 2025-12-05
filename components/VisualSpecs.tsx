import React from 'react';
import { motion } from 'framer-motion';
import { CakeTheme } from '../types';
import { Star, Circle, Layers } from 'lucide-react';

interface VisualSpecsProps {
  theme: CakeTheme;
}

export const VisualSpecs: React.FC<VisualSpecsProps> = ({ theme }) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-white/30 backdrop-blur-md rounded-3xl shadow-xl w-24 items-center">
      {/* Sweetness Meter */}
      <div className="flex flex-col items-center gap-2 group">
        <div className="bg-white p-2 rounded-full shadow-sm text-gray-400">
           <Star size={20} fill="currentColor" className="opacity-50" />
        </div>
        <div className="flex flex-col gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`sweet-${i}`}
              initial={false}
              animate={{
                opacity: 5 - i <= theme.sweetness ? 1 : 0.2,
                scale: 5 - i <= theme.sweetness ? 1.2 : 0.8,
                backgroundColor: theme.accentColor
              }}
              className="w-3 h-3 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Flavor Palette */}
      <div className="flex flex-col items-center gap-2">
         <div className="bg-white p-2 rounded-full shadow-sm text-gray-400">
           <Circle size={20} />
        </div>
        <div className="flex flex-col -space-y-2">
          {theme.flavors.map((color, i) => (
            <motion.div
              key={`flavor-${i}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              style={{ backgroundColor: color }}
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm z-10"
            />
          ))}
        </div>
      </div>
      
       {/* Texture/Density */}
       <div className="flex flex-col items-center gap-2">
         <div className="bg-white p-2 rounded-full shadow-sm text-gray-400">
           <Layers size={20} />
        </div>
        <motion.div 
            className="w-1.5 bg-gray-200 rounded-full relative overflow-hidden"
            style={{ height: '60px' }}
        >
            <motion.div 
                className="absolute bottom-0 w-full rounded-full"
                animate={{ 
                    height: `${(theme.texture / 5) * 100}%`,
                    backgroundColor: theme.mainColor
                }}
                transition={{ type: "spring", stiffness: 100 }}
            />
        </motion.div>
      </div>
    </div>
  );
};