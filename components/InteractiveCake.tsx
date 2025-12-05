import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CakeTheme, CakeType } from '../types';

interface InteractiveCakeProps {
  theme: CakeTheme;
}

const dripVariants = {
  hidden: { scaleY: 0 },
  visible: (i: number) => ({
    scaleY: [1, 1.2, 0.9, 1],
    transition: {
      delay: i * 0.1,
      repeat: Infinity,
      repeatDelay: 3,
      duration: 2,
    }
  })
};

const toppingVariants = {
  initial: { y: -50, opacity: 0, scale: 0 },
  animate: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', bounce: 0.5 } },
  exit: { scale: 0, opacity: 0 }
};

export const InteractiveCake: React.FC<InteractiveCakeProps> = ({ theme }) => {
  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.svg
          key={theme.id}
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-2xl"
          initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {/* Plate */}
          <motion.ellipse
            cx="100"
            cy="170"
            rx="90"
            ry="25"
            fill="#FFF"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          />

          {/* Cake Base Layer */}
          <motion.path
            d="M 40 120 L 40 150 Q 100 180 160 150 L 160 120 Q 100 150 40 120"
            fill={theme.secondaryColor}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
           <motion.path
            d="M 40 120 Q 100 150 160 120 Q 100 90 40 120"
            fill={theme.mainColor}
          />

          {/* Middle Layer */}
          <motion.path
            d="M 40 90 L 40 120 Q 100 150 160 120 L 160 90 Q 100 120 40 90"
            fill={theme.mainColor}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
          />
          <motion.path
             d="M 40 90 Q 100 120 160 90 Q 100 60 40 90"
             fill={theme.secondaryColor}
          />

          {/* Top Layer */}
          <motion.path
            d="M 40 60 L 40 90 Q 100 120 160 90 L 160 60 Q 100 90 40 60"
            fill={theme.secondaryColor}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          />
           <motion.ellipse
            cx="100"
            cy="60"
            rx="60"
            ry="15"
            fill={theme.mainColor}
          />

          {/* Frosting/Drip */}
          <g>
             {/* Main Cap */}
             <motion.path
              d="M 40 60 Q 100 90 160 60 Q 100 30 40 60"
              fill={theme.bgColor === '#EFEBE9' ? '#3E2723' : '#FFF'} // White frosting unless chocolate
              opacity={0.9}
             />
             {/* Drips */}
             {[45, 65, 85, 105, 125, 145].map((x, i) => (
                <motion.path
                    key={i}
                    d={`M ${x} 65 Q ${x+5} 65 ${x+10} 65 L ${x+10} 80 Q ${x+5} 90 ${x} 80 Z`}
                    fill={theme.bgColor === '#EFEBE9' ? '#3E2723' : '#FFF'}
                    custom={i}
                    variants={dripVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ originY: 0 }}
                />
             ))}
          </g>

          {/* Toppings based on type */}
          {theme.id === CakeType.STRAWBERRY && (
             <motion.g variants={toppingVariants} initial="initial" animate="animate" exit="exit">
                <circle cx="100" cy="50" r="12" fill="#FF0000" />
                <path d="M 95 40 L 100 35 L 105 40 Z" fill="green" />
                <circle cx="80" cy="55" r="8" fill="#FF0000" />
                <circle cx="120" cy="55" r="8" fill="#FF0000" />
             </motion.g>
          )}

          {theme.id === CakeType.CHOCOLATE && (
             <motion.g variants={toppingVariants} initial="initial" animate="animate" exit="exit">
                {/* Chocolate Bars */}
                <rect x="90" y="30" width="20" height="30" transform="rotate(15 100 45)" fill="#3E2723" rx="2" />
                <rect x="80" y="35" width="20" height="30" transform="rotate(-10 90 50)" fill="#4E342E" rx="2" />
                <circle cx="115" cy="55" r="8" fill="#D7CCC8" />
             </motion.g>
          )}

          {theme.id === CakeType.MATCHA && (
             <motion.g variants={toppingVariants} initial="initial" animate="animate" exit="exit">
                {/* Matcha Powder dusting effect (circles) */}
                <circle cx="100" cy="50" r="15" fill="#558B2F" opacity="0.8" />
                <path d="M 90 40 Q 100 20 110 40" stroke="#33691E" strokeWidth="2" fill="none" />
             </motion.g>
          )}

          {theme.id === CakeType.LEMON && (
             <motion.g variants={toppingVariants} initial="initial" animate="animate" exit="exit">
                {/* Lemon Slice */}
                <circle cx="100" cy="45" r="15" fill="#FBC02D" />
                <circle cx="100" cy="45" r="13" fill="#FFF" />
                <path d="M 100 45 L 100 32 M 100 45 L 111 50 M 100 45 L 89 50" stroke="#FBC02D" strokeWidth="2" />
                <path d="M 80 50 Q 100 60 120 50" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
             </motion.g>
          )}

        </motion.svg>
      </AnimatePresence>
    </div>
  );
};