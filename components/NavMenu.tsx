import React from 'react';
import { motion } from 'framer-motion';
import { CakeType, CAKE_THEMES } from '../types';
import { Cherry, Coffee, Leaf, Sun } from 'lucide-react';

interface NavMenuProps {
  currentType: CakeType;
  onSelect: (type: CakeType) => void;
}

const icons = {
  [CakeType.STRAWBERRY]: Cherry,
  [CakeType.CHOCOLATE]: Coffee,
  [CakeType.MATCHA]: Leaf,
  [CakeType.LEMON]: Sun,
};

export const NavMenu: React.FC<NavMenuProps> = ({ currentType, onSelect }) => {
  return (
    <div className="flex gap-6 bg-white/40 backdrop-blur-xl p-4 rounded-full shadow-lg border border-white/50">
      {(Object.keys(CAKE_THEMES) as CakeType[]).map((type) => {
        const Icon = icons[type];
        const isActive = currentType === type;
        const theme = CAKE_THEMES[type];

        return (
          <motion.button
            key={type}
            onClick={() => onSelect(type)}
            className="relative p-4 rounded-full flex items-center justify-center outline-none"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: theme.mainColor }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Icon
              size={28}
              className={`relative z-10 transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-gray-600'
              }`}
            />
          </motion.button>
        );
      })}
    </div>
  );
};