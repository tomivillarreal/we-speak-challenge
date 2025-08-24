"use client";
import { useEffect, useState } from "react";

export default function DateCalculator({ date }: { date: Date }) {
    const [timeLeft, setTimeLeft] = useState(() => {
        const actualDate = new Date();
        const startDate = new Date(date);
        const diffMs = actualDate.getTime() - startDate.getTime();
        const diffMinutes = diffMs / (1000 * 60);
        const minutesLeft = Math.max(20 - diffMinutes, 0);
        const minutes = Math.floor(minutesLeft);
        const seconds = Math.floor((minutesLeft - minutes) * 60);
        return { diffMinutes, minutes, seconds };
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const actualDate = new Date();
            const startDate = new Date(date);
            const diffMs = actualDate.getTime() - startDate.getTime();
            const diffMinutes = diffMs / (1000 * 60);
            const minutesLeft = Math.max(20 - diffMinutes, 0);
            const minutes = Math.floor(minutesLeft);
            const seconds = Math.floor((minutesLeft - minutes) * 60);
            setTimeLeft({ diffMinutes, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, [date]);

    return (
        <div className="text-center">
            {timeLeft.diffMinutes < 20 ? (
                <span>
                    En <b className="text-[#7e55f6]">{timeLeft.minutes.toString().padStart(2, '0')}:</b>
                    <b className="text-[#7e55f6]">{timeLeft.seconds.toString().padStart(2, '0')}</b> minutos se reseteara a 0.
                </span>
            ) : (
                <span>Ya pasaron 20 minutos.</span>
            )}
        </div>
    );
}
