import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Sparkles } from 'lucide-react';

interface TimelineEvent {
  year: string;
  era: string;
  title: string;
  description: string;
  image_url?: string;
  fun_fact?: string;
}

interface MotifTimelineProps {
  events: TimelineEvent[];
}

export const MotifTimeline: React.FC<MotifTimelineProps> = ({ events }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeEvent = events[activeIndex];

  const getEraColor = (era: string) => {
    const colors: Record<string, string> = {
      'Pre-Colonial': 'bg-amber-600',
      'Colonial': 'bg-rose-600', 
      'Independence': 'bg-emerald-600',
      'Modern': 'bg-indigo-600'
    };
    return colors[era] || 'bg-gray-600';
  };

  const getEraBgColor = (era: string) => {
    const colors: Record<string, string> = {
      'Pre-Colonial': 'bg-amber-50 dark:bg-amber-950',
      'Colonial': 'bg-rose-50 dark:bg-rose-950',
      'Independence': 'bg-emerald-50 dark:bg-emerald-950', 
      'Modern': 'bg-indigo-50 dark:bg-indigo-950'
    };
    return colors[era] || 'bg-gray-50 dark:bg-gray-950';
  };

  return (
    <div className="my-12">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 mb-4"
        >
          <Calendar className="w-6 h-6 text-amber-600" />
          <h3 className="text-3xl font-serif font-bold text-foreground">
            The Story Through Time
          </h3>
          <Sparkles className="w-6 h-6 text-indigo-500" />
        </motion.div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Journey through centuries of cultural heritage, from royal courts to modern runways
        </p>
      </div>

      {/* Timeline Nodes */}
      <div className="relative mb-8">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 -translate-y-1/2" />
        
        <div className="relative flex justify-between items-center px-4">
          {events.map((event, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative z-10 flex flex-col items-center group ${index === activeIndex ? 'scale-110' : ''}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                className={`w-14 h-14 rounded-full border-4 border-background shadow-lg flex items-center justify-center transition-all duration-300 ${
                  index === activeIndex 
                    ? `${getEraColor(event.era)} shadow-2xl scale-110` 
                    : 'bg-background hover:scale-105'
                }`}
              >
                <span className={`text-sm font-bold transition-colors ${
                  index === activeIndex ? 'text-white' : 'text-foreground'
                }`}>
                  {event.year.slice(-2)}
                </span>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mt-3 text-center"
              >
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {event.year}
                </span>
                <div className={`h-1 w-16 mx-auto mt-1 rounded-full ${getEraColor(event.era)}`} />
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content Display */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`${getEraBgColor(activeEvent.era)} rounded-2xl shadow-xl border border-border p-8`}
      >
        <div className="grid md:grid-cols-2 gap-8">
          {activeEvent.image_url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={activeEvent.image_url} 
                alt={activeEvent.title} 
                className="rounded-xl h-64 w-full object-cover shadow-lg" 
              />
            </motion.div>
          )}
          
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-4 py-1 rounded-full text-sm text-white font-semibold ${getEraColor(activeEvent.era)}`}>
                {activeEvent.year}
              </span>
              <span className="px-3 py-1 bg-muted rounded-full text-xs font-semibold text-muted-foreground uppercase">
                {activeEvent.era}
              </span>
            </div>
            
            <h4 className="text-2xl font-serif font-bold text-foreground mb-4">
              {activeEvent.title}
            </h4>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {activeEvent.description}
            </p>
            
            {activeEvent.fun_fact && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border border-amber-200 dark:border-amber-800 p-6 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-1">
                      💡 Fun Fact
                    </p>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      {activeEvent.fun_fact}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
