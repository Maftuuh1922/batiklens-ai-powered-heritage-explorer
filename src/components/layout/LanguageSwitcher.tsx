import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2 bg-background/50 backdrop-blur-md rounded-full border border-border/50 p-1">
            <Button
                variant={language === 'id' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('id')}
                className={`rounded-full px-3 h-7 text-xs font-medium transition-all ${language === 'id' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-accent/50 text-muted-foreground'
                    }`}
            >
                ID
            </Button>
            <Button
                variant={language === 'en' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('en')}
                className={`rounded-full px-3 h-7 text-xs font-medium transition-all ${language === 'en' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-accent/50 text-muted-foreground'
                    }`}
            >
                EN
            </Button>
        </div>
    );
}
