import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Check, X, ArrowRight, Trophy, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEngagement, XP_REWARDS } from '@/lib/engagement';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { quizQuestions, type QuizQuestion } from '@/data/quizQuestions';
import { fireConfetti } from '@/components/engagement/Confetti';
import { BatikOfTheDay } from '@/components/engagement/BatikOfTheDay';
import { Progress } from '@/components/ui/progress';

const todayKey = (): string => new Date().toISOString().slice(0, 10);

const dayHash = (s: string): number => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const pickDailyQuestions = (key: string, count = 3): QuizQuestion[] => {
  const all = Object.values(quizQuestions).flat();
  if (all.length === 0) return [];
  const seed = dayHash(key);
  const picked: QuizQuestion[] = [];
  const used = new Set<number>();
  let i = 0;
  while (picked.length < Math.min(count, all.length) && i < all.length * 4) {
    const idx = (seed + i * 2654435761) % all.length;
    if (!used.has(idx)) {
      used.add(idx);
      picked.push(all[idx]);
    }
    i++;
  }
  return picked;
};

type Phase = 'intro' | 'question' | 'feedback' | 'done';

export function DailyPage() {
  const { language } = useLanguage();
  const awardXp = useEngagement((s) => s.awardXp);
  const markDailyQuizDone = useEngagement((s) => s.markDailyQuizDone);
  const dailyQuizDate = useEngagement((s) => s.dailyQuizDate);
  const alreadyDone = dailyQuizDate === todayKey();

  const questions = useMemo(() => pickDailyQuestions(todayKey()), []);
  const [phase, setPhase] = useState<Phase>(alreadyDone ? 'done' : 'intro');
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [totalXp, setTotalXp] = useState(0);

  const current = questions[qi];

  const start = () => {
    setQi(0);
    setScore(0);
    setPicked(null);
    setPhase('question');
  };

  const onAnswer = (letter: string) => {
    if (phase !== 'question' || !current) return;
    const correct = letter === current.correct_answer;
    setPicked(letter);
    if (correct) {
      const r = awardXp('quiz-correct');
      setScore((s) => s + 1);
      setTotalXp((t) => t + r.xpGained);
    }
    setPhase('feedback');
  };

  const next = () => {
    if (qi + 1 >= questions.length) {
      // award completion bonus once per day
      const bonus = awardXp('daily-quiz');
      setTotalXp((t) => t + bonus.xpGained);
      markDailyQuizDone();
      if (score + (picked === current?.correct_answer ? 0 : 0) >= 0) {
        fireConfetti({ particles: 100 });
      }
      setPhase('done');
      return;
    }
    setQi((i) => i + 1);
    setPicked(null);
    setPhase('question');
  };

  // Render
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <header className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-foreground/10 bg-background/60 backdrop-blur-sm">
          <Calendar className="w-3.5 h-3.5 text-gold" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gold">
            {new Date().toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
          {language === 'id' ? 'Tantangan Harian' : 'Daily Challenge'}
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          {language === 'id'
            ? 'Tiga soal kilat. Jaga streakmu, kumpulkan XP, dan bawa pulang badge.'
            : 'Three quick questions. Keep your streak alive, earn XP, and unlock badges.'}
        </p>
      </header>

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="rounded-3xl border border-foreground/10 bg-gradient-to-br from-indigo-500/10 via-background to-rose-500/10 p-8 md:p-12 text-center"
          >
            <Brain className="w-10 h-10 mx-auto text-indigo-500 mb-4" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">
              {language === 'id' ? 'Siap menguji nalar?' : 'Ready to test your wits?'}
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8">
              {language === 'id'
                ? `${questions.length} soal acak dari arsip motif. Setiap jawaban benar +${XP_REWARDS['quiz-correct']} XP, plus bonus selesai +${XP_REWARDS['daily-quiz']} XP.`
                : `${questions.length} random motif questions. +${XP_REWARDS['quiz-correct']} XP per correct answer, plus +${XP_REWARDS['daily-quiz']} XP completion bonus.`}
            </p>
            <Button
              size="lg"
              onClick={start}
              className="rounded-full px-8 py-6 font-black uppercase text-[11px] tracking-[0.2em] bg-foreground text-background hover:bg-foreground/90"
            >
              {language === 'id' ? 'Mulai' : 'Begin'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {(phase === 'question' || phase === 'feedback') && current && (
          <motion.div
            key={`q-${qi}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-5"
          >
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              <span>
                {language === 'id' ? 'SOAL' : 'QUESTION'} {qi + 1}/{questions.length}
              </span>
              <span>
                {language === 'id' ? 'BENAR' : 'SCORE'}: {score}
              </span>
            </div>
            <Progress value={((qi + (phase === 'feedback' ? 1 : 0)) / questions.length) * 100} className="h-1.5" />
            <div className="rounded-3xl border border-foreground/10 bg-background/70 backdrop-blur p-6 md:p-8 space-y-5">
              <h3 className="text-xl md:text-2xl font-serif font-bold leading-snug">{current.question_text}</h3>
              <div className="grid gap-3">
                {current.options.map((opt, i) => {
                  const letter = String.fromCharCode(65 + i); // A, B, C, D
                  const isPicked = picked === letter;
                  const isCorrect = letter === current.correct_answer;
                  const showResult = phase === 'feedback';
                  return (
                    <button
                      key={letter}
                      onClick={() => onAnswer(letter)}
                      disabled={phase === 'feedback'}
                      className={[
                        'group relative w-full rounded-2xl border px-4 py-4 text-left transition-all',
                        showResult && isCorrect
                          ? 'border-emerald-500/60 bg-emerald-500/10'
                          : showResult && isPicked && !isCorrect
                            ? 'border-rose-500/60 bg-rose-500/10'
                            : 'border-foreground/10 bg-background hover:border-foreground/30 hover:bg-foreground/5',
                      ].join(' ')}
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-foreground/15 text-[11px] font-black">
                          {letter}
                        </span>
                        <span className="flex-1 text-sm md:text-base">{opt}</span>
                        {showResult && isCorrect && <Check className="w-5 h-5 text-emerald-500" />}
                        {showResult && isPicked && !isCorrect && <X className="w-5 h-5 text-rose-500" />}
                      </div>
                    </button>
                  );
                })}
              </div>
              {phase === 'feedback' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-foreground/5 border border-foreground/10 p-4 md:p-5"
                >
                  <p className="text-sm leading-relaxed">{current.explanation}</p>
                  <Button onClick={next} className="mt-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em]">
                    {qi + 1 >= questions.length
                      ? language === 'id'
                        ? 'Selesai'
                        : 'Finish'
                      : language === 'id'
                        ? 'Selanjutnya'
                        : 'Next'}
                    <ArrowRight className="ml-2 w-3.5 h-3.5" />
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {phase === 'done' && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-foreground/10 bg-gradient-to-br from-amber-50 via-background to-orange-50 dark:from-amber-950/30 dark:via-background dark:to-orange-950/30 p-8 md:p-12 text-center"
          >
            <Trophy className="w-12 h-12 mx-auto text-gold mb-4" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              {language === 'id' ? 'Tantangan selesai!' : 'Challenge complete!'}
            </h2>
            {alreadyDone && phase === 'done' ? (
              <p className="text-muted-foreground mb-6">
                {language === 'id'
                  ? 'Kamu sudah menyelesaikan tantangan hari ini. Sampai jumpa besok!'
                  : "You've already finished today's challenge. See you tomorrow!"}
              </p>
            ) : (
              <p className="text-muted-foreground mb-6">
                {language === 'id'
                  ? `Skor kamu ${score}/${questions.length} · +${totalXp} XP`
                  : `Your score: ${score}/${questions.length} · +${totalXp} XP`}
              </p>
            )}
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/profile">
                <Button className="rounded-full px-6 py-5 font-black uppercase text-[10px] tracking-[0.2em]">
                  {language === 'id' ? 'Lihat Profil' : 'View Profile'}
                </Button>
              </Link>
              <Link to="/scan">
                <Button variant="outline" className="rounded-full px-6 py-5 font-black uppercase text-[10px] tracking-[0.2em]">
                  {language === 'id' ? 'Pindai Motif' : 'Scan a Motif'}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BatikOfTheDay />
    </div>
  );
}
