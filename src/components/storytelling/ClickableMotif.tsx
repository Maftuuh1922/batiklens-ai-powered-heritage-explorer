import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Sparkles, Info } from 'lucide-react';

interface SymbolElement {
  element_id: string;
  name: string;
  position: { x: number; y: number };
  icon: string;
  meaning: string;
  cultural_context: string;
  detail_image?: string;
}

interface ClickableMotifProps {
  motifImage: string;
  symbolElements: SymbolElement[];
}

export const ClickableMotif: React.FC<ClickableMotifProps> = ({ motifImage, symbolElements }) => {
  const [activeSymbol, setActiveSymbol] = useState<SymbolElement | null>(null);
  const [showHotspots, setShowHotspots] = useState(true);

  return (
    <div className="my-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-indigo-500" />
          <h3 className="text-3xl font-serif font-bold text-foreground">
            🔍 Explore Symbolism
          </h3>
          <Eye className="w-6 h-6 text-amber-500" />
        </div>
        
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm font-semibold hover:bg-muted/80 transition-colors"
          >
            {showHotspots ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showHotspots ? 'Hide' : 'Show'} Markers
          </button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image with Hotspots */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={motifImage} 
              alt="Motif" 
              className="w-full rounded-2xl shadow-2xl" 
            />
          </motion.div>

          <AnimatePresence>
            {showHotspots && symbolElements.map((symbol, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveSymbol(symbol)}
                className="absolute w-12 h-12 bg-background border-2 border-primary rounded-full flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-all duration-300 z-20"
                style={{ 
                  left: `${symbol.position.x}%`, 
                  top: `${symbol.position.y}%`, 
                  transform: 'translate(-50%, -50%)' 
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  {symbol.icon}
                </motion.span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Detail Panel */}
        <div>
          <AnimatePresence mode="wait">
            {activeSymbol ? (
              <motion.div
                key={activeSymbol.element_id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-background rounded-2xl shadow-2xl border border-primary p-8 relative overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl"
                  >
                    {activeSymbol.icon}
                  </motion.span>
                  <div>
                    <h4 className="text-2xl font-serif font-bold text-foreground">
                      {activeSymbol.name}
                    </h4>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">
                      Symbol Element
                    </p>
                  </div>
                </div>

                {/* Meaning */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="w-4 h-4 text-primary" />
                    <h5 className="text-sm font-bold text-primary uppercase tracking-wider">
                      Meaning
                    </h5>
                  </div>
                  <p className="text-lg text-foreground leading-relaxed">
                    {activeSymbol.meaning}
                  </p>
                </motion.div>

                {/* Cultural Context */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <h5 className="text-sm font-bold text-primary uppercase tracking-wider">
                      Cultural Context
                    </h5>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {activeSymbol.cultural_context}
                  </p>
                </motion.div>

                {/* Detail Image */}
                {activeSymbol.detail_image && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6"
                  >
                    <img 
                      src={activeSymbol.detail_image} 
                      alt={`${activeSymbol.name} detail`} 
                      className="w-full rounded-xl shadow-lg" 
                    />
                  </motion.div>
                )}

                {/* Close Button */}
                <button
                  onClick={() => setActiveSymbol(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  <EyeOff className="w-4 h-4" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-muted/50 rounded-2xl p-12 text-center border-2 border-dashed border-muted"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  className="text-6xl mb-4"
                >
                  👆
                </motion.div>
                <h4 className="text-xl font-bold text-foreground mb-2">
                  Select a Symbol
                </h4>
                <p className="text-muted-foreground">
                  Click any marker on the motif to learn its meaning and cultural significance
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
