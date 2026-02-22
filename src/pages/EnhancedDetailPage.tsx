import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Calendar, Sparkles, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MotifTimeline } from '@/components/storytelling/MotifTimeline';
import { ScrollStory } from '@/components/storytelling/ScrollStory';
import { ClickableMotif } from '@/components/storytelling/ClickableMotif';
import { UsageCarousel } from '@/components/storytelling/UsageCarousel';
import { getStorytellingData, StorytellingData } from '@/data/storytellingData';

export const EnhancedDetailPage: React.FC = () => {
  const { motifId } = useParams<{ motifId: string }>();
  const [storyData, setStoryData] = useState<StorytellingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const data = getStorytellingData(motifId);
      setStoryData(data);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [motifId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-foreground"></div>
      </div>
    );
  }

  if (!storyData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center p-8">
            <h3 className="text-xl font-bold mb-4">Story Not Available</h3>
            <p className="text-muted-foreground">
              Storytelling content for this motif is not yet available.
            </p>
            <Link to="/gallery">
              <Button>Back to Gallery</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={`/motifs/${motifId}.jpg`} 
            alt={motifId}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col">
          {/* Navigation */}
          <div className="glass-nav">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
              <Link to="/gallery" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Back to Gallery</span>
              </Link>
              
              <div className="flex items-center gap-4">
                <Badge className="bg-primary/10 text-primary px-3 py-1">
                  <Calendar className="w-3 h-3 mr-1" />
                  Interactive Story
                </Badge>
              </div>
            </div>
          </div>

          {/* Title Overlay */}
          <div className="flex-grow flex items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold text-white mb-4 drop-shadow-lg">
                {motifId.replace('-', ' ').replace(/\b\w/g, word => word.charAt(0).toUpperCase() + word.slice(1))}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow">
                Discover the story behind this sacred motif
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Storytelling Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-serif font-bold text-foreground">
              📖 The Complete Story
            </h2>
            <Sparkles className="w-6 h-6 text-accent" />
          </div>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {storyData.story_intro}
          </p>
        </motion.div>

        {/* Interactive Timeline */}
        <MotifTimeline events={storyData.timeline_events} />

        {/* Scroll Story Sections */}
        <ScrollStory 
          sections={[
            {
              title: "Sacred Origins",
              content: "The pattern emerged from deep spiritual contemplation, where Javanese philosophers connected geometric forms to universal truths. Each line and curve carries meaning that transcends mere decoration.",
              image: "/images/story/sacred-origins.jpg",
              layout: "text-left"
            },
            {
              title: "Symbolic Language",
              content: "Every element speaks in a visual language understood by those who know how to see. The pattern becomes a text that communicates values, beliefs, and aspirations without words.",
              image: "/images/story/symbolic-language.jpg",
              layout: "text-right"
            },
            {
              title: "Living Heritage",
              content: "Today, this ancient wisdom lives on in modern fashion runways, gallery walls, and digital screens, proving that true beauty transcends time and technology.",
              image: "/images/story/living-heritage.jpg",
              layout: "full-width"
            }
          ]} 
          introText={storyData.story_intro}
        />

        {/* Clickable Symbolism */}
        <ClickableMotif 
          motifImage={`/motifs/${motifId}-detail.jpg`}
          symbolElements={storyData.symbolism_elements}
        />

        {/* Usage Carousel */}
        <UsageCarousel 
          modernImages={storyData.modern_usage_images}
          traditionalImages={storyData.traditional_usage_images}
        />

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-2xl mx-auto glass-card">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Camera className="w-8 h-8 text-primary" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Continue Your Journey
                  </h3>
                  <p className="text-muted-foreground">
                    Explore more motifs and complete your cultural heritage education
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/gallery">
                  <Button variant="outline" className="w-full">
                    Browse All Motifs
                  </Button>
                </Link>
                <Link to={`/quiz/${motifId}`}>
                  <Button className="w-full">
                    Test Your Knowledge
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
