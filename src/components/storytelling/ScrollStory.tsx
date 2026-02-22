import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Scroll, Eye } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface StorySection {
  title: string;
  content: string;
  image?: string;
  layout: 'text-left' | 'text-right' | 'full-width';
}

interface ScrollStoryProps {
  sections: StorySection[];
  introText: string;
}

const StorySection: React.FC<{ section: StorySection; index: number }> = ({ section, index }) => {
  const { ref, isInView } = useScrollAnimation(0.3, "-100px 0px");
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        delay: index * 0.2 
      }}
      className={`grid md:grid-cols-2 gap-12 items-center ${
        section.layout === 'text-right' ? 'md:grid-flow-dense' : ''
      }`}
    >
      <div className={`${section.layout === 'text-right' ? 'md:col-start-2' : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          <h4 className="text-3xl font-serif font-bold text-foreground mb-6 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-primary" />
            {section.title}
          </h4>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {section.content}
          </p>
        </motion.div>
      </div>
      
      {section.image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.4 }}
          className="relative"
        >
          <img 
            src={section.image} 
            alt={section.title} 
            className="rounded-2xl h-80 w-full object-cover shadow-xl" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
        </motion.div>
      )}
    </motion.div>
  );
};

export const ScrollStory: React.FC<ScrollStoryProps> = ({ sections, introText }) => {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation(0.3);

  return (
    <div className="my-16">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-3 mb-6">
          <Scroll className="w-6 h-6 text-indigo-500" />
          <h3 className="text-4xl font-serif font-bold text-foreground">
            ✨ The Story Behind
          </h3>
          <Eye className="w-6 h-6 text-amber-500" />
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          {introText}
        </motion.p>
      </motion.div>

      <div className="space-y-24">
        {sections.map((section, index) => (
          <StorySection key={index} section={section} index={index} />
        ))}
      </div>
    </div>
  );
};
