import React, { useEffect, useRef, useState, useCallback } from "react";

const useTimer = () => {
    const [renderedStreamDuration, setRenderedStreamDuration] = useState('00:00');
    const [isStartTimer, setIsStartTimer] = useState(false);
    const [isStopTimer, setIsStopTimer] = useState(false);
    const [isPauseTimer, setIsPauseTimer] = useState(false);
    const [isResumeTimer, setIsResumeTimer] = useState(false);
    
    const streamDuration = useRef(0);
    const previousTime = useRef(0);

    const isStartBtnDisabled = isPauseTimer || isResumeTimer || isStartTimer;
    const isStopBtnDisabled = !(isPauseTimer || isResumeTimer || isStartTimer);
    const isPauseBtnDisabled = !(isStartTimer || (!isStartTimer && isResumeTimer));
    const isResumeBtnDisabled = !isPauseTimer;

    const updateTimer = useCallback(() => {
        let now = performance.now();
        let dt = now - previousTime.current;

        if (dt >= 1000) {
        streamDuration.current = streamDuration.current + Math.round(dt / 1000);
        const formattedStreamDuration = new Date(streamDuration.current * 1000)
            .toISOString()
            .substring(11, 8);
        setRenderedStreamDuration(formattedStreamDuration);
        previousTime.current = now;
        }
    }, []);

    const startTimer = useCallback(() => {
        previousTime.current = performance.now();
    }, [updateTimer]);

    useEffect(() => {
        if (isStartTimer && !isStopTimer) {
        startTimer();
        }
        if (isStopTimer && !isStartTimer) {
        streamDuration.current = 0;
        setRenderedStreamDuration('00:00:00');
        }
    }, [isStartTimer, isStopTimer, startTimer]);

    const startHandler = () => {
        setIsStartTimer(true);
        setIsStopTimer(false);
    };

    const stopHandler = () => {
        setIsStopTimer(true);
        setIsStartTimer(false);
        setIsPauseTimer(false);
        setIsResumeTimer(false);
    };

    const pauseHandler = () => {
        setIsPauseTimer(true);
        setIsStartTimer(false);
        setIsResumeTimer(false);
    };

    const resumeHandler = () => {
        setIsResumeTimer(true);
        setIsPauseTimer(false);
        startTimer();
    };

    return {
        renderedStreamDuration,
        isStartBtnDisabled,
        isStopBtnDisabled,
        isPauseBtnDisabled,
        isResumeBtnDisabled,
        startHandler,
        stopHandler,
        pauseHandler,
        resumeHandler,
    };
};