'use client';

import { useState, useRef } from 'react';
import { useI18n } from '@/lib/i18n-provider';

interface Props {
  word: string;
  onResult?: (accuracy: number) => void;
}

export default function SpeechButton({ word, onResult }: Props) {
  const { t } = useI18n();
  const [listening, setListening] = useState(false);
  const [feedback, setFeedback] = useState('');
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setFeedback('Speech recognition not available in your browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    
    recognition.onresult = (event: any) => {
      const spoken = event.results[0][0].transcript.toLowerCase().trim();
      const target = word.toLowerCase().trim();
      
      // Simple Levenshtein-like comparison
      const similarity = spoken === target ? 1 : 
        spoken.includes(target) || target.includes(spoken) ? 0.7 : 0.3;
      
      if (similarity >= 0.9) setFeedback(t('phonetics_feedback_great'));
      else if (similarity >= 0.6) setFeedback(t('phonetics_feedback_good'));
      else setFeedback(`${t('phonetics_feedback_try')} (you said: "${spoken}")`);
      
      onResult?.(similarity);
    };

    recognition.onerror = () => {
      setListening(false);
      setFeedback(t('error_try_again'));
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'0.75rem'}}>
      <div 
        className={`speech-pulse ${listening ? 'listening' : ''}`}
        onClick={startListening}
        title={t('phonetics_speak')}
      >
        {listening ? '🎙️' : '🎤'}
      </div>
      {listening && <span style={{color:'#e91e63',fontSize:'0.9rem',fontWeight:500}}>{t('phonetics_recording')}</span>}
      {feedback && <span style={{fontSize:'0.9rem',color:'#5b8c5a',textAlign:'center'}}>{feedback}</span>}
    </div>
  );
}
