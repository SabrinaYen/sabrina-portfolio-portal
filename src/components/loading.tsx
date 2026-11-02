import { useEffect, useState } from "react";

// The free API host sleeps when idle, so the first request can take up to a minute.
// If waiting takes longer than `after` ms, explain why.
export function SlowHint({ active, after = 4000 }: { active: boolean; after?: number }) {
    const [isSlow, setIsSlow] = useState(false);

    useEffect(() => {
        if (!active) return;
        const timer = setTimeout(() => setIsSlow(true), after);
        return () => {
            clearTimeout(timer);
            setIsSlow(false);
        };
    }, [active, after]);

    if (!isSlow) return null;
    return (
        <p className="max-w-xs text-center text-[12px] text-[#94a3b8]">
            The server is waking up. The first request after a quiet period can take up to a minute.
        </p>
    );
}

function LoadingScreen({ label = "Loading..." }: { label?: string }) {
    return (
        <div role="status" aria-live="polite" className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#f4f6fb]">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e2e8f2] border-t-[#2563eb]" />
            <p className="text-[13px] text-[#5a6b87]">{label}</p>
            <SlowHint active />
        </div>
    );
}

export default LoadingScreen;
