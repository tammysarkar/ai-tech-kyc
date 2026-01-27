// hooks/useIdleTimer.ts
import { useEffect, useRef, useCallback } from 'react';

/**
 * @param idleMinutes Total time in minutes before hard reset
 * @param promptMinutes Minutes before the end to show the warning modal
 * @param onPrompt Callback to show the modal
 * @param onIdle Callback to perform the hard reset
 */
export const useIdleTimer = (
    idleMinutes: number, 
    promptMinutes: number, 
    onPrompt: () => void, 
    onIdle: () => void
) => {
    const idleTimer = useRef<NodeJS.Timeout | null>(null);
    const promptTimer = useRef<NodeJS.Timeout | null>(null);

    const stopTimers = useCallback(() => {
        if (idleTimer.current) clearTimeout(idleTimer.current);
        if (promptTimer.current) clearTimeout(promptTimer.current);
    }, []);

    const startTimers = useCallback(() => {
        stopTimers();

        // 1. Set Warning Timer (e.g., at 13 minutes)
        promptTimer.current = setTimeout(() => {
            onPrompt();
        }, (idleMinutes - promptMinutes) * 60000);
        
        // 2. Set Hard Reset Timer (e.g., at 15 minutes)
        idleTimer.current = setTimeout(() => {
            onIdle();
        }, idleMinutes * 60000);
    }, [idleMinutes, promptMinutes, onPrompt, onIdle, stopTimers]);

    useEffect(() => {
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        
        const handleActivity = () => {
            startTimers();
        };

        events.forEach(e => window.addEventListener(e, handleActivity));
        startTimers(); // Start timers on component mount

        return () => {
            stopTimers();
            events.forEach(e => window.removeEventListener(e, handleActivity));
        };
    }, [startTimers, stopTimers]);

    return { resetTimers: startTimers, stopTimers };
};
