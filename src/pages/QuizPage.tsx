import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Trophy, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuizComponent } from '@/components/quiz/QuizComponent';
import { getQuizQuestions, QuizQuestion } from '@/data/quizQuestions';

export const QuizPage: React.FC = () => {
  const { motifId } = useParams<{ motifId?: string }>();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [motifName, setMotifName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const quizQuestions = getQuizQuestions(motifId);
    setQuestions(quizQuestions);
    
    // Set motif name for display
    if (motifId) {
      setMotifName(formatMotifName(motifId));
    } else {
      setMotifName('General Knowledge');
    }
    
    setLoading(false);
  }, [motifId]);

  const formatMotifName = (id: string): string => {
    return id
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleQuizComplete = (result: any) => {
    console.log('Quiz completed:', result);
    // You can add additional logic here like saving to backend, showing achievements, etc.
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass-nav sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/gallery">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Gallery
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <h1 className="text-xl font-bold font-serif">
                  {motifName} Quiz
                </h1>
              </div>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {questions.length} Questions
            </Badge>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quiz Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  Test Your Knowledge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{questions.length}</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-500">
                      {questions.reduce((total, q) => total + q.xp_reward, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total XP</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-500">
                      {'⭐'.repeat(Math.round(questions.reduce((total, q) => total + q.difficulty, 0) / questions.length))}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Difficulty</div>
                  </div>
                </div>
                
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p className="text-muted-foreground">
                    Test your knowledge about {motifName.toLowerCase()} batik patterns. 
                    Each correct answer earns you XP points and helps you master the cultural heritage of Indonesian batik.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quiz Component */}
          <QuizComponent
            questions={questions}
            motifName={motifName}
            onQuizComplete={handleQuizComplete}
          />
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
