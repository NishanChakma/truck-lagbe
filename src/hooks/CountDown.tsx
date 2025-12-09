import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, AppState, Vibration } from 'react-native';
import { toBengaliDigits } from './toBengaliDigit';

// Countdown hook fixed 15 minutes
function useCountdownFunc(duration: number, resetSignal: number): number {
  const DURATION = duration * 60 * 1000;

  const [remaining, setRemaining] = useState<number>(DURATION);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastTickRef = useRef<number>(Date.now());

  // Reset effect
  useEffect(() => {
    setRemaining(DURATION);
    lastTickRef.current = Date.now();
  }, [DURATION, resetSignal]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastTickRef.current;
      lastTickRef.current = now;

      setRemaining(prev => {
        const next = prev - elapsed;
        if (next <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          Vibration.vibrate(800);
          return 0;
        }
        return next;
      });
    }, 250);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return remaining;
}

interface CountDownProps {
  countDown: number;
  resetSignal: number;
}

const CountDown: React.FC<CountDownProps> = ({ countDown, resetSignal }) => {
  const remainingMs = useCountdownFunc(countDown, resetSignal);

  const format = (ms: number) => {
    const total = Math.ceil(ms / 1000);
    const m = String(Math.floor(total / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    return toBengaliDigits(`${m}:${s}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}></View>
      <View style={styles.bottom}></View>
      <View style={{ position: 'absolute' }}>
        <Text style={styles.timer}>{format(remainingMs)}</Text>
      </View>
    </View>
  );
};

export default CountDown;

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 65,
    position: 'relative',
  },
  top: {
    height: 15,
    backgroundColor: '#27ae60',
  },
  bottom: {
    height: 15,
    backgroundColor: '#1f8b4d',
  },
  timer: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    top: 0,
    left: 5,
  },
});
