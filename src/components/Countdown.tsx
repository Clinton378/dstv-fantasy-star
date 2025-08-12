import { useEffect, useState } from "react";

export const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <span className="h-2 w-2 rounded-full bg-primary inline-block animate-pulse" aria-hidden />
      <span>Next deadline in {timeLeft}</span>
    </div>
  );
};
