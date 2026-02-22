import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Trophy, 
  RotateCcw,
  Share2,
  Volume2,
  VolumeX
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Question {
  question_id: string;
  motif_id: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  difficulty: number;
  xp_reward: number;
}

interface QuizState {
  currentQuestionIndex: number;
  score: number;
  totalQuestions: number;
  answers: Array<{ question_id: string; answer: string; correct: boolean; time_taken: number }>;
  quizStartTime: number;
  questionStartTime: number;
  isCompleted: boolean;
  timePerQuestion: number;
  soundEnabled: boolean;
}

interface QuizComponentProps {
  questions: Question[];
  motifName?: string;
  onSaveProgress?: (progress: QuizState) => void;
  onQuizComplete?: (result: QuizState) => void;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({
  questions,
  motifName,
  onSaveProgress,
  onQuizComplete
}) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    totalQuestions: questions.length,
    answers: [],
    quizStartTime: Date.now(),
    questionStartTime: Date.now(),
    isCompleted: false,
    timePerQuestion: 30,
    soundEnabled: true
  });

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showResultDialog, setShowResultDialog] = useState(false);

  const currentQuestion = questions[quizState.currentQuestionIndex];
  const progress = ((quizState.currentQuestionIndex + (showFeedback ? 1 : 0)) / quizState.totalQuestions) * 100;

  // Timer effect
  useEffect(() => {
    if (!showFeedback && !quizState.isCompleted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showFeedback) {
      handleAnswerSubmit('');
    }
  }, [timeLeft, showFeedback, quizState.isCompleted]);

  // Save progress to localStorage
  useEffect(() => {
    if (!quizState.isCompleted) {
      localStorage.setItem(`quiz_progress_${motifName || 'general'}`, JSON.stringify(quizState));
    }
  }, [quizState, motifName]);

  const playSound = useCallback((type: 'correct' | 'incorrect' | 'complete') => {
    if (!quizState.soundEnabled) return;
    
    // Create audio context for simple sounds
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
      case 'correct':
        oscillator.frequency.value = 523.25; // C5
        gainNode.gain.value = 0.1;
        break;
      case 'incorrect':
        oscillator.frequency.value = 220; // A3
        gainNode.gain.value = 0.05;
        break;
      case 'complete':
        oscillator.frequency.value = 659.25; // E5
        gainNode.gain.value = 0.15;
        break;
    }
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  }, [quizState.soundEnabled]);

  const triggerConfetti = useCallback(() => {
    // Simple confetti animation using CSS
    const confettiElements = Array.from({ length: 50 }, (_, i) => {
      const element = document.createElement('div');
      element.className = 'confetti-piece';
      element.style.left = Math.random() * 100 + '%';
      element.style.backgroundColor = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'][Math.floor(Math.random() * 5)];
      element.style.animationDelay = Math.random() * 0.5 + 's';
      element.style.animationDuration = (Math.random() * 2 + 1) + 's';
      return element;
    });

    const container = document.createElement('div');
    container.className = 'confetti-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    
    confettiElements.forEach(el => container.appendChild(el));
    document.body.appendChild(container);

    setTimeout(() => {
      document.body.removeChild(container);
    }, 3000);
  }, []);

  const handleAnswerSubmit = useCallback((answer: string) => {
    const timeTaken = Date.now() - quizState.questionStartTime;
    const isCorrect = answer === currentQuestion.correct_answer;
    
    const newAnswer = {
      question_id: currentQuestion.question_id,
      answer,
      correct: isCorrect,
      time_taken: timeTaken
    };

    const updatedAnswers = [...quizState.answers, newAnswer];
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;

    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (isCorrect) {
      playSound('correct');
      if (quizState.currentQuestionIndex === questions.length - 1) {
        triggerConfetti();
      }
    } else {
      playSound('incorrect');
    }

    setQuizState(prev => ({
      ...prev,
      answers: updatedAnswers,
      score: newScore
    }));

    // Auto-proceed after feedback
    setTimeout(() => {
      if (quizState.currentQuestionIndex < questions.length - 1) {
        moveToNextQuestion();
      } else {
        completeQuiz();
      }
    }, 3000);
  }, [currentQuestion, quizState, questions.length, playSound, triggerConfetti]);

  const moveToNextQuestion = () => {
    const nextIndex = quizState.currentQuestionIndex + 1;
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: nextIndex,
      questionStartTime: Date.now()
    }));
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowExplanation(false);
    setTimeLeft(quizState.timePerQuestion);
  };

  const completeQuiz = () => {
    const totalTime = Date.now() - quizState.quizStartTime;
    const finalState = {
      ...quizState,
      isCompleted: true,
      answers: quizState.answers
    };
    
    setQuizState(finalState);
    setShowResultDialog(true);
    playSound('complete');
    
    // Calculate XP earned
    const xpEarned = quizState.answers.reduce((total, answer) => {
      const question = questions.find(q => q.question_id === answer.question_id);
      return total + (answer.correct ? (question?.xp_reward || 10) : 0);
    }, 0);

    // Save to localStorage
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    userProgress.totalXP = (userProgress.totalXP || 0) + xpEarned;
    userProgress.quizScores = userProgress.quizScores || [];
    userProgress.quizScores.push({
      motif: motifName || 'general',
      score: quizState.score,
      total: questions.length,
      date: new Date().toISOString(),
      xpEarned
    });
    localStorage.setItem('userProgress', JSON.stringify(userProgress));

    onQuizComplete?.(finalState);
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      totalQuestions: questions.length,
      answers: [],
      quizStartTime: Date.now(),
      questionStartTime: Date.now(),
      isCompleted: false,
      timePerQuestion: 30,
      soundEnabled: quizState.soundEnabled
    });
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowExplanation(false);
    setTimeLeft(30);
    setShowResultDialog(false);
  };

  const shareResults = () => {
    const text = `I scored ${quizState.score}/${quizState.totalQuestions} in the ${motifName || 'Batik'} quiz! 🎨`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  if (questions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p>No questions available for this quiz.</p>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold font-serif">
            {motifName ? `${motifName} Quiz` : 'Batik Heritage Quiz'}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuizState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
            >
              {quizState.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {timeLeft}s
            </Badge>
          </div>
        </div>
        
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          Question {quizState.currentQuestionIndex + 1} of {quizState.totalQuestions}
        </p>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={quizState.currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="mb-6">
                <Badge className="mb-3">Difficulty: {'⭐'.repeat(currentQuestion.difficulty)}</Badge>
                <h3 className="text-xl font-semibold mb-2">{currentQuestion.question_text}</h3>
                <p className="text-sm text-muted-foreground">XP Reward: {currentQuestion.xp_reward}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => {
                  const letter = String.fromCharCode(65 + index); // A, B, C, D
                  const isSelected = selectedAnswer === letter;
                  const isCorrect = currentQuestion.correct_answer === letter;
                  const showCorrect = showFeedback && isCorrect;
                  const showIncorrect = showFeedback && isSelected && !isCorrect;

                  return (
                    <motion.button
                      key={option}
                      onClick={() => !showFeedback && handleAnswerSubmit(letter)}
                      disabled={showFeedback}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        showCorrect
                          ? 'border-green-500 bg-green-50 dark:bg-green-950'
                          : showIncorrect
                          ? 'border-red-500 bg-red-50 dark:bg-red-950'
                          : isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50 hover:bg-primary/5'
                      } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      whileHover={!showFeedback ? { scale: 1.02 } : {}}
                      whileTap={!showFeedback ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            showCorrect
                              ? 'bg-green-500 text-white'
                              : showIncorrect
                              ? 'bg-red-500 text-white'
                              : 'bg-muted'
                          }`}>
                            {showCorrect ? <CheckCircle2 className="w-4 h-4" /> :
                             showIncorrect ? <XCircle className="w-4 h-4" /> : letter}
                          </div>
                          <span>{option}</span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {selectedAnswer === currentQuestion.correct_answer ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <span className="text-green-500 font-semibold">Correct!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="text-red-500 font-semibold">Incorrect</span>
                        </>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowExplanation(!showExplanation)}
                    >
                      {showExplanation ? 'Hide' : 'Show'} Explanation
                    </Button>
                  </div>

                  <AnimatePresence>
                    {showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 bg-muted rounded-lg"
                      >
                        <p className="text-sm">{currentQuestion.explanation}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Result Dialog */}
      <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Quiz Complete!
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center py-6">
            <div className="text-4xl font-bold mb-2">
              {quizState.score}/{quizState.totalQuestions}
            </div>
            <p className="text-muted-foreground mb-6">
              You got {quizState.score} out of {quizState.totalQuestions} questions correct!
            </p>
            
            <div className="flex gap-2 justify-center">
              <Button onClick={resetQuiz} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Retry
              </Button>
              <Button onClick={shareResults}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
