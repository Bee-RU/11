import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CAKE_THEMES, CakeType } from './types';
import { InteractiveCake } from './components/InteractiveCake';
import { NavMenu } from './components/NavMenu';
import { VisualSpecs } from './components/VisualSpecs';
import { ShoppingBag, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [currentType, setCurrentType] = useState<CakeType>(CakeType.STRAWBERRY);
  const [isLiked, setIsLiked] = useState(false);
  
  const theme = CAKE_THEMES[currentType];

  return (
    <div 
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: theme.bgColor }}
    >
      {/* Background Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: theme.mainColor }}
        />
        <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: theme.accentColor }}
        />
         {/* Floating decorative particles */}
         {[...Array(5)].map((_, i) => (
             <motion.div 
                key={i}
                className="absolute w-4 h-4 rounded-full opacity-40"
                style={{ 
                    backgroundColor: theme.secondaryColor,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                }}
                animate={{
                    y: [0, -100],
                    opacity: [0.4, 0]
                }}
                transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: Math.random() * 5
                }}
             />
         ))}
      </div>

      {/* Header / Logo Area (Visual Only) */}
      <div className="absolute top-8 left-0 right-0 flex justify-center z-20">
         <div className="bg-white/80 p-3 rounded-full shadow-sm">
            <svg width="40" height="40" viewBox="0 0 40 40">
                <path d="M20 5 L25 15 L35 15 L27 22 L30 32 L20 26 L10 32 L13 22 L5 15 L15 15 Z" fill={theme.mainColor} />
            </svg>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 w-full max-w-5xl px-4 justify-center">
        
        {/* Left Specification Panel */}
        <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden md:block"
        >
            <VisualSpecs theme={theme} />
        </motion.div>

        {/* Center Stage: The Cake */}
        <div className="flex-1 flex justify-center items-center relative">
            <motion.div 
                className="absolute inset-0 bg-white/20 rounded-full blur-3xl transform scale-150" 
                animate={{ scale: [1.2, 1.5, 1.2] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="animate-float">
                <InteractiveCake theme={theme} />
            </div>
        </div>

        {/* Right Interaction Panel */}
        <motion.div 
             initial={{ x: 50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="flex flex-col gap-6"
        >
            {/* Like Button */}
            <motion.button 
                className={`p-4 rounded-full shadow-lg border-2 ${isLiked ? 'bg-red-50 border-red-200' : 'bg-white border-white'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setIsLiked(!isLiked)}
            >
                <Heart 
                    size={32} 
                    fill={isLiked ? "#FF6F61" : "transparent"} 
                    color={isLiked ? "#FF6F61" : "#9CA3AF"} 
                    className="transition-colors"
                />
            </motion.button>
            
            {/* Buy/Cart Button */}
            <motion.button 
                className="p-4 rounded-full shadow-lg bg-gray-900 text-white"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
            >
                <ShoppingBag size={32} />
            </motion.button>
        </motion.div>

      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-10 z-20">
        <NavMenu currentType={currentType} onSelect={setCurrentType} />
      </div>

    </div>
  );
};

export default App;